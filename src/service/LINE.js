const crypto = require('crypto')
const urls = require('../constants/LINEUrls')

class LINE {
  constructor(config) {
    if (!config.lineChannelAccessToken) {
      throw new Error('no channel access token')
    }
    this.channelAccessToken = config.lineChannelAccessToken

    this.replyMessage = this.replyMessage.bind(this)
    this.pushMessage = this.pushMessage.bind(this)

    this._getRequest = this._getRequest.bind(this)
  }

  replyMessage(replyToken, messages) {
    return fetch(
      this._getRequest(urls.reply, {
        replyToken,
        messages: Array.isArray(messages) ? messages : messages
      })
    )
  }

  pushMessage(to, messages) {
    return fetch(
      this._getRequest(urls.push, {
        to,
        messages: Array.isArray(messages) ? messages : messages
      })
    )
  }

  _getRequest(url, body) {
    return new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.channelAccessToken}`
      }),
      body: JSON.stringify(body)
    })
  }
}
module.exports.client = LINE

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
