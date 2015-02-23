var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var Description = require('ui/common/Description');

/*
 * Post Object
 * Essential attributes
 */

function FeatureRow(post, tracker, title) {

	this.containerheight = 0;

    var row = Ti.UI.createTableViewRow({
		hasChild:true,
		link: post.url,
		height: setting.feedFeatureRowHeight(),
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			setting.feedFeatureContainerHeight(),
			width: setting.defualtContentWidth(),
			top: setting.defualtTop(),
			left: setting.defualtLeft(),
			bottom:			0,
			padding:		0,
			borderRadius:	5
	});

	this.containerheight = getContainerHeight(post.image);
	container.height 	 = this.containerheight + setting.feedFeatureContainerAdditionalSpace();
	row.height 			 = this.containerheight + setting.feedFeatureContainerAdditionalSpace() + setting.defualtBottom();

	var imagebox = Ti.UI.createImageView({
		image: post.image,
		width: setting.defualtContentWidth(),
		height: this.containerheight,
		hires: true,
		top: setting.feedFeatureImageboxTop()
	});
	//new CachedImageView('imageDirectoryName', post.image, imagebox);
	var overlay = Ti.UI.createImageView({
		width: setting.defualtContentWidth(),
		height: setting.feedFeatureOverlayHeight(),
		hires: true,
		top: 1,
		image: 'gold.png'
	});
	var shadow = Ti.UI.createImageView({
		width: setting.defualtContentWidth(),
		height: setting.feedFeatureShadowHeight(),
		hires: true,
		top: this.containerheight-setting.feedFeatureShadowTopDiff(),
		image: 'shadow.png'
	});
	container.add(imagebox);
	container.add(shadow);
	container.add(overlay);
	
	titlelbl = getTitleLabel(post.title,this.containerheight+setting.feedFeatureContainerAdditionalTextSpace());
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(post.description,this.containerheight+setting.feedFeatureContainerAdditionalTextSpace());
	container.add(desclbl);


	var posted = Ti.UI.createLabel({
		text: 'Posted ' + (new DateObject(post.pubDate)).prettyDate() + ' in Kudos to Iowa People',
		top: 8,
		left: 10,
		bottom: 10,
		height: 15,
		textAlign:'left',
		width: setting.defualtContentWidth(),
		color:'#5c4e1a',
		shadowColor:'#f0d87f',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:setting.postDescriptionFontSize(),fontWeight:'bold'}
	});
	container.add(posted);

	row.add(container);
	
	row.addEventListener('click', function(e) {
		new WebView (post.url);
		tracker.trackEvent({
				category: "Featured Articles",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.url,
				value: 1
			});
	});
					
	
	return row;

}



function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
	});
    new CachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( setting.feedFeatureContainerHeight() * ratio );
}

function getTitleLabel(title,postheight) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: setting.postTitleWidth(),
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.featureRowHeaderFontSize(),fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: setting.postTitleWidth(),
		height:'auto'
	});
	view.add(temp);
	theheight = view.toImage().height;
	
	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: setting.defualtLeft(),
		bottom:setting.defualtBottom(),
		height:theheight,
		textAlign:'left',
		width: setting.postTitleWidth(),
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.featureRowHeaderFontSize(),fontWeight:'bold'}
	});
	
	titlelbl.top = postheight - theheight - 5;
	
	return titlelbl;

}

function getDescriptionLabel(description,postheight) {

	var view = Ti.UI.createView({
		backgroundColor: '#0c0c0c',
		backgroundImage: 'dark.jpg',
		width: setting.defualtContentWidth(),
		height: setting.defualtPostContentWidth(),
		top: postheight
	});

	var text = Ti.UI.createLabel({
		text: (new Description(description)).getDescription(),
		left: setting.defualtLeft(),
		top: 0,
		bottom: setting.defualtBottom(),
		height: setting.feedFeatureDecriptionHeight(),
		textAlign:'left',
		width: setting.defualtPostContentWidth(),
		color:'#ffffff',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:setting.sectionTextFontSize(),fontWeight:'bold'}
	});
	view.add(text);

	return view;

}


 
module.exports = FeatureRow;
