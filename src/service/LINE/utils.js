const crypto = require('crypto')

const validateSignature = (body, channelSecret, signature) => {
  const hash = crypto
    .createHmac('sha256', channelSecret)
    .update(Buffer.from(JSON.stringify(body), 'utf8'))
    .digest('base64')

  return hash === signature
}
module.exports.validateSignature = validateSignature

module.exports.koaValidateMiddleware = () => {
  return async (ctx, next) => {
    const xLineSignature = ctx.headers['x-line-signature']
    const eventsBody = ctx.request.fields || {}

    if (
      validateSignature(
        eventsBody,
        ctx.config.lineChannelSecret,
        xLineSignature
      )
    ) {
      await next()
    } else {
      // TODO: throw validation error here
      console.error('VALIDATION FAILED!') // eslint-disable-line no-console
    }
  }
}
