var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
var ClubsWindow = require('ui/common/ClubsWindow');
var Map = require('ti.map');
var TableRows = require('ui/common/TableRows');
var TableStyling = require('ui/common/TableStyling');


/*
 * Clubs and Game Watch Tabs 
 */
function GameWatchWindow(clubData, clubInfoData, tracker, top) {
	var scrollBoxHeight = 60;
	var tableStyling= new TableStyling();
	var mapWin = Ti.UI.createView({
	    top: top,
	    backgroundColor:'#ffffff',
		bottom: scrollBoxHeight,
	});

	
	var gameWatchInfo = [];
	for (var i = 0; i <= clubData.length - 1; i++) {
		gameWatchInfo.push(
			Map.createAnnotation(
			{
			    latitude:  clubData[i].latitude,
			    longitude: clubData[i].longitude,
			    title: clubData[i].place,
			    subtitle: clubData[i].street,
			    pincolor: Map.ANNOTATION_RED,
			    animate:true,
			})
		);
		}
		var curLatitude = clubData[0].latitude;
		var curLongitude = clubData[0].longitude;
		var map = Map.createView({
			mapType: Map.NORMAL_TYPE,
			region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: false,
			height: setting.gameWatchMapHeight(),
		    annotations: gameWatchInfo,
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
		
		var table = Ti.UI.createTableView({
		height: 'auto',
		top: setting.gameWatchMapHeight()
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= gameWatchInfo.length - 1; i++) {
		
	    var row = Ti.UI.createTableViewRow({
	    	club: clubData[i].club,
	    	latitude:  clubData[i].latitude,
			longitude: clubData[i].longitude,
	        height: 'auto',
	        bottom: 10
	    });
		(rowCounter % 2 == 0) ? row.backgroundColor = '#ffffff' : row.backgroundColor = '#cccccc';
		
		var content = tableStyling.blankTableView(setting.gameWatchTableRowHeight());
		
		var rows = new TableRows();
		
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        textAlign: 'left',
	        top: setting.defualtTop(),
	        left: setting.defualtLeft(),
	        font: {fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	    });
	    var placeLabel = Ti.UI.createLabel({
	        text: (clubData[i].place),
	        textAlign: 'left',
	        left: setting.defualtLeft(),
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: clubData[i].street,//new EditText(clubData[i].street).adjustedText(),
	        textAlign: 'left',
	        left: setting.defualtLeft(),
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	    });
	    rows.add(clubLabel);
	    rows.add(placeLabel);
	    rows.add(streetLabel);
	    if (clubData[i].phone != 'NA'){
	    	var phoneLabel = Ti.UI.createLabel({
	        	text: (clubData[i].phone),
		        textAlign: 'left',
		        left: setting.defualtLeft(),
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
		    });
			
		    rows.add(phoneLabel);
	    }
	    
	    content.setData(rows.getRows());
	    row.add(content);
	    data.push(row);
	    rowCounter++;
	};
		data = tableStyling.addEmptyZebraStripRows(i, data, setting.gameWatchTableRowHeight());
		table.setData(data);
		
		mapWin.add(map);
		mapWin.add(table);
		
		table.addEventListener('click', function(e){
			
			if (e.index < clubData.length){
				tracker.trackEvent({
							category: "Game Watches",
							action: "click",
							label: clubData[e.index].club,
							value: 1
				});
				
				 map.setLocation({
		    latitude: e.row.latitude, longitude: e.row.longitude, animate:true,
		    latitudeDelta:0.01, longitudeDelta:0.01});
		    
				curLatitude =  e.row.latitude;
				curLongitude =  e.row.longitude;
				map.selectAnnotation(gameWatchInfo[e.index]);
			}
			
		});
		
		return mapWin;
	}



module.exports = GameWatchWindow;