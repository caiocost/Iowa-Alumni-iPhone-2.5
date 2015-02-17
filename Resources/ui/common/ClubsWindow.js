var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var TableRows = require('ui/common/TableRows');
var TableStyling = require('ui/common/TableStyling');
var IOSSetting = require('ui/common/IOSSetting');
var setting = new IOSSetting();

/*
 * Clubs View
 */

function ClubsWindow(clubData, clubInfoData,  tracker, top){
	var scrollBoxHeight = 60;
	var tableStyling= new TableStyling();
	
	var self = Ti.UI.createView({
	    backgroundColor:'#e2e2e2',
		top: top,
		bottom: 60
	});


	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 0
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubInfoData.length - 1; i++) {


	    var row = Ti.UI.createTableViewRow({
	    	city: clubInfoData[i].city,
	        height: 'auto',
	        selectionStyle: 'none',
	        index: i,
	        bottom: 10
	    });
		
		(rowCounter % 2 == 0) ? row.backgroundColor = '#ffffff' : row.backgroundColor = '#cccccc';
		var content = tableStyling.blankTableView('auto');
		
		var rows = new TableRows();
	    var cityLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].city),
	        textAlign: 'left',
	        //height: 20,
	        top: setting.defualtTop(),
	        left: setting.defualtLeft(),
	        font: {fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	    });
	    rows.add(cityLabel);
	    
	   var leaderLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].leader),
	        textAlign: 'left',
	        left: setting.defualtLeft(),
	        //top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	    }); 
	    rows.add(leaderLabel);
	    
	    //var currentTop = 46;
	    var currentLeft = setting.defualtLeft();
	    
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].phone),
		        textAlign: 'left',
		        left: setting.defualtLeft(),
		        //top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		    });
		    rows.add(phoneLabel);
		    //currentTop = currentTop + 15;
		    
			
	    }
	    if (clubInfoData[i].email != 'NA'){
		    var emailLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].email),
		        textAlign: 'left',
		        index: i,
		        left: setting.defualtLeft(),
		        //top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		    });
		  
		    rows.add(emailLabel);
	    	//currentTop = currentTop + 15;
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].web),
		        textAlign: 'left',
		        left: setting.defualtLeft(),
		        //top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		    });
		   
			rows.add(webLabel);
			//currentTop = currentTop + 20;
	    }
	    
	    var iconsView = Ti.UI.createView({
			backgroundColor: 	'transparent',
			height:				'auto',
			left: 0,
			width: setting.platformWidth(),
		});
	    
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneButton = Ti.UI.createButton({
		    	backgroundImage:"call.png",
				width:setting.clubsIconsWidth(),
				height:setting.clubsIconsHeight(),
				//top: currentTop,
		  		left: currentLeft,
				buttonid: i,
			});
			currentLeft = currentLeft + setting.clubsIconsWidth() + setting.clubsIconsSpacing();
		    iconsView.add(phoneButton);
		   

		     phoneButton.addEventListener('click', function(e) {
		     	//Ti.API.info(e);
		     	//Ti.API.info( e.source.buttonid);
		     	//Ti.API.info(pos);
	    		var phone = (clubInfoData[e.source.buttonid].phone).replace(/(\|H: |C: |W: )/gm,"");
		    	phone = phone.replace(/(-)/gm, "");
		    	phone = phone.replace(/(H: )/gm, "");
	    		Titanium.Platform.openURL("tel:" + phone);
	    		//Ti.API.info(phone);
	    		
	    		tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].phone,
					value: 1
				});
			
			}); 
			
	    }
	    
	      if (clubInfoData[i].email != 'NA'){
		     var emailButton = Ti.UI.createButton({
		    	backgroundImage:"mail.png",
				width:setting.clubsIconsWidth(),
				height:setting.clubsIconsHeight(),
				//top: currentTop,
		  		left: currentLeft,
				buttonid: i
			});
			currentLeft = currentLeft + setting.clubsIconsWidth() + setting.clubsIconsSpacing();
		    
		   
	    	emailButton.addEventListener('click', function(e) {
	    		//Ti.API.info(e.index);
				var emailDialog = Ti.UI.createEmailDialog();
				emailDialog.toRecipients = [clubInfoData[e.source.buttonid].email];
				//var f = Ti.Filesystem.getFile('cricket.wav');
				//emailDialog.addAttachment(f);
				emailDialog.open();
				
	    		tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].email,
					value: 1
				});
			}); 
	
		    iconsView.add(emailButton);
	    	
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webButton = Ti.UI.createButton({
		    	backgroundImage:"web.png",
				width:setting.clubsIconsWidth(),
				height:setting.clubsIconsHeight(),
				//top: currentTop,
		  		left: currentLeft,
				buttonid: i,
			});
			currentLeft = currentLeft + setting.clubsIconsWidth() + setting.clubsIconsSpacing();
		   
		    
		    webButton.addEventListener('click', function(e) {
				new WebView (clubInfoData[e.source.buttonid].web);
				
				tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].web,
					autoLink: Titanium.UI.AUTOLINK_URLS,
					value: 1
				});
			}); 
			iconsView.add(webButton);
	
	    }
	   rows.add(iconsView);
	   rowCounter++;
	   content.setData(rows.getRows());
	   row.add(content);
	   data.push(row);
	    
	};
	
	data = tableStyling.addEmptyZebraStripRows(i, data, setting.clubsTableRowHeight());
	
	table.setData(data);
	self.add(table);
	
	return self;
	
}




module.exports = ClubsWindow;