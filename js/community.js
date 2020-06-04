//Community.js

// Your web app's Firebase configuration
$(document).ready(function(){
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


function printTable() {
    return firebase.database().ref('/text/').on('value', function (snapshot) {
        var tableid = document.getElementById("table");
        var numRows = tableid.rows.length;
        var myValue = snapshot.val();
        for (var i = 4; i < numRows; i++) {
            tableid.deleteRow(1);
        }
        if (myValue == null) {
            var newRow = tableid.insertRow(1);
            var newCell1 = newRow.insertCell(0);
            newCell1.colSpan = 4;
            newCell1.innerHTML = "No Entry to Show";

            newCell1.style.textAlign = 'center';
        } else {
            var keyList = Object.keys(myValue);
            for (var i = 0; i < keyList.length; i++) {
                var mykey = keyList[i];
                var newRow = tableid.insertRow(i + 1);
                var newCell1 = newRow.insertCell(0);
                var newCell2 = newRow.insertCell(1);
                var newCell3 = newRow.insertCell(2);
                newCell1.innerHTML = i + 1;
                newCell2.innerHTML = myValue[mykey].Category;
                newCell3.innerHTML = myValue[mykey].Title;

            }
        }

    });
}

//when user click specific row, get data from firebase
$.click_row=function(){
    $(document).on('click', '#table tr', function(){
        var tr=$(this);
        var td=tr.children();
        var target_title=td.eq(2).text();
        var query=firebase.database().ref('/text/').orderByChild('Title').equalTo(target_title);
        query.once('value').then(function(snapshot){
            var myValue=snapshot.val();
            var key=Object.keys(snapshot.val())[0];


            var title=myValue[key].Title;
            var content= myValue[key].Content;
            // get data 까지 구현완료
        })
    });

}






    printTable();
    $.click_row();

    $('.tabs li').click(function(){

        var tab_id = $(this).attr('data-tab');
        console.log(tab_id);
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });

});
