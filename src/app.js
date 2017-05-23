const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa2-better-body')
const config = require('./config')

/* ----- bootstrap server ----- */
const app = new Koa()
// use logger
if (config.logger) {
  const logger = require('koa-logger')
  app.use(logger())
}
// use router
const router = new Router()
router.post('/line-webhook', bodyParser(), async (ctx, next) => {
  console.log(JSON.stringify(ctx.request.fields, null, 2))
  await next()
  // const replies = await Promise.all(ctx.request.events.map(handleEvent))
  // console.log(replies)
  // ctx.body = replies
})

app.use(router.routes())
app.use(router.allowedMethods())
// setting main business logic

// listen
app.listen(config.port, () => {
  console.log(`listening on ${config.port}`) // eslint-disable-line no-console
})
