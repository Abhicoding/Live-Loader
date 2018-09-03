// Write a basic file tree watcher
const chokidar = require('chokidar')
const fossilDelta = require('node-delta')
const fs = require('fs')

var target, origin, delta, result

var watcher = chokidar.watch('watched', {ignored: /^\./, persistent: true});
watcher
.on('add', function(path) {console.log('File', path, 'has been added');})
.on('change', function () {
      console.log('change detected')
      target = fs.readFileSync('watched/root.js')
      if (!origin) {
        origin = fs.readFileSync('write/root_clone.js')
      }
      delta = fossilDelta.create(origin, target)
      result = fossilDelta.apply(origin, delta)
      origin = result
      fs.writeFile('write/root_clone.js', result, function (err) {
        if (err) throw err;
        console.log('The file has been saved!');
      })
   })
.on('unlink', function(path) {console.log('File', path, 'has been removed');})
.on('error', function(error) {console.error('Error happened', error);})


// Add a file delta emitter

// Add a way to combine file delta with original file

// Replicate above over a remote socket connection