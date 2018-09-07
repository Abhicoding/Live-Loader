var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var io = require('socket.io')(http)
var fs = require('fs')
var chokidar = require('chokidar')
var fossilDelta = require('fossil-delta')
var origin, delta, target

var PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../../dist/')))

var watcher = chokidar.watch(path.resolve(__dirname, '../../dist/main.root.js'), /^\./, {persistent : true})

io.on('connection', socket => socket.emit('live', 'Hello from server'))

watcher
  .on('add', path => {
    setTimeout(() => fs.readFile (path, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        origin = data
        console.log('**origin***', data)
      }
    }), 999)
  })
  .on('change', path => {
    // console.log(`File ${path} has been changed`)
    setTimeout(() => fs.readFile (path, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('**origin***', origin)
        // console.log('**delta***', delta)
        if (!target) {
          io.emit('originFile', {origin:  origin})
        }
        target = data
        delta = createDelta(target, origin)
        console.log('***result***', fossilDelta.apply(origin, delta).join(''))
        io.emit('fileChange', {delta: delta})
        // console.log('**target***', target)
        origin = target
      }
    }), 1000)
  })

function createDelta (target) {
  return fossilDelta.create(origin, target)
}


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/socket.html'))
})

http.listen(PORT, () => console.log(`Listening on port ${PORT}`))