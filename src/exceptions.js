class ExtendableError extends Error {
  constructor(msg) {
    super(msg)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(msg).stack
    }
  }
}

class SignatureValidationFailed extends ExtendableError {
  constructor(msg, signature) {
    super(msg)
    this.signature = signature
  }
}
module.exports.SignatureValidationFailed = SignatureValidationFailed
