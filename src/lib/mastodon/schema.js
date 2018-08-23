import { schema } from 'normalizr'
import * as patch from './patch'

export const account = new schema.Entity(
  'accounts',
  {},
  { idAttribute: patch.getUacct, processStrategy: patch.patchAccount }
)

export const client = new schema.Entity('clients', {}, { idAttribute: 'uri' })

export const instance = new schema.Entity(
  'instances',
  { contactAccount: account },
  { idAttribute: 'uri' }
)
