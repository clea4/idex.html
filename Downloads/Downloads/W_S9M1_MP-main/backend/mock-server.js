const { setupServer } = require('msw/node')
const { rest } = require('msw')
const Auth = require('./helpers/auth')

async function login(req, res, ctx) {
  const result = await Auth.login(req.body, 5)
  if (result.success) {
    ctx.status = 200
  } else {
    ctx.status = 401
  }
  return res(
    ctx.json(result.payload),
  )
}

async function logout(req, res, ctx) {
  return res(
    ctx.json(await Auth.logout(5)),
  )
}

const handlers = [
  rest.post('http://localhost:9009/auth/login', login),
  rest.get('http://localhost:9009/auth/logout', logout),
]

module.exports = setupServer(...handlers)
