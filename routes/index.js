
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Move the TV' });
};

exports.tv = function(req, res){
	var userAgent = req.headers["user-agent"];
	var screenSm  = /(iP(ad|hone|od)|PlayBook)/i;
	var screenLg  = /(Large Screen|GoogleTV|Boxee|roku|firefox|Safari|Chrome)/i;

	if( userAgent.match( screenSm ) ){
		res.redirect('/remote');
	} else if( userAgent.match( screenLg ) ){
        res.render('tv', { title: 'Move the TV: Television' });
	}	
};

exports.remote = function(req, res){
  res.render('remote', { title: 'Move the TV: Remote Control' });
};
