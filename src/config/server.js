const env = require('../../src/.env')

const port = env.server.porta
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: env.server.extended }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(process.env.PORT || port, function() {
    console.log('BACKEND iniciado com sucesso, na porta '+port)
})

module.exports = server