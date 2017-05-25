const Client = require("../../service/LINE/client");
const lineVerifyMiddleware = require("../../service/LINE/utils")
  .koaValidateMiddleware;
const bodyParser = require("koa2-better-body");

module.exports = router => {
  router.post(
    "/LINE/webhook",
    bodyParser(),
    lineVerifyMiddleware(),
    async (ctx, next) => {
      const client = new Client(ctx.config);

      const events = ctx.request.fields.events;
      console.log(JSON.stringify(events, null, 2));

      const echos = events.map(handleEvent);
      const tokens = events.map(event => event.replyToken);
      const results = await Promise.all(
        echos.map((echo, index) => {
          return client.replyMessage(tokens[index], echo);
        })
      );
      console.log(results);
      const jsonResult = await Promise.all(
        results.map(result => result.json())
      );
      console.log(jsonResult);
      ctx.body = jsonResult;

      await next();
    }
  );
};

const handleEvent = event => {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }
  const echo = { type: "text", text: event.message.text };
  return echo;
};
