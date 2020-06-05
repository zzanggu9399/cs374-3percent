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


function cat_type(tab_id){
    var cat_type;
    if (tab_id=="tab-1"){
        cat_type="all";
    }else if (tab_id=="tab-2"){
        cat_type="cat_stressed";
    }else if (tab_id=="tab-3"){
        cat_type="cat_sleepwell";
    }else if (tab_id=="tab-4"){
        cat_type="cat_relax";
    }else if (tab_id=="tab-5"){
        cat_type="cat_casually";
    }

    return cat_type;

}

function get_table(cat_type){
    console.log(cat_type);
    if (cat_type=="all"){
        var tableid = document.getElementById("table_all");
    }else if (cat_type=="cat_stressed"){
        var tableid = document.getElementById("table_stressed");
    }else if (cat_type=="cat_sleepwell"){
        var tableid = document.getElementById("table_sleepwell");
    }else if (cat_type=="cat_relax"){
        var tableid = document.getElementById("table_relax");
    }else if (cat_type=="cat_casually"){
        var tableid = document.getElementById("table_casually");
    }

    return tableid
}

function printTable_type(myValue, keyList,tableid, category){
    var j=1;
    for (var i = 0; i < keyList.length; i++) {
        var mykey = keyList[i];
        if (category==myValue[mykey].Category) {
            var newRow = tableid.insertRow(-1);
            var newCell1 = newRow.insertCell(0);
            var newCell2 = newRow.insertCell(1);
            var newCell3 = newRow.insertCell(2);
            newCell1.innerHTML = j;
            newCell2.innerHTML = myValue[mykey].Category;
            newCell3.innerHTML = myValue[mykey].Title;
            j+=1;
        }

    }
}


function printTable(tab_id) {
    return firebase.database().ref('/text/').on('value', function (snapshot) {
        var category=cat_type(tab_id);
        var tableid=get_table(category);
        console.log(tableid);
        //var tableid = document.getElementById("table_all");
        var numRows = tableid.rows.length;
        var myValue = snapshot.val();

        if (myValue == null) {
            for (var i = 0; i <numRows-1; i++) {
            tableid.deleteRow(1);
            }
            var newRow = tableid.insertRow(1);
            var newCell1 = newRow.insertCell(0);
            newCell1.colSpan = 4;
            newCell1.innerHTML = "No Entry to Show";
            newCell1.style.textAlign = 'center';
        } else {
            var keyList = Object.keys(myValue);
            if (category=="all"){
                for (var i = 0; i <numRows-1; i++) {
                    tableid.deleteRow(1);
                }
                for (var i = 0; i < keyList.length; i++) {
                var mykey = keyList[i];
                var newRow = tableid.insertRow(-1);
                var newCell1 = newRow.insertCell(0);
                var newCell2 = newRow.insertCell(1);
                var newCell3 = newRow.insertCell(2);
                newCell1.innerHTML = i + 1;
                newCell2.innerHTML = myValue[mykey].Category;
                newCell3.innerHTML = myValue[mykey].Title;
                }
            }else{
                for (var i = 0; i <numRows-1; i++) {
                tableid.deleteRow(1);
                }
                printTable_type(myValue, keyList,tableid,category);
            }

        }

    });
    $.click_row();
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
            console.log(title);
            document.getElementById("post_title").innerHTML=title;
            document.getElementById("post_content").innerHTML=content;
            $("#post_title").addClass("post_title_style");
            $("#post_content").addClass("post_content_style");
            $(".container.post").addClass("container_post_style");

        })
    });

}
//table 에 따라 row 출력하는거 고쳐야함






    printTable("tab-1");
    $.click_row();

    $('.tabs li').click(function(){

        var tab_id = $(this).attr('data-tab');
        console.log(tab_id);
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');

        printTable(tab_id);
        $.click_row();
    });

});
