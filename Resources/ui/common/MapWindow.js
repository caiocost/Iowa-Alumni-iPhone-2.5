var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var NavigateWindow = require('ui/common/NavigateWindow');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var Map = require('ti.map');
var TableRows = require('ui/common/TableRows');
var TableStyling = require('ui/common/TableStyling');



function MapWindow(title, tracker) {
	tracker.trackScreen(title);
	var Feeds = new Feed();
	var tableStyling= new TableStyling();
	var mapWin = Ti.UI.createView({
	    
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});


	
	
	var businessesInfo =  new GetFeed (Feeds.iowaCityFeed());
	
	var companyInfo = [];
	var curLatitude = businessesInfo[0].latitude;
	var curLongitude = businessesInfo[0].longitude;
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		companyInfo.push(
			Map.createAnnotation(
			{
			    latitude:  businessesInfo[i].latitude,
			    longitude: businessesInfo[i].longitude,
			    title: businessesInfo[i].company,
			    subtitle: businessesInfo[i].street,
			    pincolor: Map.ANNOTATION_RED,
			    animate:true
			})
		);
	}
 	
	var map = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {latitude: companyInfo[0].latitude, longitude: companyInfo[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation:false,
		height: setting.iowaCityBenefitsMapHeight(),
	    annotations: companyInfo,
		top: 0
	});
	
	var routeButton = Ti.UI.createButton({
		title:'Get Route',
		width:80,
		height:30,
		backgroundColor:'#66CCFF',
		borderRadius:		5,
		borderWidth: 		1,
		//color: "#fff",
		bottom: 5,
  		left: 5,
		font: {fontFamily:'Helvetica',fontSize:14,fontWeight:'bold'}
		
	});
	map.add(routeButton);
	
	routeButton.addEventListener('click', function(e){
		
		
		if(Ti.Network.online){
	        Ti.Geolocation.purpose = "Receive User Location";
	        Titanium.Geolocation.getCurrentPosition(function(e){
	
	            if (!e.success || e.error)
	            {
	                alert('Could not find the device location');
	                return;
	            }
	            var longitude = parseFloat( e.coords.longitude, 10).toFixed(5);
	            var latitude =  parseFloat(e.coords.latitude, 10).toFixed(5);
	
	          
				var url = 'http://maps.google.com/maps?saddr=' +latitude+ ',' + longitude + '&daddr=' + curLatitude+','+curLongitude;
				new WebView (url);
				 //Titanium.Platform.openURL(url); 
				//alert("latitude: " + latitude + "longitude: " + longitude);
			
	        });
		    }
		   else{
		        alert("Internet connection is required to use localization features");
		   }/*
		   */
	});
	

	
	var textView = Ti.UI.createView({
		backgroundColor: 	'#e2e2e2',
		height:				setting.iowaCityBenefitsTextViewHeight(),
		top:				setting.iowaCityBenefitsMapHeight(),
		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('UI Alumni Association members have an array of  benefits available to them. Use your member benefit card at any of these locations.'),
			 textAlign: 'left',
			 width: setting.defualtPostContentWidth(),
			 top: setting.defualtTop(),
	        left: setting.defualtLeft(),
			font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'Benefits',
			 textAlign: 'left',
			 right: setting.defualtRight(),
			 bottom: setting.defualtBottom(),
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		new WebView ('http://iowalum.com/membership/benefits.cfm');
		tracker.trackEvent({
						category: "Benefits",
						action: "click",
						label: "Members Benefits' Website",
						value: 1
					});
	});
	textView.add(linkLabel);	

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: setting.iowaCityBenefitsTextViewHeight() + setting.iowaCityBenefitsMapHeight()
	});

	
	var data = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		
	    var row = Ti.UI.createTableViewRow({
	    	company: businessesInfo[i].company,
	    	latitude:  businessesInfo[i].latitude,
			longitude: businessesInfo[i].longitude,
	        height: 'auto',
	        bottom: 10,
	    });
	
		(i % 2 == 0) ? row.backgroundColor = '#ffffff' : row.backgroundColor = '#cccccc';
		var content = tableStyling.blankTableView(setting.iowaCityBenefitsTableRowHeight());
		var rows = new TableRows();
		
	    var companyLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].company),
	        //height: 20,
	        top: setting.defualtTop(),
	        left: setting.defualtLeft(),
	        font: {fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	    });
	    var discountLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].discount),
	        left: setting.defualtLeft(),
	        //top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	    });
	    rows.add(companyLabel);
	    rows.add(discountLabel);
	    content.setData(rows.getRows());
	    row.add(content);
	    data.push(row);
	};

	table.setData(data);
	
	mapWin.add(map);
	mapWin.add(textView);
	mapWin.add(table);
	
   
	
	

	table.addEventListener('click', function(e){
		
		/*
		map = Map.createView({
			mapType: Map.NORMAL_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: false,
			height: 200,
		    annotations: companyInfo,
			top: 0
		});
		
		mapWin.add(map);
		*/
		 map.setLocation({
    latitude: e.row.latitude, longitude: e.row.longitude, animate:true,
    latitudeDelta:0.01, longitudeDelta:0.01});
	map.selectAnnotation(companyInfo[e.index]);
		
		//Ti.API.info(e.index);
		
		tracker.trackEvent({
			category: "Benefits",
			action: "click",
			label: companyInfo[e.index].title,
			value: 1
		});
		//map.add(routeButton);
		
		curLatitude = e.row.latitude;
		curLongitude = e.row.longitude;
	
	});
	
	
        
	var self = new NavigateWindow("Iowa City Benefits", mapWin);
    
return self;


}



module.exports = MapWindow;