const request = require('supertest')
const Koa = require('koa')

const app = new Koa()

it('should return status code 404 for all request', function(done) {
  request(app.callback()).post('/line-webhook').expect(404, done)
})
