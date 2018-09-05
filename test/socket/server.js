var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var io = require('socket.io')(http)
var fs = require('fs')

var PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../../dist/')))

io.on('connection', (socket) => {
  socket.emit('connection')
  var data = fs.readfileSync('root.js')
  socket.emit('file change', `console.log("goodbye cruel world")`) 
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/socket.html'))
})

http.listen(PORT, () => console.log(`Listening on port ${PORT}`))