export function account(acc, instanceUri) {
  return {
    ...acc,
    instanceUri,
    uacct: acc.acct.includes('@') ? acc.acct : `${acc.acct}@${instanceUri}`
  }
}

export function client(c, instanceUri) {
  return { ...c, instanceUri }
}
