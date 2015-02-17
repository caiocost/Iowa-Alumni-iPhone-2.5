var ApplicationWindow = require('ui/common/ApplicationWindow');
var WebView = require('ui/common/WebView');
var SocialMediaIcons = require('ui/common/SocialMediaIcons');
var StaticAd = require('ui/common/StaticAd');
var IOSSetting = require('ui/common/IOSSetting');
var TableRows = require('ui/common/TableRows');
var TableStyling = require('ui/common/TableStyling');
var setting = new IOSSetting();

function ContactUsWindow(title, tracker) {
	var tableStyling= new TableStyling();
	var mainTable = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'transparent',
		height:				'auto',
		width: 				setting.platformWidth(),
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0
	});
	
	var mainRows = new TableRows();
	var contactRows = new TableRows();
	tracker.trackScreen(title);
	//The Different Views
	var contactTable = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'ffffff',
		height:				setting.contactViewHeight(),
		width: 				setting.defualtContentWidth(),
		left: 				setting.defualtLeft(),
		top:				setting.defualtTop(),
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		scrollable: false,
		borderWidth: 		1
	});
	
	
	var socialMediaTable = Ti.UI.createView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				setting.contactViewHeight(),
		width: 				setting.defualtContentWidth(),
		left: 				setting.defualtLeft(),
		top:				setting.defualtTop(),
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
		
	});
	
		
	var scrollMainView = Ti.UI.createView({
	  top: 0,
	  contentWidth: 320,
	  contentHeight: 420,
	  showVerticalScrollIndicator: false,
	  showHorizontalScrollIndicator: false
	});
	
	var ad = new StaticAd(14,392, tracker, title);
	
	
	// The Contact View 
	var textCurrentTop = 0;
	
	var contactLabel = Ti.UI.createLabel({
		text: "Contact Us",
		top: setting.defualtTop()
	});
	
	var levittLabel = Ti.UI.createLabel({
		text: "Levitt Center",
		top: setting.defualtTop()
	}); 
	textCurrentTop = levittLabel.top;
	
	var levittline = Ti.UI.createView({
		width: 				setting.contactLevittLine(),
		top:				0			
		
	});
	
	levittLabel.addEventListener('click', function(e) {
		new WebView ('http://www.iowalum.com/about/levitt.cfm');
		tracker.trackEvent({
					category: "General Information",
					action: "click",
					label: "UIAA About Us Site",
					value: 1
				});
	}); 
	
	
	var addressLabel = Ti.UI.createLabel({
		text: ("P.O. Box 1970").concat('\n').concat("Iowa City, IA 52244-1970"),
		//top: setting.defualtTop()
	});
	
	
	var phoneLabel = Ti.UI.createLabel({
		text: ("Phone: 319/335-3294").concat('\n').concat("Toll Free: 800/469-2586").concat('\n').concat("FAX: 319/335-1079"),
		top: setting.defualtTop()
	});
	
	
	var emailLabel = Ti.UI.createLabel({
		text: "alumni@uiowa.edu",
		//top: 128
	});
	
	var emailline = Ti.UI.createView({
		width: 				setting.contactEmailLine(),
		//top:				142			
	});
	
	emailLabel.addEventListener('click', function(e) {
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.toRecipients = ['alumni@uiowa.edu'];
		var f = Ti.Filesystem.getFile('cricket.wav');
		emailDialog.addAttachment(f);
		emailDialog.open();
		tracker.trackEvent({
					category: "General Information",
					action: "click",
					label: "UIAA Email Address",
					value: 1
				});
	}); 
	
	
	
	// Social Network View
	var socialMdeiaLabel = Ti.UI.createLabel({
		text: "Social Networks",
		left: setting.defualtLeft(),
		top: 10
	});
	
	var icon = new SocialMediaIcons();
	
	var socialMediaView = Ti.UI.createView({
			
			backgroundColor: 	'#fff',
			//height:				setting.socialMediaViewHeight(),
			//left: 				setting.defualtLeft(),
			textAlign: 'center',
			width: 0,
			top: setting.defualtTop(),
	});
	
	
	var currentLeft = 0;
	var currentTop = 0;
	var facebookimage = icon.facebook(currentTop,currentLeft,tracker);
	currentLeft = updateLeft(currentLeft);
	var twitterimage = icon.twitter(currentTop,currentLeft,tracker);
	currentLeft = updateLeft(currentLeft);
	var foursquareimage = icon.foursquare(currentTop,currentLeft,tracker);
	
	currentLeft = 0;
	currentTop = setting.contactSMIconHeight() + 5;
	var linkedInimage = icon.linkedIn(currentTop,currentLeft,tracker);
	currentLeft = updateLeft(currentLeft);
	var pinterestimage = icon.pinterest(currentTop,currentLeft,tracker);
	currentLeft = updateLeft(currentLeft);
	var instagramimage = icon.instagram(currentTop,currentLeft,tracker);
	urrentLeft = updateLeft(currentLeft);
	socialMediaView.width = currentLeft;
	
	
	//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
	
	//Font
	 
	   emailLabel.font 
	= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'};
	
	// Font (Header)
	socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'} ;
	
	//Text Align(For All Text)
	 emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
	socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
	
	
	//Width (Images)
	instagramimage.width = pinterestimage.width = linkedInimage.width = foursquareimage.width = twitterimage.width = facebookimage.width = setting.contactSMIconWidth();
	
	//Height (Images)
	instagramimage.height = pinterestimage.height = linkedInimage.height = foursquareimage.height = twitterimage.height = facebookimage.height = setting.contactSMIconHeight();
	 
	 //Link Color
	 emailline.backgroundColor =  levittline.backgroundColor =  emailLabel.color =  levittLabel.color = "blue";
	
	// Line Height
	 emailline.height =  levittline.height = 1 ;
	
	//Left 
	socialMdeiaLabel.left =  contactLabel.left =
	  emailline.left =  levittline.left =  emailLabel.left = phoneLabel.left = addressLabel.left =  levittLabel.left = setting.defualtLeft();
	
	
	//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
	contactRows.add(contactLabel);	contactRows.add(levittLabel);	contactRows.add(levittline);	contactRows.add(addressLabel);
	contactRows.add(phoneLabel);	contactRows.add(emailLabel);	contactRows.add(emailline);/* */contactTable.setData(contactRows.getRows());
	mainRows.add(contactTable);
	//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
	
		socialMediaTable.add(socialMdeiaLabel);socialMediaView.add(facebookimage); socialMediaView.add(twitterimage);socialMediaView.add(foursquareimage);socialMediaView.add(linkedInimage);
	socialMediaView.add(pinterestimage);socialMediaView.add(instagramimage); 
	socialMediaTable.add(socialMediaView);
	mainRows.add(socialMediaTable);
	
	//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
	mainTable.setData(mainRows.getRows()); scrollMainView.add(mainTable); scrollMainView.add(ad);
	 
	
	
	var self = new ApplicationWindow(title, scrollMainView);
	return self;
}

function updateLeft(currentLeft){
	return currentLeft = currentLeft + setting.contactSMIconWidth() + setting.defualtLeft();
}

module.exports = ContactUsWindow;