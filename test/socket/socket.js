const fossilDelta = require('fossil-delta')

var socket = io();
var origin, result

// function ab2str(buf) {
//   return String.fromCharCode.apply(null, new Uint8Array(buf));
// }

socket.on('live', data => {
  console.log('got data', data)
})

socket.on('originFile', data => {
  // console.log('Got origin', data.origin)
  origin = data.origin
})

socket.on('fileChange', data => {
  // console.log('Merging this origin', origin)
  mergeDelta(origin, data.delta)
})

// socket.on('deltaReceived', data => {
//   console.log('got delta', data)
//   delta = data
//   try {
//     result = fossilDelta.apply(origin, delta)
//     console.log('Apply success', result)
//     // var evalFeed = ab2str(result)
//     // console.log(evalFeed, 'evalFeed')
//     // console.log(result, 'result')
//     // eval(evalFeed)
//     // console.log('Execution successful')
//     // origin = result
//     // socket.emit('merge success')
//   } catch (err) {
//     socket.emit('merge failed')
//     console.log(`Change execution failed! ${err}`)
//   }
// })

function mergeDelta (origin, delta) {
  result = fossilDelta.apply(origin, delta).join('')
  eval(result)
  // console.log(origin, '***origin***')
  // console.log(result, '***result***')

  origin = result
}


// socket.on('file change', delta => {
//   console.log(origin, '***origin***')
//   console.log(delta, '***delta***')
//   try {
//     result = fossilDelta.apply(origin, delta)
//     var evalFeed = ab2str(result)
//     console.log(evalFeed, 'evalFeed')
//     console.log(result, 'result')
//     eval(evalFeed)
//     console.log('Execution successful')
//     origin = result
//     socket.emit('merge success')
//   } catch (err) {
//     socket.emit('merge failed')
//     console.log(`Change execution failed! ${err}`)
//   }
//})