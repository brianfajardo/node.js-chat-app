const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const PORT = 3000

app.use(express.static(path.join(__dirname, './public')))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.json())

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`))