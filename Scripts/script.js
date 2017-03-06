$(document).ready(function() {

	// To Generate the columns based on the input value eneterd
	$("#btnGenerateColumn").on('click', function() {
		var inputTable = $('#TableTxtArea').val()
		if(ValidateInputData(inputTable))
		{
			GenerateColumns(inputTable);	
		}
	});				
	
    // To add a new Row			
	$('#btnAddRow').click(function() {		
		 AddRow();
	});
	
	 //To add a new Column 
	  $('#btnAddColumn').click(function() { 
		 var columnValue =  $('#modalTxt').val();
		 if(columnValue != "")
		 {
			$('#inputControls').append('<label>' + columnValue + ':</label> <input type ="text" placeholder="' + columnValue + '" id="' +columnValue +'txt"></input></br></br>');
			$('#myModal').modal('toggle');
			UpdatedTable =  UpdateMarkDownTable($('#TableTxtArea').val());
			$('#TableTxtArea').val(UpdatedTable);		 
		 }
		 else 
		 {
			 alert('Please enter the column name.')
		 }
	 });
});

	//Method to validate whether the input table content is valid or not
	function ValidateInputData(inputTable) 
	{
		if(inputTable === "") 
		{
			alert('No markdrop script for table is entered.');
			return false;
		}	
		return true;
	}
	
	//Method to generate the columns based on input table
	function GenerateColumns(inputTable)
	{
		dataTable = ConvertTableStringToDataArray(inputTable);
		var index = GetHeadingIndex(dataTable);	
		$('#inputControls').empty();
		if(index ==-1)
		{
			alert('No Columns Name have been entered. default columns are being generated');
			for(var column = 0 ; column < dataTable[index+1].length; column++)
			{
				var columnValue = 'col' + column
				$('#inputControls').append('<label>' + columnValue + ':</label> <input type ="text" placeholder="' + columnValue + '" id="' +columnValue +'txt"></input></br></br>');
			}
		}
		else 
		{
			for(var column = 0 ; column < dataTable[index].length; column++)
			{
				var columnValue = dataTable[index][column].trim();
				$('#inputControls').append('<label>' + columnValue + ':</label> <input type ="text" placeholder="' + columnValue + '" id="' +columnValue +'txt"></input></br></br>');
			}
		}
	}
	
	//Method to get the Heading Index of the input table
	function GetHeadingIndex(dataTable)
	{
	   for(var row = 0; row < dataTable.length; row++)
	   {
		   var count = 0;
		   for(var column = 0; column < dataTable[row].length; column++)
		   {
			  if(dataTable[row][column].includes('-')) count++; 
		   }
		   if(count == dataTable[row].length) 
		   {
			   return row-1;
		   }
	   }
	}
	
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
		
		var controls = $('#inputControls').children("input[type=text]");
		var dataRow = [];
		controls.each(function() 
		{  
			dataRow.push($(this).val()) 
		});
		dataTable.push(dataRow);
		
		var stringTable = ConvertTableDatatoTableString(dataTable);
		$('#TableTxtArea').val(stringTable);	
		return dataTable;
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
	
	//Update the markdown input table when new column is added
	function UpdateMarkDownTable(inputTable)
	{
		var dataTable = ConvertTableStringToDataArray(inputTable);
		var index = GetHeadingIndex(dataTable);	
		//var tableRows = inputTable.length > 0 ? inputTable.split("\n") : [];
		var UpdatedTable = [];
		var newColumnIndex  = $('#inputControls').children("label").length-1
		var columnName = $('#inputControls').children("label")[newColumnIndex].innerHTML
		
		for(var row = 0; row < dataTable.length; row++)
		{
			var dataRow = dataTable[row];
			if(row == index)
			{
				dataRow.push(columnName.substring(0,columnName.length-1));
			}
			else if((index==-1 && row ==0) || (row == index + 1 && row!=0))
			{
				dataRow.push("-");
			}
			else 
			{
				dataRow.push("");
			}
			UpdatedTable.push(dataRow);
		}	
	return ConvertTableDatatoTableString(UpdatedTable);
	}
		