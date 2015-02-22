var WebView = require('ui/common/WebView');

/*
 * Return Iowa Insider Blog's Window Header
 */

function IIBIntroRow(post) {
var table = Ti.UI.createTableView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				'auto',
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

	 var rowText = Ti.UI.createTableViewRow({
	 	selectionStyle: 'none',
	        height: setting.iowaInsiderBlogIntroRowHeight(),
	    });
	    
	 
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height+setting.defualtBottom(),
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	
	

	introLabel  = getText();
	rowText.add(introLabel);

	
	
	

	return row;
}

/*
 * Helper Functions
 */



function getText (){

	var text = Ti.UI.createLabel({
		text: 'The official blog of the University of Iowa Alumni Association.',
		left: 	setting.defualtLeft(),
		top:	setting.defualtTop(),
		textAlign:'left',
		width: setting.defualtPostContentWidth(),
		//height: 20,
		color:'#000000',
		font: {fontFamily:'HelveticaNeueBold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	

	return text;

}


module.exports = IIBIntroRow;
