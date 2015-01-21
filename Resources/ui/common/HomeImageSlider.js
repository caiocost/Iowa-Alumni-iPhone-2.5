var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var Feed = require('ui/common/Feed');
var IOSSetting = require('ui/common/IOSSetting');
var TableRows = require('ui/common/TableRows');
var setting = new IOSSetting();

function HomeImageSlider(){
	var Feeds = new Feed();
	var container =  Titanium.UI.createView({
			backgroundColor: 'transparent',
				height:			setting.featureRowContainerHeight(),
				width: setting.defualtContentWidth(),
				top: setting.defualtTop(),
				left: setting.defualtLeft(),
				bottom:			0,
				padding:		0,
				borderRadius:	5
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(container);
		
		
		var imageArray = new GetFeed (Feeds.sliderImagesFeed());
		var imagebox = Ti.UI.createImageView({
			image: imageArray[0].url,
			width: setting.defualtContentWidth(),
			height: setting.featureRowImageBoxHeight(),
			hires: true,
			top: setting.featureRowImageBoxTop()
		});
		
		
		 
		 var counter = 0;
		function imageSlider(n){
			 return imageArray[(n + 1) % imageArray.length].url;
		}
		setInterval(imageCounter,3000);
		
		function imageCounter (){
			imagebox.image = imageSlider(counter++);
			}
		
		var overlay = Ti.UI.createImageView({
			width: setting.defualtContentWidth(),
			height: setting.featureRowOverlayHeight(),
			hires: true,
			top: 1,
			image: 'gold.png'
		});
		var shadow = Ti.UI.createImageView({
			width: setting.defualtContentWidth(),
			height: setting.featureRowShadowHeight(),
			hires: true,
			bottom: setting.featureRowShadowBottom(),
			image: 'shadow.png'
		});
		
		var date = new Date();
		var currentDate = new GetFeed (Feeds.todayDateFeed())[0].date;
		var date = Ti.UI.createLabel({
			text: (new FormatDate()).getMonthString(date.getMonth()) +' '+date.getDate()+', '+date.getFullYear(),
			top: 8,
			left: setting.defualtLeft(),
			bottom: 10,
			height: 15,
			textAlign:'left',
			width: 270,
			color:'#5c4e1a',
			shadowColor:'#f0d87f',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		});
		overlay.add(date);
		
		var view = Ti.UI.createView({
			backgroundColor: '#0c0c0c',
			backgroundImage: 'dark.jpg',
			width: setting.defualtContentWidth(),
			height: setting.featureRowDarkImageHeight(),
			bottom: 0
		});
		var titlelbl = Ti.UI.createLabel({
			text: 'Welcome',
			left: setting.defualtLeft(),
			textAlign:'left',
			width: setting.defualtPostContentWidth(),
			color:'#efc006',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        top: 0,
			font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.featureRowHeaderFontSize(),fontWeight:'bold'}
		});
		
		
		
		
	
		
		var text = Ti.UI.createLabel({
			text: "The Official App of the University of Iowa Alumni Association",
			left: setting.defualtLeft(),
			textAlign:'left',
			width: setting.defualtPostContentWidth(),
			color:'#ffffff',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}
		});
		//imagebox.add(shadow);
		var welcomeTable = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'transparent',
		width: 				setting.defualtContentWidth(),
	});
		var rows = new TableRows();
		rows.add(titlelbl);
		rows.add(text);
		welcomeTable.setData(rows.getRows());
		view.add(welcomeTable);
		
		
		container.add(imagebox);
		container.add(overlay);
		container.add(shadow);
		container.add(view);
		
		return row;
} 
module.exports = HomeImageSlider;
