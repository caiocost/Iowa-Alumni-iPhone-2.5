var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var TableRows = require('ui/common/TableRows');
var TableStyling = require('ui/common/TableStyling');
var Description = require('ui/common/Description');
/*
 * Post Object
 * Essential attributes
 */

function Row(post, tracker, title) {

    this.postheight		= 0;
	var rows = new TableRows();
    var row = Ti.UI.createTableViewRow({
		hasChild: 			true,
		link: 				post.url,
		height: 			'auto',
		padding: 			0,
		top: 				0,
		bottom: 			0,
		layout: 			'vertical',
		backgroundColor: 	'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'ffffff',
		height:				0,
		width: 				setting.defualtContentWidth(),
		left: 				0,
		top:				0,
		bottom:				0,
		scrollable: false,
		padding:			0
	});
	

	var container =  Titanium.UI.createView({
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				setting.defualtContentWidth(),
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0,
	});



	titlelbl = getTitleLabel(post.title);
	rows.add(titlelbl);
	
	
	var descArea = Ti.UI.createImageView({left: 0, width: setting.defualtContentWidth()});
	desclbl  = getDescriptionLabel(post.description);
	descArea.add(desclbl);
	//desclbl.top = titlelbl.height + 15;

	var posted = Ti.UI.createLabel({
		text: 			(new DateObject(post.pubDate)).prettyDate(),
		left: 			setting.defualtLeft(),
		bottom: 		setting.defualtBottom(),
		height: 		setting.postDateHeight(),
		textAlign: 		'left',
		width: 			setting.defualtPostContentWidth(),
		color: 			'#616161',
		shadowColor: 	'#ffffff',
        shadowOpacity: 	0.5,
        shadowOffset: 	{x:0, y:1},
		font: 			{fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	//posted.top = titlelbl.height + desclbl.height + 20; // <-- posted.top = titlelbl.height + timelbl.height + desclbl.height + 20;
	

	var imageContainer = Ti.UI.createView({
		width: 			setting.postImageWidth(),
		height: 		setting.postImageHeight(),
		right: 			setting.defualtRight(),
		borderRadius:	4,
		borderColor: 	'#d5d5d5',
		borderWidth: 	1

	});
	var imagebox = Ti.UI.createImageView({
		image: post.image,
		defaultImage:  "loader120x120.png",
		hires: true,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		top: 0
	});
	//var postImage = getPostImage(post.image);
	//new CachedImageView('imageDirectoryName', post.image, postImage);
	imageContainer.add(imagebox);
	descArea.add(imageContainer);
	rows.add(descArea);
	rows.add(posted);
	//container.height = titlelbl.height + desclbl.height + posted.height + 35;//<--- container.height = titlelbl.height + timelbl.height + desclbl.height + posted.height + 35;
	//row.height = container.height;



	//row.add(container);
	
	row.addEventListener('click', function(e) {
		new WebView (e.row.link);
		tracker.trackEvent({
				category: "Articles",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + e.row.link,
				value: 1
			});
	});
	
	table.height =  titlelbl.height + desclbl.height + posted.height +( 3 *setting.defualtLeft()) ;
	row.height = table.height;
		
	table.setData(rows.getRows());
	row.add(table);
	
	return row;
}

/*
 * Helper Functions
 */

function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    //new CachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( setting.defualtContentWidth() * ratio );
}

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
		width:  setting.defualtPostContentWidth(),
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	});
	
	return label;

}


function getDescriptionLabel(description) {

	var text = Ti.UI.createLabel({
		text: (new Description(description)).getDescription(),
		left: setting.defualtLeft(),
		bottom: setting.defualtBottom(),
		top: 0,
		height: setting.postDescriptionHeight(),
		textAlign:'left',
		width: setting.postWithImageWidth(),
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    //new CachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(setting.postImageWidth() * ratio);

	var imagebox = Ti.UI.createImageView({
		image: image,
		hires: true,
		width: adjustedWidth,
		top: 0
	});

	return imagebox;
}


 
module.exports = Row;
