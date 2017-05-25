const urls = require("./urls");

class client {
  constructor(config) {
    if (!config.lineChannelAccessToken) {
      throw new Error("no channel access token");
    }
    this.channelAccessToken = config.lineChannelAccessToken;

    this.replyMessage = this.replyMessage.bind(this);
    this.pushMessage = this.pushMessage.bind(this);

    this._getRequest = this._getRequest.bind(this);
  }

  replyMessage(replyToken, messages) {
    console.log(replyToken);
    console.log(messages);
    return fetch(
      this._getRequest(urls.reply, {
        replyToken,
        messages: Array.isArray(messages) ? messages : [messages]
      })
    );
  }

  pushMessage(to, messages) {
    return fetch(
      this._getRequest(urls.push, {
        to,
        messages: Array.isArray(messages) ? messages : [messages]
      })
    );
  }

  _getRequest(url, body) {
    return new Request(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.channelAccessToken}`
      }),
      body: JSON.stringify(body)
    });
  }
}

module.exports = client;
