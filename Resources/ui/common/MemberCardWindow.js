var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var Feed = require('ui/common/Feed');
var TableRows = require('ui/common/TableRows');


function  MemberCardWindow(title, tracker){
	tracker.trackScreen(title);
	var Feeds = new Feed();
	var rows = new TableRows();
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'transparent',
		height:				'auto',
		width: 				setting.platformWidth(),
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0
	});
	
	var passwordWin = Ti.UI.createView({
	    top: 0,
	    backgroundColor:'#cccccc',
	    navBarHidden: true
	});
	
	
	var passwordLabel = Ti.UI.createLabel({
		text: "Please enter your UIAA members-only password below to access your member card.",
		height:'auto',
		width:setting.defualtContentWidth(),
		textAlign: 'center',
		top:setting.defualtTop(),
		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}
	});
	rows.add(passwordLabel);

	var passwordTextField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		passwordMask: true,
  		top: setting.defualtTop(),
  		textAlign: 'center',
  		width: setting.memberCardPasswordTextFieldWidth(), 
  		height: setting.memberCardPasswordTextFieldHeight(),
  		backgroundColor :"#fff",
  		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'normal'}
	});
	
	rows.add(passwordTextField);
	
	var loginButton = Ti.UI.createButton({
		title:'Login',
		width: setting.memberCardLoginButtonWidth(), 
  		height: setting.memberCardLoginButtonHeight(),
  		textAlign: 'center',
		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		
	});
	rows.add(loginButton);	
	
	var responseArea = Ti.UI.createImageView({left: 0, width: setting.defualtContentWidth()});
	
	var activityIndicator = Ti.UI.createActivityIndicator({
		  font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'},
		  message: 'Checking Password...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  //top:105,
		  textAlign: 'center',
		  height:'auto',
		  width:'auto'
	});
	
	
  	responseArea.add(activityIndicator);
	
	
	var wrongPasswordLabel = Ti.UI.createLabel({
		text: "You may have typed the password incorrectly, try again.",
		textAlign: 'center',
		height:'auto',
		width: setting.defualtContentWidth(),
		color:'#FF0000',
		//top: 105,
  		left:  setting.defualtLeft(),
		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	responseArea.add(wrongPasswordLabel);
	rows.add(responseArea);
	
	var passwordHeaderLabel = Ti.UI.createLabel({
		text: "Forgot the Password?",
		width: setting.defualtContentWidth(),
		top: setting.defualtTop(),
		textAlign: 'left',
  		left: setting.defualtLeft(),
		font: {fontFamily:'Helvetica-Bold',fontSize:setting.postDescriptionFontSize(),fontWeight:'normal'}
	});
	
	
	rows.add(passwordHeaderLabel);
	
	var passwordInfoLabel = Ti.UI.createLabel({
		text: "Let us know via email (alumni-member@uiowa.edu) and we will send it to you promptly during regular business hours. Type 'members-only password' in the subject line of your message and include your first and last name, city, and state.",
		height:'auto',
		width: setting.defualtContentWidth(),
  		left: setting.defualtLeft(),
		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	
	rows.add(passwordInfoLabel);
	
	var image = Ti.UI.createImageView({
	  image:    'http://iowalum.com/membership/images/MemberCard.png',
	  textAlign: 'center',
	  width: setting.memberCardImageWidth(),
	  height: setting.memberCardImageHeight()
	});
	
	var thawk = Ti.UI.createImageView({
	  image:    'thawk.png',
	  top:  setting.defualtTop(),
	  width: setting.memberCardThawkWidth(),
	  height: setting.memberCardThawkHeight()
	});
	rows.add(thawk);
	//passwordWin.add(thawk);
	//passwordWin.add(wrongPasswordLabel);
	wrongPasswordLabel.setVisible(false);
	
	function getMemberCard(isCard2){
			passwordWin.remove(table);
			passwordWin.backgroundColor = '202020';
			wrongPasswordLabel.setVisible(false);
			
			if (isCard2 == true){
				image.image =  'http://iowalum.com/membership/images/MemberCard2.png';
			}
			passwordWin.add(image);
		
			
			
			
	}
	
	
	loginButton.addEventListener('click',function(){
		wrongPasswordLabel.setVisible(false);
		activityIndicator.show();
		setTimeout(function(){activityIndicator.hide();}, 2000);
		setTimeout(function(){
			var password = (new GetFeed(Feeds.passwordFeed())[0]);
		password.pass =  password.pass.replace(" ","");
		password.pass =  password.pass.replace(" ","");
		password.pass2 =  password.pass2.replace(" ","");
		password.pass2 =  password.pass2.replace(" ","");
   		if (passwordTextField.value == password.pass) {
			 getMemberCard(false);
			tracker.trackEvent({
				category: "Members Card",
				action: "using card",
				label: "Password: onceahawkeye",
				value: 1
			});
		}
		
		else if (passwordTextField.value == password.pass2) {
			 getMemberCard(true);
			 tracker.trackEvent({
				category: "Members Card",
				action: "using card",
				label: "Password: hawkeyes",
				value: 1
			});
		}
		else {
			wrongPasswordLabel.setVisible(true);
		}
			
			
			
}, 3000);
		
		
	});

	
	var thawk = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/mobile/clubs.png',
	  top:   130
	});
	/*
	passwordWin.add(passwordLabel);
	passwordWin.add(passwordInfoLabel);
	passwordWin.add(passwordHeaderLabel);
	passwordWin.add(passwordTextField);*/
	table.setData(rows.getRows());
	passwordWin.add(table);
	
	
	
	var self = new ApplicationWindow(title, passwordWin);
	return self;
}



module.exports = MemberCardWindow;