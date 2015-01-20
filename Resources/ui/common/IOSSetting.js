function IOSSetting(){
	var osname = Ti.Platform.osname;
	var iphone = "iphone";
	
	/* Helper Funtions */
	IOSSetting.prototype.ratioCalculation = function(iphoneSettingInput, ratio){
		var iphoneSetting = iphoneSettingInput;
 		if(osname == iphone){
 			return iphoneSetting;	
 		}
 		else {
 			return iphoneSetting * ratio;
 		}
		
	};
	
	IOSSetting.prototype.basicCalculation = function(iphoneSettingInput, ipadSettingInput){
 		if(osname == iphone){
 			return iphoneSettingInput;	
 		}
 		else {
 			return ipadSettingInput;
 		}
		
	};
	
	/* Base IOS Design */
	IOSSetting.prototype.defualtTop = function(){
		return this.ratioCalculation(10,3);
	};
	
	IOSSetting.prototype.defualtBottom = function(){
		return this.ratioCalculation(10,3);
	};
	
	IOSSetting.prototype.defualtLeft = function(){
		return this.ratioCalculation(10,3);
	};
	
	IOSSetting.prototype.defualtRight = function(){
		return this.ratioCalculation(10,3);
	};
	
	IOSSetting.prototype.sectionHeaderFontSize = function(){
		return this.ratioCalculation(20,1.5);
	};
	
	IOSSetting.prototype.sectionTextFontSize = function(){
		return this.ratioCalculation(14,1.5);
	};
	
	IOSSetting.prototype.defualtContentWidth = function(){
		return Ti.Platform.displayCaps.platformWidth - (2 * this.defualtTop());
	};
	
	IOSSetting.prototype.platformWidth = function(){
		return Ti.Platform.displayCaps.platformWidth;
	};
	
	IOSSetting.prototype.platformHeight = function(){
		return Ti.Platform.displayCaps.platformHeight;
	};
	
	/* Static Ad Design */
	
	IOSSetting.prototype.staticAdHeight = function(){
		return this.ratioCalculation(70,1.5);
	};
	
	/* Post Design */
	
	IOSSetting.prototype.postImageHeight = function(){
		return this.ratioCalculation(60,1.5);
	};
	
	IOSSetting.prototype.postImageWidth = function(){
		return this.ratioCalculation(60,1.5);
	};
	
	IOSSetting.prototype.postWithImageWidth = function(){
		return this.ratioCalculation(280,2);
	};
	
	IOSSetting.prototype.postWithNoImageWidth = function(){
		return this.ratioCalculation(200,2.5);
	};
	
	IOSSetting.prototype.postDescriptionHeight = function(){
		return this.ratioCalculation(70,2);
	};
	
	IOSSetting.prototype.postDescriptionFontSize = function(){
		return this.ratioCalculation(12,1.5);
	};
	
	IOSSetting.prototype.postTitleFontSize = function(){
		return this.ratioCalculation(16,1.5);
	};
	
	IOSSetting.prototype.postDateHeight = function(){
		return this.ratioCalculation(15,2);
	};
	
	IOSSetting.prototype.defualtPostContentWidth = function(){
		return this.defualtContentWidth() - (2 * this.defualtTop());
	};
	
	IOSSetting.prototype.postTitleWidth = function(){
		return this.ratioCalculation(250,2);
	};
	
	/* Event Design */
	
	IOSSetting.prototype.eventInputLeft = function(){
		return this.ratioCalculation(50,2);
	};
	
	IOSSetting.prototype.eventLabelWidth = function(){
		return this.ratioCalculation(200,2);
	};
	
	IOSSetting.prototype.addEventButtonWidth = function(){
		return this.ratioCalculation(40,1.5);
	};
	
	IOSSetting.prototype.addEventButtonHeight = function(){
		return this.ratioCalculation(40,1.5);
	};
	
	IOSSetting.prototype.eventLineHeight = function(){
		return this.ratioCalculation(20,1.5);
	};
	
	/* Iowa Insider Blog's Intro Row */
	
	IOSSetting.prototype.iowaInsiderBlogIntroRowHeight = function(){
		return this.ratioCalculation(50,1.5);
	};
	
	/*Iowa Magazine's Intro Row */
	
	IOSSetting.prototype.iowaMagazineIntroRowHeight = function(){
		return this.ratioCalculation(80,1.5);
	};
	
	IOSSetting.prototype.iowaMagazineIntroRowImageLeft = function(){
		return this.ratioCalculation(200,2);
	};
	
	IOSSetting.prototype.iowaMagazineIntroRowImageWidth = function(){
		return this.ratioCalculation(80,1.5);
	};
	
	IOSSetting.prototype.iowaMagazineIntroRowImageHeight = function(){
		return this.ratioCalculation(55,1.5);
	};
	
	IOSSetting.prototype.iowaMagazineIntroRowTextWidth = function(){
		return this.defualtContentWidth() - (this.iowaMagazineIntroRowHeight() +this.defualtLeft());
	};
	
	/* Member Card*/
	IOSSetting.prototype.memberCardPasswordTextFieldWidth = function(){
		return this.ratioCalculation(140,1.5);
	};
	
	IOSSetting.prototype.memberCardPasswordTextFieldHeight = function(){
		return this.ratioCalculation(30,1.5);
	};
	IOSSetting.prototype.memberCardLoginButtonWidth = function(){
		return this.ratioCalculation(50,1.5);
	};
	
	IOSSetting.prototype.memberCardLoginButtonHeight = function(){
		return this.ratioCalculation(25,1.5);
	};
	
	IOSSetting.prototype.memberCardThawkWidth = function(){
		return this.ratioCalculation(200,1.5);
	};
	
	IOSSetting.prototype.memberCardThawkHeight = function(){
		return this.ratioCalculation(127,1.5);
	};
	
	IOSSetting.prototype.memberCardImageWidth = function(){
		return this.ratioCalculation(320,1.5);
	};
	
	IOSSetting.prototype.memberCardImageHeight = function(){
		return this.ratioCalculation(420,1.5);
	};
	
	/*
	 * State List
	 */
	IOSSetting.prototype.stateListRowHeight = function(){
		return this.ratioCalculation(50,1.5);
	};
	
	/*
	 * Event Header banner
	 */
	IOSSetting.prototype.headerRowHeight = function(){
		return this.ratioCalculation(50,2);
	};
	
	IOSSetting.prototype.headerDateLabelHeight = function(){
		return this.ratioCalculation(25,2);
	};
	
	/*
	 * National Benefits banner
	 */
	IOSSetting.prototype.nationalBenefitsHeaderHeight = function(){
		return this.ratioCalculation(90,2);
	};
	
	IOSSetting.prototype.nationalBenefitsHeaderWidth = function(){
		return Ti.Platform.displayCaps.platformWidth - 4;
	};
	
	IOSSetting.prototype.nationalBenefitsHoverTableTop = function(){
		return this.nationalBenefitsHeaderHeight() * 0.75;
	};
	
	IOSSetting.prototype.nationalBenefitsLinkTop = function(){
		return this.ratioCalculation(50,2);
	};
	
	/*
	 * Home Image Slider
	 * 
	 */
	
	IOSSetting.prototype.homeImageSliderContainerHeight = function(){
		return this.ratioCalculation(250,1.5);
	};
	
	IOSSetting.prototype.homeImageSliderImageBoxHeight = function(){
		return this.ratioCalculation(250,1.5);
	};
	
	IOSSetting.prototype.homeImageSliderImageBoxTop = function(){
		return this.ratioCalculation(30,1.5);
	};
}

module.exports = IOSSetting;