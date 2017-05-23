const LINE = require('../../service/LINE')
const bodyParser = require('koa2-better-body')

module.exports = router => {
  router.post(
    '/LINE/webhook',
    bodyParser(),
    LINE.koaValidateMiddleware(),
    async (ctx, next) => {
      console.log(JSON.stringify(ctx.request.fields, null, 2))
      await next()
      // const replies = await Promise.all(ctx.request.events.map(handleEvent))
      // console.log(replies)
      // ctx.body = replies
    }
  )
}
