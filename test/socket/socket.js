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
  console.log('Awaiting changes....', typeof data)  // origin value needs to be set here on first connection
})

socket.on('file change', delta => {
  console.log(origin, '***origin***')
  console.log(delta, '***delta***')
  try {
    result = fossilDelta.apply(origin, delta)
    var evalFeed = ab2str(result)
    console.log(evalFeed, 'evalFeed')
    console.log(result, 'result')
    eval(evalFeed)
    console.log('Execution successful')
    origin = result
    socket.emit('merge success')
  } catch (err) {
    socket.emit('merge failed')
    console.log(`Change execution failed! ${err}`)
  }
})