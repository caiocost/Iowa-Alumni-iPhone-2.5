function TableRows (){
	var rows = [];
	
	TableRows.prototype.add = function(object){
		var row = Ti.UI.createTableViewRow({});//selectionStyle: 'none'
		row.add(object);
		rows.push(row);
	};
	
	TableRows.prototype.addWithSelectionStyle = function(object){
		var row = Ti.UI.createTableViewRow();
		row.add(object);
		rows.push(row);
	};
	
	TableRows.prototype.getRows = function(){
		return rows;	
	};
	
}
module.exports = TableRows;