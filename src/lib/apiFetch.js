import { ApiError } from './errors'
import humps from 'humps'

export default function apiFetch(instanceUri) {
  return (path, { body, token, method = 'GET' } = {}) => {
    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')
    if (token) headers.set('Authorization', `Bearer ${token}`)

    return fetch('https://' + instanceUri + path, {
      method,
      headers,
      body: JSON.stringify(humps.decamelizeKeys(body))
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new ApiError(json.error, json.errorDescription)
        else return json
      })
      .then(json => humps.camelizeKeys(json))
  }
}
