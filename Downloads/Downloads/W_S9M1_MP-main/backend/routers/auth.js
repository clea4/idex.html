const express = require('express')
const Auth = require('../helpers/auth')

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const result = await Auth.login(req.body, 1000)
  if (result.success) {
    res.status(200).json(result.payload)
  } else {
    next({ status: 401, message: result.payload.message })
  }
})

router.get('/logout', async (req, res) => {
  res.json(await Auth.logout(1000))
})

module.exports = router
