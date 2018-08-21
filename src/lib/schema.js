import { schema } from 'normalizr'

export const account = new schema.Entity(
  'accounts',
  {},
  {
    idAttribute: 'uacct'
  }
)

export const client = new schema.Entity(
  'clients',
  {},
  {
    idAttribute: 'instanceUri'
  }
)

export const instance = new schema.Entity(
  'instances',
  {
    contactAccount: account
  },
  {
    idAttribute: 'uri'
  }
)
