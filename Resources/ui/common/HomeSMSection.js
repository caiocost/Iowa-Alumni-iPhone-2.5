var WebView = require('ui/common/WebView');
var GetFeed = require('ui/common/GetFeed');
var SocialMediaIcons = require('ui/common/SocialMediaIcons');
var IOSSetting = require('ui/common/IOSSetting');
var setting = new IOSSetting();

function HomeSMSection(tracker){
	var socialMediaView = Ti.UI.createView({
			
			backgroundColor: 	'#e2e2e2',
			height:				setting.socialMediaViewHeight(),
			//left: 				setting.defualtLeft(),
			textAlign: 'center',
			width: 0,
			top: setting.defualtTop(),
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(socialMediaView);
		
		var icon = new SocialMediaIcons();
	var currentLeft = 0;
	var facebookimage = icon.facebook(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	var twitterimage = icon.twitter(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	var instagramimage = icon.instagram(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	var linkedInimage = icon.linkedIn(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	var foursquareimage = icon.foursquare(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	var pinterestimage = icon.pinterest(0,currentLeft,tracker);
	
	currentLeft = updateLeft(currentLeft);
	socialMediaView.width = currentLeft - setting.defualtLeft();
	
	/**/
		
	
		//Width (Images)
		pinterestimage.width =  foursquareimage.width = linkedInimage.width = instagramimage.width = twitterimage.width = facebookimage.width = setting.socialMediaIconsWidth();
		
		//Height (Images)
		pinterestimage.height =   foursquareimage.height =  linkedInimage.height = instagramimage.height = twitterimage.height = facebookimage.height = setting.socialMediaIconsHeight();
	//----------------------------------------------------------------------------------------------------------	 
		socialMediaView.add(facebookimage);
		socialMediaView.add(twitterimage);
		socialMediaView.add(instagramimage);
		socialMediaView.add(linkedInimage);
		socialMediaView.add(foursquareimage);
		socialMediaView.add(pinterestimage);
		
		return row;
}

function updateLeft(currentLeft){
	return currentLeft = currentLeft + setting.socialMediaIconsWidth() + setting.defualtLeft();
}

module.exports = HomeSMSection;