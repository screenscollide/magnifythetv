$('.peppable').pep({
	//debug: true,
	constrainToParent: true,
	drag: function(ev,obj){
		var el = $(obj.el);
		var val = (el.parent().height() - el.position().top) / el.parent().height();
		switch( ev.type ){
			case "mousemove":
			console.log( "Left:", el.position().left, "Top:", el.position().top, val + "%" );
			SocketBridge.joystickMove( el.position().left, el.position().top );
			break;
		}
	},
	stop: function(ev,obj){
		//$(obj.el).css({ "-webkit-transform": "scale("+ 0.3 +")" });
	},
	rest: function(ev,obj){
		//$(obj.el).css({ "-webkit-transform": "scale("+ 1 +")" });
	}
});


$('.peppable2').pep({
	debug: true, 
	constrainToWindow: true,
	drag: function(ev,obj){ 
		var el = $(obj.el);
		var val = (el.parent().height() - el.position().top) / el.parent().height();
		console.log( el.position().left, el.position().top, val )
	}
});


/*********************
* Socket.io
*********************/
var SocketBridge = {
	socket: null,
	initialize: function( ){
		this.socket = io.connect( "/" );
	},
	joystickMove: function( x, y ){
		SocketBridge.socketIoSend( "joystickmove", { x: x, y: y } );
	},
	socketIoSend: function ( event, params ){
		this.socket.emit( event, params, function( data ){
		}); 
	},
	error: function( err){
		console.log( "SocketBridge.err", err )
	}
}

SocketBridge.initialize();