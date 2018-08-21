export class InstanceNotAvialableError extends Error {
  constructor(...args) {
    super(...args)

    this.__proto__ = InstanceNotAvialableError.prototype
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InstanceNotAvialableError)
    }

    this.message =
      this.message ||
      'The mastodon instance does not exist or is currently not available.'
  }
}

export class InvalidDomainError extends Error {
  constructor(...args) {
    super(...args)

    this.__proto__ = InvalidDomainError.prototype
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InstanceNotAvialableError)
    }
  }
}

export class ApiError extends Error {
  constructor(errorCode, ...args) {
    super(...args)

    this.__proto__ = ApiError.prototype
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InstanceNotAvialableError)
    }

    this.errorCode = errorCode
  }
}
