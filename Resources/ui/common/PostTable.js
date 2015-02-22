var FormatDate = require('ui/common/FormatDate');
/*
 *	Post Table constructor
 *		Creates table for each Row object
 */

function PostTable() {

	this.pulling = false;
	this.reloading = false;

	var self = Ti.UI.createTableView({
		separatorColor: 'transparent',
		backgroundColor: '#e2e2e2'
	});

	var tableHeader = Ti.UI.createView({
		backgroundColor:"#e2e2e2",
		width: setting.platformWidth(),
		height:setting.refreshPaneTableHeaderHeight()
	});

	var statusLabel = Ti.UI.createLabel({
		text:"Pull down to refresh...",
		//left:55,
		width:setting.refreshPaneViewWidth(),
		bottom:setting.refreshPaneStatusLabelBottom(),
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:setting.refreshPaneStatusLabelFontSize(),fontWeight:"bold"},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});

	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+ (new FormatDate()).getDate(),
		//left:55,
		width: setting.refreshPaneViewWidth(),
		bottom:setting.refreshPaneLastUpdatedLabelBottom(),
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:setting.refreshPaneLastUpdatedLabelFontSize()},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});

	var actInd = Titanium.UI.createActivityIndicator({
		left:setting.refreshPaneActivityIndicatorLeft(),
		bottom:setting.refreshPaneActivityIndicatorBottom(),
		width:setting.refreshPaneActivityIndicatorWidth(),
		height:setting.refreshPaneActivityIndicatorHeight()
	});

	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);

	self.headerPullView = tableHeader;

	self.updateLabelText = function(text) {
		statusLabel.text = text;
	};
	self.updateDateText = function(text) {
		lastUpdatedLabel.text = text;
	};

	self.hideActInd = function() {
		actInd.hide();
	};
	self.showActInd = function() {
		actInd.show();
	};

	return self;

}

module.exports = PostTable;



