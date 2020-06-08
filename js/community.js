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
        var commentsCnt = 0;
        if(myValue[mykey].Comments == null){
            commentsCnt = 0;
        }
        else{
            commentsCnt = Object.keys(myValue[mykey].Comments).length;
        }
        if (category==myValue[mykey].Category) {
            var newRow = tableid.insertRow(-1);
            var newCell1 = newRow.insertCell(0);
            var newCell2 = newRow.insertCell(1);
            var newCell3 = newRow.insertCell(2);
            var newCell4 = newRow.insertCell(3);
            var newCell5 = newRow.insertCell(4);
            var newCell6 = newRow.insertCell(5);
            newCell1.innerHTML = j;
            newCell2.innerHTML = myValue[mykey].Category;
            newCell3.innerHTML = myValue[mykey].Title;
            newCell4.innerHTML = myValue[mykey].Author;
            newCell5.innerHTML = commentsCnt;
            newCell6.innerHTML = myValue[mykey].Date;
            newRow.className = 'title1';
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
        } else {
            var keyList = Object.keys(myValue);
            if (category=="all"){
                for (var i = 0; i <numRows-1; i++) {
                    tableid.deleteRow(1);
                }
                for (var i = 0; i < keyList.length; i++) {
                var mykey = keyList[i];
                var newRow = tableid.insertRow(1);
                var newCell1 = newRow.insertCell(0);
                var newCell2 = newRow.insertCell(1);
                var newCell3 = newRow.insertCell(2);
                var newCell4 = newRow.insertCell(3);
                var newCell5 = newRow.insertCell(4);
                var newCell6 = newRow.insertCell(5);
                var commentsCnt = 0;
                if(myValue[mykey].Comments == null){
                    commentsCnt = 0;
                }
                else{
                    commentsCnt = Object.keys(myValue[mykey].Comments).length;
                }

                newCell1.innerHTML = i + 1;
                newCell2.innerHTML = myValue[mykey].Category;
                newRow.className = 'title1';

                newCell3.innerHTML = myValue[mykey].Title;
                newCell4.innerHTML = myValue[mykey].Author;
                newCell5.innerHTML = commentsCnt;
                newCell6.innerHTML = myValue[mykey].Date;
                
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

function printText(){

}

//수정필요

$(document).on('click', '#delete_post', function() {
    var key = document.getElementById('post_key').innerHTML;
    var password;
    console.log(key);

    var password_input = document.getElementById('delete_password').value
    firebase.database().ref('/text/').on('value', function (snapshot) {
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i]
                if (myKey == key) {
                    password = myValue[myKey].Password;
                    break;
                }
            }
        }

    });

    if (password_input==password){
        alert('complete');
        firebase.database().ref('/text/').child(key).remove();
        $(".container.post").hide();
        $('#delete_password').val('');
    }else{
        alert('password is wrong');
        $('#delete_password').val('');
    }
});



    /*alert(ref.val());




})


$(document).on('click', '#close', function(){
    $(".container.post").hide();
})

/*
$('#commentTable').on('click','button',(e) => {
    //var key = $(this).attr('id')
    console.log($(this).value);
})

$(document).on('click', '.commentdel', function(){
    console.log($(this).value);
})
*/







//when click reply button- write at firebase()
$(document).on('click', '#comment_btn', function(){ 
    var comment_input = document.getElementById('comment_input').value;
    var user_input = document.getElementById('comment_name').value;
    var password_input = document.getElementById('comment_password').value;
    var key = document.getElementById('post_key').innerHTML;
    var address = "text/" + key + "/Comments";
    console.log(key);
    if (comment_input == ""||user_input==''||password_input ==''){
        alert("There is a empty field");
    }
    else{
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let day = today.getDate();  // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        let date = year + '/' + month + '/' + day + " " + hours +":"+minutes;
        var dic = {
            Name : user_input,
            Password : password_input,
            Comment : comment_input,
            Date : date
        }
        var commentkey = firebase.database().ref(address).push(dic).getKey();
        alert(commentkey);

        var table =document.getElementById("commentTable");
        var numRows = table.rows.length;
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";

        var newRow = table.insertRow(numRows);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        var newCell4 = newRow.insertCell(3);
        newCell1.innerHTML = user_input;
        newCell1.style.fontWeight="bold";
        newCell2.innerHTML = '|\u0020'+comment_input;
        newCell3.innerHTML = date;
        newCell4.appendChild(deleteBtn);
        deleteBtn.setAttribute('class','delete_comment');
        deleteBtn.setAttribute("value",key);
        deleteBtn.setAttribute("id",commentkey);
        console.log(deleteBtn.value);
        console.log(deleteBtn.id);
        document.getElementById('comment_input').value = '';

    }
    //var query = firebase.database().ref('/text/')[key];
    
    //console.log(address);
});



$(document).on('click','.delete_comment',function(){
    var table =document.getElementById("commentTable");
    var row_index = $(this).closest('tr').index();
    var key = document.getElementById("post_key").innerHTML;
    var commentkey=$(this).attr('value');
    //var commentkey=$(this).attr('id');
    var address="text/" + key + "/Comments";
    var ref=firebase.database().ref(address);
    var alreadypw;
    firebase.database().ref(address+"/"+commentkey).once('value',function(snapshot){
        var dic = snapshot.val()
        alreadypw = dic["Password"];
    })    
    var password = document.getElementById(commentkey).value;
    if(password == alreadypw){
        table.deleteRow(row_index);
        ref.child(commentkey).remove();
    }
    else{
        alert("wrong password!");
    }
    
    



});
$(document).on('click', '#close', function(){
    //alert("?");
    $(".container.post").hide();
})

//when user click specific row, get data from firebase
$.click_row=function(){
    $(document).on('click', '.title1', function(){
        var tr=$(this);
        var td=tr.children();
        var target_title=td.eq(2).text();
        var query=firebase.database().ref('/text/').orderByChild('Title').equalTo(target_title);
        query.once('value').then(function(snapshot){
            var myValue=snapshot.val();
            var key=Object.keys(snapshot.val())[0];
            console.log(key);

            var title=myValue[key].Title;
            var content= myValue[key].Content;
            var table =document.getElementById("commentTable");
            //아직 안쓰는 것들
            var author = myValue[key].Author;
            var date = myValue[key].Date;
            var comments = myValue[key].Comments;




            if (comments == null){
                
            }
            else{
                var commentskey = Object.keys(comments); //코멘트들의 key array
                console.log(commentskey);
                var numRows = table.rows.length;
                for (var i = 0; i <numRows-1; i++) {
                    table.deleteRow(1);
                }
                for(var i =0;i<commentskey.length;i++) {

                    var deleteBtn = document.createElement("button");
                    //var commentPW = document.createElement("input");
                    deleteBtn.innerHTML = "Delete";
                    deleteBtn.setAttribute('class','delete_comment');
                    //deleteBtn.setAttribute("value",key);
                    var mykey = commentskey[i];
                    deleteBtn.setAttribute("value",mykey);
                    
                    var newRow = table.insertRow(-1);
                    var newCell1 = newRow.insertCell(0);
                    var newCell2 = newRow.insertCell(1);
                    var newCell3 = newRow.insertCell(2);
                    var newCell4 = newRow.insertCell(3);
                    var newCell5 = newRow.insertCell(4);
                    newCell1.innerHTML = comments[mykey]["Name"];
                    newCell1.style.fontWeight="bold";
                    newCell2.innerHTML = '|\u0020'+comments[mykey]["Comment"];
                    newCell3.innerHTML = comments[mykey]["Date"];
                    newCell4.appendChild(deleteBtn);
                    newCell5.innerHTML = "<input type ='password' id="+ mykey+ " style='width:calc(50%);' placeholder='password'>";
                }
            }
            
            // get data 까지 구현완료
            console.log(title);
            document.getElementById("post_title").innerHTML=title;
            document.getElementById("post_content").innerHTML=content;
            document.getElementById("post_author").innerHTML='['+author+']';
            document.getElementById("post_date").innerHTML=date;
            document.getElementById("post_key").innerHTML=key;

            $(".container.post").show();
            $("#posting_comment").show();

            $("#post_title").addClass("post_title_style");
            $("#post_content").addClass("post_content_style");
            $("#post_comment").addClass("post_comment_style");
            $(".wrapper_title").addClass("wrapper_title_style")
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
