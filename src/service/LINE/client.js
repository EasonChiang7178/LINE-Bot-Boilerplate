const urls = require('./urls')
const request = require('../../utils').request
const toArray = require('../../utils').toArray

class client {
  constructor(config) {
    if (!config.lineChannelAccessToken) {
      throw new Error('no channel access token')
    }
    this.channelAccessToken = config.lineChannelAccessToken

    this.replyMessage = this.replyMessage.bind(this)
    this.pushMessage = this.pushMessage.bind(this)
    this.getProfile = this.getProfile.bind(this)

    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
    this.authHeader = this.authHeader.bind(this)
  }

  replyMessage(replyToken, messages) {
    return request(
      this.post(urls.reply, {
        replyToken,
        messages: toArray(messages)
      })
    )
  }

  pushMessage(to, messages) {
    return request(
      this.post(urls.push, {
        to,
        messages: toArray(messages)
      })
    )
  }

  getProfile(userId) {
    return request(this.get(urls.profile(userId)))
  }

  post(url, body) {
    return new Request(url, {
      method: 'POST',
      headers: this.authHeader(),
      body: JSON.stringify(body)
    })
  }

  get(url) {
    return new Request(url, {
      method: 'GET',
      headers: this.authHeader()
    })
  }

  authHeader() {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.channelAccessToken}`
    })
  }
}

module.exports = client
