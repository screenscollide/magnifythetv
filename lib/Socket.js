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
		socket.on("disconnect",    thisObj.onDisconnect );
		socket.on("videoload",     thisObj.onVideoLoad );
		socket.on('videoupdate',   thisObj.onVideoUpdate );
		socket.on("videovolume",   thisObj.onVideoVolume );
		socket.on("videoplay",     thisObj.onVideoPlay );
		socket.on("videopause",    thisObj.onVideoPause );
		socket.on("videomute",     thisObj.onVideoMute );
		socket.on("videounmute",   thisObj.onVideoUnmute );
		//TV to 2nd screen
		socket.on("videoduration", thisObj.onVideoDuration );
		socket.on("videoplaying",  thisObj.onVideoPlaying );
		socket.on("videopaused",   thisObj.onVideoPaused );
		
	});
}

exports.status = function( bool ){
//	console.log( "Socket::status:", bool );
	io.sockets.emit("emailStatus", bool );
}


////////////////////////////////////////////////////////////
//2nd screen to TV
////////////////////////////////////////////////////////////
exports.onDisconnect = function(  ){
	io.sockets.emit("onDisconnect", "user disconnected" );
}

exports.onVideoLoad = function( id ){
	io.sockets.emit( "onVideoLoad", id );
}

exports.onVideoUpdate = function( time ){
	io.sockets.emit( "onVideoUpdate", time );
}

exports.onVideoVolume = function( volume ){
	io.sockets.emit( "onVideoVolume", volume );  
}

exports.onVideoPlay = function(  ){
	io.sockets.emit( "onVideoPlay" );    
}

exports.onVideoPause = function(  ){
	io.sockets.emit( "onVideoPause" );  
}

exports.onVideoMute = function(  ){
	io.sockets.emit( "onVideoMute" );  
}

exports.onVideoUnmute = function(  ){
	io.sockets.emit( "onVideoUnmute" );  
}

////////////////////////////////////////////////////////////
//TV to 2nd screen
////////////////////////////////////////////////////////////
exports.onVideoDuration = function( obj ){
	io.sockets.emit( "onVideoDuration", obj );
}
exports.onVideoPlaying = function( ){
	io.sockets.emit( "onVideoPlaying" );
}
exports.onVideoPaused = function( obj ){
	io.sockets.emit( "onVideoPaused" );
}