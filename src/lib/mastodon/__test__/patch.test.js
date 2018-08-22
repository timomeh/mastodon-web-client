import * as patch from '../patch'

const localAccount = {
  url: 'https://funk.town/@someone',
  acct: 'someone'
}

const remoteAccount = {
  url: 'https://up.town/@someone',
  acct: 'someone@up.town'
}

const instance = {
  instanceUri: 'funk.town'
}

describe('getUriFromAccount', () => {
  it('returns the uri of an account', () => {
    expect(patch.getUriFromAccount(localAccount)).toBe('funk.town')
  })
})

describe('getUacct', () => {
  it('returns the uacct of a local account', () => {
    expect(patch.getUacct(localAccount)).toBe('someone@funk.town')
  })

  it('returns the uacct of a remote account', () => {
    expect(patch.getUacct(remoteAccount)).toBe('someone@up.town')
  })
})

describe('patchAccount', () => {
  it('adds uri to the account', () => {
    const patchedAccount = patch.patchAccount(localAccount)
    expect(patchedAccount).toHaveProperty('uri', 'funk.town')
  })

  it('adds uacct to the account', () => {
    const patchedAccount = patch.patchAccount(localAccount)
    expect(patchedAccount).toHaveProperty('uacct', 'someone@funk.town')
  })
})

describe('patchInstance', () => {
  it('adds uri to the instance', () => {
    const patchedInstance = patch.patchInstance(instance)
    expect(patchedInstance).toHaveProperty('uri', 'funk.town')
  })
})
