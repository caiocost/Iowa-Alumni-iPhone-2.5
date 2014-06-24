var	Description = require('ui/common/Description');
var CachedImageView = require('ui/common/CachedImageView');
/*
 * Post Object
 * Essential attributes
 */

function Post(item) {//<----
	var startDate = convertUTCDateToLocalDate(new Date(item.startDate), item.timeZone);
	var startTime = formatDate(startDate);
	var endDate = convertUTCDateToLocalDate(new Date(item.endDate), item.timeZone);
	var endTime = formatDate(endDate);
	var tz = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
	var snl = startTime + (endTime != startTime ? " - " + endTime : '') + " (" + tz + ")";
	if(isNaN(startDate.getHours()) || (item.useTimeInputField == 1) || (item.allDay == 1)){
		 snl = item.snl;
	}
    this.title = (new Description(item.title)).getDescription();
    this.snl = snl;
    this.place = item.place;
    this.description = (new Description(item.description)).getDescription();
    this.pubDate = item.pubDate;
    this.postDate = item.postDate;
    this.allDay = item.allDay;
    this.startDate = startDate;
    this.endDate = endDate;
    this.hlink = item.hlink;
    this.image = (new Description(item.description)).getImage();
    this.url = item.link;
    this.imageheight = (this.image!=null) ? getImageHeight(this.image) : null;
}

//edit.cfm?message=3869&page=1
//edit.cfm?message=3869
function getImageHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
	});
    new CachedImageView('imageDirectoryName', img, tempimagebox);
	var ratio = tempimagebox.toImage().height / tempimagebox.toImage().width;
	return Math.floor( 300 * ratio );
}

function convertUTCDateToLocalDate(date, timeZone) {
    var timeZoneOffset = 5;
    var utc, newDate;
    if(timeZone != "" && timeZone != undefined){
	    switch(timeZone.toString()) {
	    	case 'PST':
		        timeZoneOffset = 8;
		        break;
	    	case 'PDT':
		        timeZoneOffset = 7;
		        break;
		    case 'MST':
		        timeZoneOffset = 7;
		        break;
		    case 'CST':
		        timeZoneOffset = 6;
		        break;
		    case 'MDT':
		        timeZoneOffset = 6;
		        break;	    
		    case 'EDT':
		        timeZoneOffset = 4;
		        break;
		}
	}
    utc = new Date(date.getTime() + timeZoneOffset * 3600000);
    newDate = new Date(utc.getTime() - date.getTimezoneOffset() * 60000);
    return newDate;   
}

function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var replacement = h+":"+m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " "+dd;  
    return replacement;
}
 
module.exports = Post;