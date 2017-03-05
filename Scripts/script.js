$(document).ready(function() {
	var tableFormat  = "| Name   |      Age      |  Gender |\n" +
						   "|----------|:-------------:|------:|\n" +
						   "| Rahul |  26 | male |\n" +
						   "| sachin |    28   |   male |\n" +
						   "| Parashv | 1 |    tato |";
						   						   					   
	$('#addRow').click(function() {		
		 AddRow();
	});
});

	function AddRow()
	{
		var inputTable = $('#TableTxtArea').val();
		if(inputTable==="" )
		{
			dataTable=[];
		}
		else 
		{
			dataTable = ConvertTableStringToDataArray(inputTable);
		}
		
		var name = $('#NameTxt').val();
		var gender = $('#GenderTxt').val();
		var age = $('#AgeTxt').val();
		
		var dataRow = [name , gender , age];
		dataTable.push(dataRow);
		
		var stringTable = ConvertTableDatatoTableString(dataTable);
		$('#TableTxtArea').val(stringTable);	
		return dataTable;
	}

	function CheckMarkDownTable()
	{
		return true;
	}
	
	//Method to validate whetehr the input data is valid or not.
	function checkInputData() 
	{
		//
		return true;
	}
	
	//Method to convert the table data to string format to represent the data in markdown format.
	function ConvertTableDatatoTableString(dataArray)
	{
		var result = "";
		for(var row = 0; row < dataArray.length ; row++)
		{	
			for(var column =0 ; column < dataArray[row].length;column++)
			{
				result += "|" + dataArray[row][column];
			}
			result += "|";
			if(row != dataArray.length-1)
			{
				result += "\n";
			}
		}
		return result;
	}
	
	//method to convert the table string i.e. mark down table in Table data format.
	function ConvertTableStringToDataArray(tableString)
	{
		var tableRows = tableString.length > 0 ? tableString.split("\n") : [];
		var tableData = new Array( tableRows.length);
		for(var row = 0 ; row < tableRows.length;row++)
		{
			var tableRowData = tableRows[row].split("|");
			
			tableData[row] = new Array(tableRowData.length-2);
			for(column = 1; column < tableRowData.length-1;column++)
			{
				tableData[row][column-1] = tableRowData[column].trim();
			}
		}	
		return tableData;
	}
		