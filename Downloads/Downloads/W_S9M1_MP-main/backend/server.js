const express = require('express')
const cors = require('cors')
const path = require('path')
const authRouter = require('./routers/auth')

const PORT = process.env.PORT || 9009

const server = express()

server.use(express.json())

server.use(express.static(path.join(__dirname, '../dist')))

server.use(cors())

server.use('/auth', authRouter)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.path} does not exist`,
  })
})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
