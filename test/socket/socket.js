const fossilDelta = require('node-delta')

console.log('hello!')

var socket = io();
var origin, result, delta

socket.on('connection', (data) => {
  origin = data
  console.log('Awaiting changes....')  // origin value needs to be set here on first connection
})

socket.on('file change', delta => {
  console.log('file change event triggered')
  result = fossilDelta.apply(origin, delta)
  try {
    eval(result.toString())
    console.log('Execution successful')
    origin = result
  } catch (err) {
    console.log(`Change execution failed! ${err}`)
  }
})