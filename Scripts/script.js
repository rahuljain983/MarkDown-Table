$(document).ready(function() {
    // To Generate the table based on the input markdown format
    $("#btnGenerateColumn").on('click', function() {
		if($("#btnGenerateColumn").text().toUpperCase() === "GENERATE TABLE")
		{
			var inputTable = $('#TableTxtArea').val()
			$('#tblData').empty();
			if (ValidateInputData(inputTable)) {
				GenerateTable(inputTable);
				$('#TableTxtArea').hide();
				$("#btnGenerateColumn").text('Generate Code');
				$('#divTable').addClass('col-md-12');
			}
		}
		else 
		{
			$('#tblData').empty();
			$('#TableTxtArea').show();
			$("#btnGenerateColumn").text('Generate Table');
			$('#divInput').addClass('col-md-12');
		}
    });

    // To add a new Row			
    $('#btnAddRow').click(function() {
        AddRow();
    });

    //To add a new Column 
    $('#btnAddColumn').click(function() {
        var columnValue = $('#modalTxt').val();
        if (columnValue != "") {
            $('#myModal').modal('toggle');
            UpdatedTable = UpdateMarkDownTable($('#TableTxtArea').val(), columnValue);
            $('#TableTxtArea').val(UpdatedTable);
            GenerateTable($('#TableTxtArea').val())
        } else {
            alert('Please enter the column name.')
        }
    });
});

//Method to validate whether the input table content is valid or not
function ValidateInputData(inputTable) {
    if (inputTable === "") {
        alert('No markdrop script for table is entered.');
        return false;
    }
    return true;
}

//Method to generate the table based on input table enterd in the text area
function GenerateTable(inputTable) {
    $('#tblData').empty();
    dataTable = ConvertTableStringToDataArray(inputTable);
    var headerRow = '<thead><tr><th>#</th>';
    var dataRow = '<tbody>';
    var headerIndex = GetHeadingIndex(dataTable);
    var index = headerIndex;
    if (headerIndex == -1) {
        headerIndex += 1;
        alert('No Columns Name have been entered. default columns are being generated');
    }
    for (var column = 0; column < dataTable[headerIndex].length; column++) {
        if (index == -1) {
            var columnValue = 'Col' + (column + 1);
            headerRow = headerRow.concat('<th>' + columnValue + '</th>');
        } else {
            var columnValue = dataTable[headerIndex][column];
            headerRow = headerRow.concat('<th>' + columnValue + '</th>');
        }
    }

    headerRow = headerRow.concat('</tr></thead>');
    var count = 1;
    for (var row = index + 2; row < dataTable.length; row++) {
        dataRow = dataRow.concat('<tr><th scope="row">' + count + '</th>');
        for (var column = 0; column < dataTable[row].length; column++) {
            dataRow = dataRow.concat('<td>' + dataTable[row][column] + '</td>')
        }
        dataRow = dataRow.concat('</tr>');
        count++;
    }

    //Inserting an empty row in the end
    dataRow = dataRow.concat('<tr><th scope="row">' + count + '</th>');
    for (var col = 0; col < dataTable[0].length; col++) {
        dataRow = dataRow.concat('<td><input type="text" style="width:100%" class="txtValue"></td>');
    }

    dataRow = dataRow.concat('</tbody>');
    $('#tblData').append(headerRow);
    $('#tblData').append(dataRow);
}

//Method to get the Heading Index of the input table
function GetHeadingIndex(dataTable) {
    for (var row = 0; row < dataTable.length; row++) {
        var count = 0;
        for (var column = 0; column < dataTable[row].length; column++) {
            if (dataTable[row][column].includes('-')) count++;
        }
        if (count == dataTable[row].length) {
            return row - 1;
        }
    }
}

function AddRow() {
    var inputTable = $('#TableTxtArea').val();
    if (inputTable === "") {
        dataTable = [];
    } else {
        dataTable = ConvertTableStringToDataArray(inputTable);
    }

    //append textbox in table to get the input data
    var row = [];
    var rowCount = $('#tbldata tr').length - 1;
    var colCount = $($($('#tblData tr')[rowCount]).children('td')).length;
    for (var col = 0; col < colCount; col++) {
        row.push($($($('#tblData tr')[rowCount]).children('td').children()[col]).val())
    }
    dataTable.push(row);
    var stringTable = ConvertTableDatatoTableString(dataTable);
    $('#TableTxtArea').val(stringTable);
    GenerateTable($('#TableTxtArea').val());
    return dataTable;
}

//Method to convert the table data to string format to represent the data in markdown format.
function ConvertTableDatatoTableString(dataArray) {
    var result = "";
    for (var row = 0; row < dataArray.length; row++) {
        for (var column = 0; column < dataArray[row].length; column++) {
            result += "|" + dataArray[row][column];
        }
        result += "|";


        if (row != dataArray.length - 1) {
            result += "\n";
        }
    }
    return result;
}

//method to convert the table string i.e. mark down table in Table data format.
function ConvertTableStringToDataArray(tableString) {
    tableString = tableString.trim();
    var tableRows = tableString.length > 0 ? tableString.split("\n") : [];
    var tableData = new Array(tableRows.length);
    for (var row = 0; row < tableRows.length; row++) {
        var tableRowData = tableRows[row].split("|");

        tableData[row] = new Array(tableRowData.length - 2);
        for (column = 1; column < tableRowData.length - 1; column++) {
            tableData[row][column - 1] = tableRowData[column].trim();
        }
    }
    return tableData;
}

//Update the markdown input table when new column is added
function UpdateMarkDownTable(inputTable, columnName) {
    var dataTable = ConvertTableStringToDataArray(inputTable);
    var index = GetHeadingIndex(dataTable);
    var UpdatedTable = [];
    for (var row = 0; row < dataTable.length; row++) {
        var dataRow = dataTable[row];
        if (row == index) {
            dataRow.push(columnName.substring(0, columnName.length));
        } else if ((index == -1 && row == 0) || (row == index + 1 && row != 0)) {
            dataRow.push("-");
        } else {
            dataRow.push("");
        }
        UpdatedTable.push(dataRow);
    }
    return ConvertTableDatatoTableString(UpdatedTable);
}