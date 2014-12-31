var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
var EK = require("ti.eventkit");
Titanium.event = require('ti.eventkit');
var IOSSetting = require('ui/common/IOSSetting');
var TableRows = require('ui/common/TableRows');
var setting = new IOSSetting();
/*
 * Return a Single Post Area for Events Window
 * that contains Tilte, Time, and Place
 */

function SingleRow(post, tracker, title) {
	var	textWidth = 230;
	var rows = new TableRows();
    var table = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'ffffff',
		height:				0,
		width: 				setting.defualtContentWidth(),
		left: 				setting.defualtLeft(),
		top:				setting.defualtTop(),
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});

	 

	 table.addEventListener('click', function(e) {
			new WebView (post.url);
			Ti.API.info(post.url);
			tracker.trackEvent({
				category: "Events",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.url,
				value: 1
			});
			
	 });

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: 0,
		padding: 0,
		top: 0,
		bottom: 0,
		link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var addEventButton = Ti.UI.createButton({
		width:setting.addEventButtonWidth(),
		height:setting.addEventButtonHeight(),
		backgroundImage: 'calendar_add.png',
		bottom: setting.defualtBottom(),
  		right: setting.defualtRight(),
  		zIndex: 5,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	
	
	//Ti.API.info(post.startDate);
	
	addEventButton.addEventListener('click', function(e){
		if(Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
    		performCalendarWriteFunctions(post);  		
		}
		else {
    		Ti.Calendar.requestEventsAuthorization(function(e){
            if (e.success) {
                performCalendarWriteFunctions(post);
            } else {
                alert('Access to calendar is not allowed');
            }
        });
       }
	});



	var titlelbl = getTitleLabel(post.title);
	rows.add(titlelbl);
	
	var timeArea = Ti.UI.createImageView({left: 0, width: setting.defualtContentWidth()});
	var timebl  = timeLabel();
	timeArea.add(timebl);

	var inputtimebl  = getTime(post.snl, textWidth);
	timeArea.add(inputtimebl);
	rows.add(timeArea);

	var placeArea = Ti.UI.createImageView({left: 0, width: setting.defualtContentWidth()});
	var inputplacebl  = getPlace(post.place, textWidth);
	placeArea.add(inputplacebl);

	var placebl  = placeLabel();
	placeArea.add(placebl);
	rows.add(placeArea);
	
	if (post.startDate != 'NA' && post.endDate != 'NA') {
		rows.add(addEventButton);
		textWidth = 190;
	}
	else{
		addEventButton.height = 0;
	}

	table.height = titlelbl.height + timebl.height + placebl.height + addEventButton.height+ setting.defualtTop();
	row.height = table.height + setting.defualtTop();
		
	table.setData(rows.getRows());
	row.add(table);
	return row;
}

/*
 * Helper Functions
 */


function getTitleLabel(title) {
	// Temp label to get height
	// At this font-size/font-face the height per line is 32

	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: setting.postTitleWidth(),
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:setting.postTitleFontSize(),fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: setting.postTitleWidth(),
		height:'auto'
	});
	view.add(temp);



	var label = Ti.UI.createLabel({
		text: title,
		left: setting.defualtLeft(),
		top: setting.defualtTop(),
		height: view.toImage().height,
		textAlign:'left',
		width: setting.defualtPostContentWidth(),
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	});

	return label;
}

function performCalendarWriteFunctions(post){
    var dlg = Titanium.UI.createAlertDialog({
     	title: post.title,
	    message:'Do you want to save this event to your calendar?', 
	    buttonNames: ['Yes','No']
	});
	dlg.addEventListener('click', function(ev) {
	    if (ev.index == 0) { // clicked "Yes"
	    	var defCalendar = Ti.Calendar.defaultCalendar;
		   	var date1 = new Date(post.startDate),
        	date2 = new Date(post.endDate);
		    Ti.API.info('Date1 : '+ date1 + 'Date2 : '+ date2);
		    Ti.API.info(post.allDay);
		    var event1;
		    
		    if (post.allDay == 1){
		    	 event1 = defCalendar.createEvent({
		                        title: post.title,
		                        notes: post.description,
		                        location: post.place,
		                        begin: date1,
		                        end: date2,
		                        availability: Ti.Calendar.AVAILABILITY_FREE,
		                        allDay: true,
		     	});
		    }
		    else{
		    	event1 = defCalendar.createEvent({
		                        title: post.title,
		                        notes: post.description,
		                        location: post.place,
		                        begin: date1,
		                        end: date2,
		                        availability: Ti.Calendar.AVAILABILITY_FREE,
		                        allDay: false,
		     	});
		    }
		   
	      	event1.save(Ti.Calendar.SPAN_THISEVENT);
	    } 
	    else if (ev.index == 1) { // clicked "No"
	      // do nothing
	    }
	});
	dlg.show();
}

function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,
		left: setting.defualtLeft(),
		top: setting.defualtTop(),
		textAlign:'left',
		width: setting.eventLabelWidth(),
		height: setting.eventLineHeight(),
		color:'#5c4e1a',
		shadowColor:'#f0d87f',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});

	return text;

}

function timeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: setting.defualtLeft(),
		top: 0,
		textAlign:'left',
		width: setting.eventLabelWidth(),
		height: setting.eventLineHeight(),
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getTime (snl, textWidth){

	var text = Ti.UI.createLabel({
		text: (new EditText (snl)).adjustedText(),
		left: setting.eventInputLeft(),
		top: 0,
		textAlign:'left',
		width: setting.eventLabelWidth(),
		height: setting.eventLineHeight(),
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});

	return text;
}

function getPlace (place, textWidth){

	var text = Ti.UI.createLabel({

		text: (new EditText (place)).adjustedText(),
		left: setting.eventInputLeft(),
		top:0,
		height: setting.eventLineHeight(),
		textAlign:'left',
		width: setting.eventLabelWidth(),
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize: setting.postDescriptionFontSize(),fontWeight:'bold'}
	});

	return text;
}


function placeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Place: ',
		left: setting.defualtLeft(),
		top: 0,
		textAlign:'left',
		width: setting.eventLabelWidth(),
		height: setting.eventLineHeight(),
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}


module.exports = SingleRow;