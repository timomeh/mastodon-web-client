import { normalize } from 'normalizr'
import querystring from 'querystring'

import fetchFactory from './fetch-factory'
import * as schema from './schema'
import getCredentials from './credentials'

let store = null

export const setStore = s => {
  store = s
}

export default function mastodonApi(overrides = {}) {
  const { uri, token, client } = getCredentials(store, overrides)
  const redirectUri = `${process.env.REACT_APP_URL}/authorized/${uri}`
  const call = fetchFactory(uri)

  return {
    apps: {
      create() {
        const body = {
          clientName: 'toot.one',
          redirectUris: redirectUri,
          scopes: 'read write follow'
        }

        return call('/api/v1/apps', { method: 'POST', body })
          .then(client => ({ ...client, uri }))
          .then(client => normalize(client, schema.client))
      }
    },

    user: {
      authorize() {
        const query = {
          client_id: client.clientId,
          scope: 'read write follow',
          response_type: 'code',
          redirect_uri: redirectUri
        }
        const qs = querystring.stringify(query)

        window.location.assign(`https://${uri}/oauth/authorize?${qs}`)
      },

      token(code) {
        const { clientId, clientSecret } = client
        const grantType = 'authorization_code'

        return call('/oauth/token', {
          method: 'POST',
          body: { code, clientId, clientSecret, grantType, redirectUri }
        })
      },

      get() {
        return call('/api/v1/accounts/verify_credentials', { token }).then(
          account => normalize(account, schema.account)
        )
      }
    },

    instance: {
      get() {
        return call('/api/v1/instance').then(instance =>
          normalize(instance, schema.instance)
        )
      }
    }
  }
}
