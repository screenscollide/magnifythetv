/*

http://stackoverflow.com/questions/6524716/using-forever-with-node-js
*/

var forever = require('forever-monitor');

 var child = new (forever.Monitor)('app.js', {
   max: 3,
   silent: true,
   options: []
 });

 child.on('exit', function () {
   console.log('your-filename.js has exited after 3 restarts');
 });

 child.start();