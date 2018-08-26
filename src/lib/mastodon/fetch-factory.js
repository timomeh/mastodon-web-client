import humps from 'humps'
import { ApiError } from '../errors'

export default function fetchFactory(uri) {
  return (path, { body, token, method = 'GET' } = {}) => {
    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')
    if (token) headers.set('Authorization', `Bearer ${token}`)

    return fetch('https://' + uri + path, {
      method,
      headers,
      body: JSON.stringify(humps.decamelizeKeys(body))
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.error(json)
          throw new ApiError(json.error, json.errorDescription)
        }

        return json
      })
      .then(json => humps.camelizeKeys(json))
  }
}
