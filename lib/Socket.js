/*
 * name: sockets.io
 * Desc: Socket bridges the Social Remote view (remote.jade) with the TV view (tv.jade)
 * Date Modified: 11/1/12
 * 
 */

var thisObj = this;
var socket = require('socket.io');
var io = {};

exports.init = function( server ){
	io = socket.listen( server );	
	io.sockets.on( 'connection', function( socket ) {
		//2nd screen to TV
		socket.on("joystickmove", thisObj.onJoyStickMove );

	});
}
exports.onJoyStickMove = function( obj ){
	io.sockets.emit( "onJoyStickMove", obj );  
}