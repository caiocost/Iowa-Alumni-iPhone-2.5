var WebView = require('ui/common/WebView');
var IOSSetting = require('ui/common/IOSSetting');
var setting = new IOSSetting();
/*
 * Ad Object
 * Essential attributes
 */

function Ad(post, tracker, title) {

    var row = Ti.UI.createTableViewRow({
		hasChild:true,
		height: setting.staticAdHeight(),
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5,
		selectionStyle: 'none'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
		width: setting.defualtContentWidth(),
		height: setting.staticAdHeight(),
		left: 			setting.defualtLeft(),
		top:			-5,
		bottom:			0,
		padding:		0,
		borderRadius:	5
	});


	var imagebox = Ti.UI.createImageView({
		image: post.ad,
		defaultImage:  "loader480x120.png",
		width: setting.defualtContentWidth(),
		height: setting.staticAdHeight(),
		hires: true,
		top: setting.defualtTop()
		
	});
	
	
	container.add(imagebox);
	

	row.add(container);
	
	row.addEventListener('click', function(e) {
		new WebView (post.link );
		
		tracker.trackEvent({
				category: "Ads",
				action: "click",
				label: "An Ad in the " + title + "'s Window - " + post.ad,
				value: 1
		});
		
	});
	
	return row;

}


module.exports = Ad;
