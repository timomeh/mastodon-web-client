import isValidDomain from 'is-valid-domain'
import { normalize } from 'normalizr'

import * as selectors from '../redux/selectors'
import * as errs from './errors'
import * as schema from './schema'
import apiFetch from './apiFetch'
import * as apiPatch from './apiPatch'

let store = null

export const setStore = s => {
  store = s
}

export default function mastodonApi(unsafeUri) {
  const instanceUri = validateInstance(unsafeUri)
  const api = apiFetch(instanceUri)
  const client = unsafeUri
    ? selectors.getClients(store.getState())[instanceUri]
    : selectors.getClientsCurrent(store.getState())
  const redirectUri = `${process.env.REACT_APP_URL}/authorized/${instanceUri}`
  const token = selectors.getUsersTokensCurrent(store.getState())

  function validateClient() {
    if (!client) {
      throw new Error('This method needs a registered client.')
    }
  }

  function validateToken(tmpToken) {
    if (!token && !tmpToken) {
      throw new Error('This method needs an access_token.')
    }
  }

  return {
    apps: {
      create() {
        const body = {
          clientName: 'toot.one',
          redirectUris: redirectUri,
          scopes: 'read write follow'
        }
        return api('/api/v1/apps', { method: 'POST', body })
          .then(client => apiPatch.client(client, instanceUri))
          .then(client => normalize(client, schema.client))
      }
    },

    oauth: {
      authorize() {
        validateClient()
        const params = [
          ['client_id', client.clientId],
          ['scope', 'read%20write%20follow'],
          ['response_type', 'code'],
          ['redirect_uri', redirectUri]
        ]
        const qs = params.map(kv => kv.join('=')).join('&')
        window.location = `https://${instanceUri}/oauth/authorize?${qs}`
      },
      token(code) {
        validateClient()
        return api('/oauth/token', {
          method: 'POST',
          body: {
            code,
            clientId: client.clientId,
            clientSecret: client.clientSecret,
            grantType: 'authorization_code',
            redirectUri
          }
        })
      }
    },

    instances: {
      get() {
        return api('/api/v1/instance')
          .then(instance => ({
            ...instance,
            contactAccount: apiPatch.account(
              instance.contactAccount,
              instanceUri
            )
          }))
          .then(instance => normalize(instance, schema.instance))
      }
    },

    accounts: {
      verifyCredentials(tmpToken) {
        validateToken(tmpToken)
        return api('/api/v1/accounts/verify_credentials', {
          token: tmpToken || token
        })
          .then(account => apiPatch.account(account, instanceUri))
          .then(account => normalize(account, schema.account))
      }
    }
  }
}

function validateInstance(instanceUri) {
  const safeUri = instanceUri || selectors.getAppInstanceUri(store.getState())

  if (!safeUri) {
    throw new Error('No instance specified.')
  }

  if (!isValidDomain(safeUri)) {
    throw new errs.InvalidDomainError(`Not a valid domain: ${safeUri}`)
  }

  return safeUri
}
