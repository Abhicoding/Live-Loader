# Live-Loader

<h3>Building Hot Module Replacement</h3>

This project was an attempt to replicate HMR like features. It is not a tool but a configration created to understand the workings of HMR. 

There is no module replacement and having encountered issues related to merging deltas in the front-end, the live updating of browser without refresh was achieved.

For theory of how HMR works following text was referred:

<a href="https://webpack.js.org/concepts/hot-module-replacement/">Webpack/concepts/hot-module-replacement</a>

<h3>Scripts</h3>
<ol>
  <li>
    The server script runs the dev server.

    npm run server
  </li>
  <li>
    The watcher script runs the webpack bundler of files to be live loaded on change.

    npm run watcher
  </li>
  <li>
    The build script creates  the bundle that runs the Live loader on client side.

    npm run build
  </li>
</ol>

<h3>Issues</h3>
 <ul>
 <li>
  The fossil-delta creates target files inconsistently and contains errors
 </li>
 <li>
  The watcher keeps the file busy long after the change event is emitted. This cause the fs.read to return empty string as file content which causes problems.
 </li>
 </ul>