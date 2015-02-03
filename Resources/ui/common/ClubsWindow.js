var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var TableRows = require('ui/common/TableRows');
var IOSSetting = require('ui/common/IOSSetting');
var setting = new IOSSetting();

/*
 * Clubs View
 */

function ClubsWindow(clubData, clubInfoData,  tracker, top){
	var scrollBoxHeight = 60;
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

		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        index: i,
		        bottom: 10
		    });
		}
		else{
			 var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
		
		var content = Ti.UI.createTableView({
			separatorColor: 	'transparent',
			backgroundColor: 	'transparent',
			height:				'auto',
			scrollable: false,
			width: 				setting.platformWidth(),
		});
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
	data = addRows(i, data, true);
	
	table.setData(data);
	self.add(table);
	
	return self;
	
}

//Helper Functions
function addRows(i, data, flag){
	var width = setting.platformHeight();
	while (width > 0) {
		if (i % 2 == 1){
			var row = Ti.UI.createTableViewRow({
			    height: setting.clubsTableRowHeight(),
			    selectionStyle: 'none',
			    backgroundColor:'#cccccc',
			});
			data.push(row);
			
		}
		else{
			var row = Ti.UI.createTableViewRow({
			    height: setting.clubsTableRowHeight(),
			    selectionStyle: 'none',
			});
			data.push(row);
		}
		i++;
		width = width - setting.clubsTableRowHeight();
	}
	/*
	if (i == 1 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
	}
	else if (i == 1 && flag == false){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 2 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 3 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		     backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	*/
	return data;
}


module.exports = ClubsWindow;