export function getUriFromAccount(account) {
  return account.url.replace(/https?:\/\//i, '').split('/')[0]
}

export function getUacct(account) {
  const uri = getUriFromAccount(account)
  const { acct } = account
  return acct.includes('@') ? acct : `${acct}@${uri}`
}

export function patchAccount(account) {
  const uri = getUriFromAccount(account)
  const uacct = getUacct(account)

  return { ...account, uri, uacct }
}

export function patchInstance(instance) {
  return { ...instance, uri: instance.instanceUri }
}
