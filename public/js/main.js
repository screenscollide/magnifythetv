$('.peppable').pep({
	//debug: true,
	constrainToParent: true,
	drag: function(ev,obj){
		var el = $(obj.el);
		var val = (el.parent().height() - el.position().top) / el.parent().height();
		switch( ev.type ){
			case "mousemove":
			console.log( "Left:", el.position().left, "Top:", el.position().top, val + "%" );
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