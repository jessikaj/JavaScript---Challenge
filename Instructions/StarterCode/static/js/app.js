// from data.js
var tableData = data;
_log(tableData);

// YOUR CODE HERE!
const elButton = document.querySelector('#filter-btn');
const elDate = document.querySelector('#datetime');
const elTHead =  document.querySelector("#ufo-table thead");

function createTable(theDataSet) {

	console.log('Creating Table');

	var tableHtml = d3.select("#ufo-table-body").selectAll("data-table").data(theDataSet).enter();

	var tableRow = tableHtml.append("tr");
	tableRow.append("td").text(d => d.datetime)
	tableRow.append("td").text(d => d.city);
	tableRow.append("td").text(d => d.state);
	tableRow.append("td").text(d => d.country);
	tableRow.append("td").text(d => d.shape);
	tableRow.append("td").text(d => d.durationMinutes);
	tableRow.append("td").text(d => d.comments);
}

function _log(obj) {
	console.log(obj);
}

function runFilter(event) {
	console.log('You Clicked');

	myFilterDate = elDate.value;
	myLen = myFilterDate.length;
    // I accidently typed 2021 in the filter bar for an hour
	if ( myFilterDate.substring(myLen - 4 ) != '2010') {
		alert( 'All data is from 2010' );
	};

	// Filter the original data based on the myDate value
	const arTableData = Object.entries(tableData);
	let arFilteredData = [];

	let myData =  new Object();

	arTableData.forEach((row, index) => {

		if( myFilterDate === arTableData[index][1].datetime ) {
			console.log('MATCH', index);

			myData = {
			city: arTableData[index][1].city,
			comments: arTableData[index][1].comments,
			country: arTableData[index][1].country,
			datetime: arTableData[index][1].datetime,
			shape: arTableData[index][1].shape,
			state: arTableData[index][1].state
			};

			arFilteredData.push(myData);
		} // end if
	});

	//console.log('After foreach');
	//_log(arFilteredData);

	document.querySelector("#ufo-table-body").remove();
	const newTBody = document.createElement('tbody');
	newTBody.id = "ufo-table-body";
	elTHead.insertAdjacentElement("afterend", newTBody);

	createTable(arFilteredData);
}

elButton.addEventListener('click', runFilter);
// Instead of automatically creating the table isolate into a fucntion
// that can be called as necessary. This call creates the intial table
createTable(tableData);