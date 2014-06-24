var Feed = require('ui/common/Feed');
var Feeds = new Feed();
/*
 * Get content from the feed
 */

function GetFeed (feed){
	var data = [];
	xmlDoc=loadXMLDoc(feed);

	
	var items = xmlDoc.getElementsByTagName("item");
	
	var item = items.item(i);
	
	
	if (feed == Feeds.articleOfTheWeekFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					url:  getRssText(item, 'link'),
					image: getRssText(item, 'image'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
					
					});
			}
	else if (feed == Feeds.todayDateFeed()){
				data.push({
					date:  getRssText(item, 'date')
					
					});
			}
	else if (feed == Feeds.passwordFeed()){
		data.push({
			pass: getRssText (item, 'pass'),
			pass2: getRssText (item, 'pass2')
		});
				
	}
	
	else{
		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			
		
			if (feed == Feeds.gameWatchFeed()){
				data.push({
					state:  getRssText(item, 'state'),
					club:  getRssText(item, 'club'),
					place: getRssText(item, 'place'),
					phone: getRssText(item, 'phone'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
			else if (feed == Feeds.nationalDiscountFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					link:  getRssText(item, 'link'),
					description: getRssText(item, 'description')
					});
			}
			else if (feed == "http://www.iowalum.com/mobile-app/events_category_feed.cfm"){
				data.push({
					category:getRssText(item, 'category')
					});
			}
			else if (feed == Feeds.mobileAlertsFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					header:  getRssText(item, 'header'),
					url:  getRssText(item, 'link'),
					image: getRssText(item, 'image'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
					
					});
			}
			
			else if (feed == Feeds.staticaAdFeed()){
				data.push({
					ad:   getRssText(item, 'ad'),
					adUrl:  getRssText(item, 'adUrl')
					});
		}
			
			else if (feed == Feeds.mobileAlertsFeed()){
				data.push({
					title:  getRssText(item, 'title'),
                    header:  getRssText(item, 'header'),
                    url:  getRssText(item, 'link'),
                    image: getRssText(item, 'image'),
                    description: getRssText(item, 'description'),
                    pubDate: getRssText(item, 'pubDate'),
				});
			}
			
			else if (feed == Feeds.todayEventsFeed()){
                data.push({
                    snl: getRssText(item, 'snl'),
                    place: getRssText(item, 'place'),
                    title: getRssText(item, 'title'),
                    allDay: getRssText(item, 'allDay'),
                    url: getRssText(item, 'link'),
                    description: getRssText(item, 'description'),
                    pubDate: getRssText(item, 'pubDate'),
                    startDate: getRssText(item, 'startDate'),
                    endDate: getRssText(item, 'endDate')                         
            	});
            }
             
            else if (feed == Feeds.eventsFeed() || feed == Feeds.eventsSportsCategoryFeed() || feed == Feeds.eventsUIAACategoryFeed() || 
            			feed == Feeds.eventsClubsCategoryFeed() || feed == Feeds.eventsStudentCategoryFeed()){
             	var timeZone = getRssText(item, 'timeZone');
             	var tz = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
            	var startDate = convertUTCDateToLocalDate(new Date(getRssText(item, 'startDate')), timeZone);
				var startTime = formatDate(startDate);
				var endDate = convertUTCDateToLocalDate(new Date(getRssText(item, 'endDate')), timeZone);
				var endTime = formatDate(endDate);
				var snl = startTime + (endTime != startTime ? " - " + endTime : '') + " (" + tz + ")";
				if(isNaN(startDate.getHours()) || (getRssText(item, 'useTimeInputField') == 1) || (getRssText(item, 'allDay') == 1)){
					 snl = getRssText(item, 'snl');
				}
                  data.push({
                    snl: snl,
                    useTimeInputField: getRssText(item, 'useTimeInputField'),
                    place: getRssText(item, 'place'),
                    title: getRssText(item, 'title'),
                    allDay: getRssText(item, 'allDay'),
                    link: getRssText(item, 'link'),
                    hlink: getRssText(item, 'hlink'),
                    description: getRssText(item, 'description'),
                    pubDate: getRssText(item, 'pubDate'),
                    startDate: getRssText(item, 'startDate'),
                    endDate: getRssText(item, 'endDate'),
                    timeZone: timeZone,
                    category:getRssText(item, 'category')                          
            	});
                                        
           }
			
			else if (feed == Feeds.clubsFeed()){
				data.push({
					state:  getRssText(item, 'state'),
					leader:  getRssText(item, 'leader'),
					city: getRssText(item, 'city'),
					web: getRssText(item, 'web'),
					email: getRssText(item, 'email'),
					phone: getRssText(item, 'phone')
					});
			}
			
			else if (feed == Feeds.adFeed()){
				data.push({
					ad: getRssText(item, 'ad'),
					link: getRssText(item, 'link'),
				});
				
			}
			
			else if (feed == Feeds.sliderImagesFeed()){
				data.push({
					url: getRssText(item, 'url')
				});
				
			}
			
			
			else {
				data.push({
					company:  getRssText(item, 'company'),
					discount: getRssText(item, 'discount'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
		}
	}
	return data;
}

var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : Feeds.magazineFeed();


var getRssText = function(item, key) {
	return osname === 'mobileweb' ?
			item.getElementsByTagName(key).item(0).textContent : 
			item.getElementsByTagName(key).item(0).text;
};

function loadXMLDoc(dname){
	var xmlhttp = Titanium.Network.createHTTPClient();
	xmlhttp.open("GET",dname,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}

function convertUTCDateToLocalDate(date, timeZone) {
    var timeZoneOffset = 5;
    var utc, newDate;
    var date1 = new Date();
    if(timeZone != "" && timeZone != undefined){
    	var tz = timeZone.toString();
    	if(tz == 'PST' || tz == 'AKDT'){
    		timeZoneOffset = 8;
    	}
    	else if(tz == 'PDT' || tz == 'MST'){
    		timeZoneOffset = 7;
    	}
    	else if(tz == 'CST'){
    		timeZoneOffset = 6;
    	}
    	else if(tz == 'EDT'){
    		timeZoneOffset = 4;
    	}
    	else if(tz == 'EST'){
    		timeZoneOffset = 5;
    	}
    	else if(tz == 'AKST' || tz == 'HADT'){
    		timeZoneOffset = 9;
    	}
    	else if(tz == 'HAST'){
    		timeZoneOffset = 10;
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

module.exports = GetFeed;