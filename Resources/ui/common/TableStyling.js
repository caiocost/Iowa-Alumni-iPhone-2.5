
function TableStyling(){
	TableStyling.prototype.addEmptyZebraStripRows = function (i, data, rowHeight){
		
		var height = setting.platformHeight();
		while (height > 0) {
			if (i % 2 == 1){
				var row = Ti.UI.createTableViewRow({
				    height: rowHeight,
				    selectionStyle: 'none',
				    backgroundColor:'#cccccc',
				});
				data.push(row);
				
			}
			else{
				var row = Ti.UI.createTableViewRow({
				    height: rowHeight,
				    selectionStyle: 'none',
				});
				data.push(row);
			}
			i++;
			height = height - rowHeight;
		}
		
		return data;
		
	};
	
	TableStyling.prototype.blankTableView = function (tableViewHeight){
		
		var blankTableView = Ti.UI.createTableView({
			separatorColor: 	'transparent',
			backgroundColor: 	'transparent',
			height:				tableViewHeight,
			scrollable: false,
			width: 				setting.platformWidth(),
		});
		
		return blankTableView;
		
	};
}

module.exports = TableStyling;