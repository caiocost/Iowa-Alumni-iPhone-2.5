var GetFeed = require('ui/common/GetFeed');
var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var TableRows = require('ui/common/TableRows');
var Description = require('ui/common/Description');
/*
 * Return a Single Post Area that contains
 * tilte, description, and picture(Not Required)
 */
function SinglePost (post, tracker, title){
	
	var rows = new TableRows();
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'transparent',
		backgroundColor: 	'ffffff',
		height:				0,
		width: 				setting.defualtContentWidth(),
		left: 				setting.defualtLeft(),
		top:				setting.defualtTop(),
		padding:			0,
		borderRadius:		5,  
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});
	
	

	 table.addEventListener('click', function(e) {
			new WebView ( post.url);
			
			tracker.trackEvent({
				category: "Articles",
				action: "click",
				label: "An Article in the " + title + "'s Window - " + post.url,
				value: 1
			});
			
	 });
	 
	
	

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: 0,
		padding: 0,
		top: 0,
		bottom: 0,
		//link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

		var titleLabel = getTitleLabel(post.title);
		rows.add(titleLabel);
		
		if (post.image != 'NA'){
			var imageContainer = Ti.UI.createView({
				width: 			setting.postImageWidth(),
				height: 		setting.postImageHeight(),
				right: 			setting.defualtRight(),
				top: 			setting.defualtTop(),
				borderRadius:	4,
				borderColor: 	'#d5d5d5',
				borderWidth: 	1
		
			});
			//var postImage = getPostImage(post.image);
			var imagebox = Ti.UI.createImageView({
				image: post.image,
				defaultImage:  "loader120x120.png",
				hires: true,
				width: Ti.UI.FILL,
				height: Ti.UI.FILL,
				top: 0
			});
			var descArea = Ti.UI.createImageView({left: 0, width: Ti.UI.FILL});
			imageContainer.add(imagebox);
			descArea.add(imageContainer);
			var desclbl = getDescriptionLabel(post.description, setting.postWithImageWidth());
			descArea.add(desclbl);
			rows.add(descArea);
		}
		
		else{
			var desclbl = getDescriptionLabel(post.description, setting.postWithImageWidth());
			rows.add(desclbl);
		}

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
		//rows.add(posted);

		
		table.height = titleLabel.height + desclbl.height + posted.height;
		row.height = table.height + setting.defualtTop();
		
		table.setData(rows.getRows());
		
		row.add(table);
		return row;
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
		width: setting.postTitleWidth(),
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:setting.postTitleFontSize(),fontWeight:'normal'}
	});
	
	return label;

}

function getDescriptionLabel(description, descWidth) {

	var text = Ti.UI.createLabel({
		text: (new Description(description)).getDescription(),
		left: setting.defualtLeft(),
		top: 0,
		height: setting.postDescriptionHeight(),
		textAlign:'left',
		width: descWidth,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	

	return text;

}
/*
function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		
	});
    new CachedImageView('imageDirectoryName', image, tempimagebox);
	
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
*/
module.exports = SinglePost;