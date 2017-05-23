const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa2-better-body')
const config = require('./config')

console.log(JSON.stringify(config, null, 2))

const router = new Router()
router.post('/line-webhook', bodyParser(), async (ctx, next) => {
  console.log(JSON.stringify(ctx.request.fields, null, 2))
  await next()
  // const replies = await Promise.all(ctx.request.events.map(handleEvent))
  // console.log(replies)
  // ctx.body = replies
})

const app = new Koa()
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
