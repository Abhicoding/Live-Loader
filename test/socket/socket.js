const fossilDelta = require('fossil-delta')
// const io = require('socket.io')

var socket = io();
var origin, result
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

console.log('Hello')

socket.on('connection', data => {
  origin = data
  console.log('Awaiting changes....')  // origin value needs to be set here on first connection
})

socket.on('file change', delta => {
  console.log(ab2str(origin), '***origin***')
  console.log(delta.toString(), '***delta***')
  result = fossilDelta.apply(origin, delta)
  try {
    var evalFeed = ab2str(result)
    eval(evalFeed)
    console.log('Execution successful')
    origin = result
    socket.emit('merge success')
  } catch (err) {
    socket.emit('merge failed')
    console.log(`Change execution failed! ${err}`)
  }
})