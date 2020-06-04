// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCzWgYskwsU4_XW0hicz0W7zwFEtvxT_lg",
	authDomain: "cs374-20170364.firebaseapp.com",
	databaseURL: "https://cs374-20170364.firebaseio.com",
	projectId: "cs374-20170364",
	storageBucket: "cs374-20170364.appspot.com",
	messagingSenderId: "469335991334",
	appId: "1:469335991334:web:8d70cd0946f880d3f632e7",
	measurementId: "G-7NF12CYLQC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

all_text = [];

function copyDB(){
	firebase.database().ref('text/').once('value', function(snapshot){
		if(snapshot.val() === null){
			all_text = [];
		}
		else{
			all_text = snapshot.val();
		}
	})
}
function printTable(list){
	var tableid = document.getElementById("table1");
	var numRows = tableid.rows.length;
	for(var i=4;i<numRows;i++) {
		tableid.deleteRow(1);
	}
	if(list.length == 0){
		var newRow = tableid.insertRow(1);
		var newCell1 = newRow.insertCell(0);
		newCell1.colSpan = 4;
		newCell1.innerHTML = "No Entry to Show";

		newCell1.style.textAlign = 'center';
	}
	else{	
		for(var i=0;i<list.length;i++){
			var newRow = tableid.insertRow(i+1);
			var newCell1 = newRow.insertCell(0);
			var newCell2 = newRow.insertCell(1);
			newCell1.innerHTML = list[i]["Category"];
			newCell2.innerHTML = list[i]["Title"];
		}
	}
}

$(document).ready(function(){
	copyDB();
	printTable(all_text);

	$('.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');
        console.log(tab_id);
		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})