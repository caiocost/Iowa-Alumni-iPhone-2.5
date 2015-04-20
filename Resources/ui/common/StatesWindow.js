var GetFeed = require('ui/common/GetFeed');
var  ClubsandWatchesScrollWindow = require('ui/common/ClubsandWatchesScrollWindow');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var  GameWatchWindow = require('ui/common/GameWatchWindow');
var ClubsWindow = require('ui/common/ClubsWindow');
var TableRows = require('ui/common/TableRows');
/*
 * Root Window for Clubs and Gamewatches
 */

function StatesWindow(title, tracker){
	tracker.trackScreen(title);
	var Feeds = new Feed();
	var masterView = Ti.UI.createView();
	
	var rows = new TableRows();
	
	var mainTable = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'transparent',
		height:				'auto',
		width: 				setting.platformWidth(),
		left: 				0,
		top:				0,
		bottom:				0,
		scrollable:			false,
		padding:			0
	});


	var introLabel = Ti.UI.createLabel({
			 text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			 textAlign: 'left',
			 left: setting.defualtLeft(),
			 width: setting.defualtContentWidth(),
			 top: setting.defualtTop(),
			font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}

		});
	rows.add(introLabel);	
	
	var people = Ti.UI.createImageView({
	  image:    'clubsPeople.png',
	  left: setting.defualtLeft(),
	  width:  setting.defualtContentWidth(),
	});

	rows.add(people);
	

	var table = Ti.UI.createTableView({
		height: 'auto',
		left: 0,
		width: Ti.Platform.displayCaps.platformWidth,
		height: setting.stateListHeight()
	});
	
	var clubs = new GetFeed(Feeds.clubsFeed());
	var gameWatches = new GetFeed(Feeds.gameWatchFeed());
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubs.length - 1; i++) {
		if ((i == 0) || ((clubs[i - 1].state.toUpperCase() != clubs[i].state.toUpperCase()) && i != 0) ){ 
		if (rowCounter % 2 == 0){
			    var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			        height: setting.stateListRowHeight()
			    });
		  }
		  else{
		  		var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			    	backgroundColor:'#cccccc',
			        height: setting.stateListRowHeight()
			    });
		  }

		var label = Ti.UI.createLabel({
			 text: clubs[i].state.toUpperCase(),
			 textAlign: 'center',
			 font: {fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}

		});

		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    }
	};

	table.setData(data);
	rows.add(table);
	table.addEventListener('click', function(e){
		var stateClubs = getStateList(gameWatches, clubs, e.row.text);
		var view;
		try{
			view = new GameWatchWindow(stateClubs[0], stateClubs[1],  tracker, 0);
		}catch(err){
			Ti.API.error("error parsing game watch information");
			view = new ClubsWindow(stateClubs[0], stateClubs[1],  tracker, 0);
		}
		var win = new  ClubsandWatchesScrollWindow(stateClubs[0], stateClubs[1], tracker, view);
		win.open();

		tracker.trackEvent({
			category: title,
			action: "click",
			label: e.row.text,
			value: 1
		});
	});

	var ad = new StaticAd(11, tracker, title);
	masterView.add(ad);
	mainTable.setData(rows.getRows());
	masterView.add(mainTable);

	var self = new ApplicationWindow(title, masterView);
	return self;
}

function getStateList (gameWatches, clubsList, state){
	var data = [];
	var stateList = [];
	var stateInfoList = [];
	for (var i = 0; i <= gameWatches.length - 1; i++){
		if (gameWatches[i].state.toUpperCase() == state.toUpperCase()){
			stateList.push(gameWatches[i]);
		}
	} 
	data.push(stateList);
	
	for (var i = 0; i <= clubsList.length - 1; i++){
		if (clubsList[i].state.toUpperCase() == state.toUpperCase()){
			stateInfoList.push(clubsList[i]);
		}
	} 
	
	data.push(stateInfoList);
	return data;
}


module.exports = StatesWindow;