var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var io = require('socket.io')(http)
var fs = require('fs')
var chokidar = require('chokidar')
var nodeDelta = require('fossil-delta')
var origin, delta

var PORT = process.env.PORT || 3000
var watcher = chokidar.watch(path.resolve(__dirname, '../watched'), /^\./, {persistent : true})

app.use(express.static(path.resolve(__dirname, '../../dist/')))

function emitDelta (socket) {
  target = new Buffer(fs.readFileSync(path.resolve(__dirname, '../../dist/main.root.js')))
  delta = nodeDelta.create(origin, target)
  console.log('**delta**', delta.toString())
  console.log('**origin**', origin.toString())
  console.log('***final***', nodeDelta.apply(origin, delta))
  socket.emit('file change', delta)
  socket.on('merge success', () => {
    origin = target
    delta = null
  })
  socket.on('merge failed', () => {
    console.log('merge unsuccessful')
  })
}

io.on('connection', (socket) => {
  origin = new Buffer(fs.readFileSync(path.resolve(__dirname, '../../dist/main.root.js')))
  socket.emit('connection', origin)
  watcher.on('add', () => emitDelta(socket))
  watcher.on('change', () => emitDelta(socket))
  // watcher.on('unlink', emitDelta(socket))
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/socket.html'))
})

http.listen(PORT, () => console.log(`Listening on port ${PORT}`))