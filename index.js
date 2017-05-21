require('dotenv-safe').load();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa2-better-body')

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const router = new Router();
router.post('/line-webhook', bodyParser(), async function (ctx, next) {
    console.log(JSON.stringify(ctx.request.fields, null, 2);
    await next();
    // const replies = await Promise.all(ctx.request.events.map(handleEvent))
    // console.log(replies)
    // ctx.body = replies
});

const app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
