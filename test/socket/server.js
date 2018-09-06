var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var io = require('socket.io')(http)
var fs = require('fs')
var chokidar = require('chokidar')
var nodeDelta = require('fossil-delta')
var origin, delta, connection

var PORT = process.env.PORT || 3000
var watcher = chokidar.watch(path.resolve(__dirname, '../../dist/main.root.js'), /^\./, {persistent : true})

app.use(express.static(path.resolve(__dirname, '../../dist/')))

function emitDelta (socket) {
    target = fs.readFileSync(path.resolve(__dirname, '../../dist/main.root.js'))
    delta = nodeDelta.create(origin, target)
    console.log('**delta**', Array.isArray(delta))
    console.log('**target**', target.toString())
    var temp = nodeDelta.apply(origin, delta)
    console.log('***final***', String.fromCharCode.apply(null, new Uint8Array(temp)))
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
  // if (connection === true) {
  //   io.removeAllListeners()
  // }
  connection = true
  origin = fs.readFileSync(path.resolve(__dirname, '../../dist/main.root.js'))
  console.log('**origin**', origin.toString())
  socket.emit('connection', origin)
  watcher.on('add', () => {
    console.log(this)
    return emitDelta(socket)})
  watcher.on('change', () => {
    return emitDelta(socket)})
  // watcher.on('unlink', emitDelta(socket))
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/socket.html'))
})

http.listen(PORT, () => console.log(`Listening on port ${PORT}`))