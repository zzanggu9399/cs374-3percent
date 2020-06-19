//Community.js



// Your web app's Firebase configuration
$(document).ready(function(){

var tea_list = tea_information;
tea_list.sort(function(a, b){
    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
    if (nameA < nameB) //sort string ascending
     return -1;
    if (nameA > nameB)
     return 1;
    return 0; //default return value (no sorting)
   });
var filter_list = new Array();
var tea_name_list = new Array();
for (i=0;i < tea_list.length;i++){
    tea_name_list[i] = tea_list[i].name;
}
var auto_selected = false;//check is auto selected



var availableTags = tea_name_list;

document.addEventListener('keydown', function(event) {
    //press enter
    if(event.keyCode == 13) {
      if(!auto_selected){
        document.getElementById("comment_btn").click();
        $( "#answer_input" ).autocomplete("close");
      }
      else{
        auto_selected = false;
      }
    }
  });

$( "#answer_input" ).autocomplete({
    source: availableTags,
    minLength: 2,
    focus: function( event, ui ) {
        var answer = document.getElementById("answer_input");
        answer.value = ui.item.value;
    },
    select: function(event, ui){
        auto_selected = true;
        var answer = document.getElementById("answer_input");
        answer.value = ui.item.value;

        return false; //it clear input if select function return false
    }
  });



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
    //console.log(cat_type);
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
            var category=myValue[mykey].Category;
            newCell2.innerHTML = category.slice(4,category.length);
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
        //console.log(tableid);
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
                var category=myValue[mykey].Category;
                
                newRow.className = 'title1';

                if(myValue[mykey].Question){
                    newCell2.innerHTML = category.slice(4,category.length) +"  "+"<span style='color:#5f944b'><i class='fa fa-question-circle' aria-hidden='true'></i></span>" ;
                }
                else{
                    newCell2.innerHTML = category.slice(4,category.length);
                }
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
    //console.log(key);

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



 






//when click reply button- write at firebase()
$(document).on('click', '#comment_btn', function(){ 
    var answer_input = document.getElementById('answer_input').value;
    var comment_input = document.getElementById('comment_input').value;
    var user_input = document.getElementById('comment_name').value;
    var password_input = document.getElementById('comment_password').value;
    var key = document.getElementById('post_key').innerHTML;
    var address = "text/" + key + "/Comments";
        if (comment_input == ""||user_input==''||password_input ==''||answer_input==""){
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
                Answer : answer_input,
                Name : user_input,
                Password : password_input,
                Comment : comment_input,
                Date : date
            }
            var commentkey = firebase.database().ref(address).push(dic).getKey();
            //alert(commentkey);
    
            var table =document.getElementById("commentTable");
            var numRows = table.rows.length;
            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i></button>";
    
            var newRow = table.insertRow(numRows);
            var newCell1 = newRow.insertCell(0);
            var newCell2 = newRow.insertCell(1);
    
            var newCell3 = newRow.insertCell(2);
            var newCell4 = newRow.insertCell(3);
            var newCell5 = newRow.insertCell(4);
            var newCell6 = newRow.insertCell(5);
            
            newCell1.innerHTML = "<i class='fa fa-user' aria-hidden='true'></i>" + user_input;
            newCell1.style.fontWeight="bold";
            /*newCell2.style.borderLeft="1px solid black";*/
            newCell2.innerHTML = '|\u0020'+ answer_input;
            newCell2.style.width="100px";
    
    
            newCell3.innerHTML = '|\u0020'+comment_input;
            newCell3.style.width="250px";
            newCell4.innerHTML = "<span style = 'color : gray'>"+date+"</span>";
            newCell4.style.fontSize = "2px";
            newCell5.appendChild(deleteBtn);
            newCell6.innerHTML = "<input type ='password' id="+ commentkey + " style='width:calc(50%);' placeholder='password'>";
    
            deleteBtn.setAttribute('class','delete_comment');
            deleteBtn.setAttribute("value",commentkey);
            //deleteBtn.setAttribute("id",commentkey);
            //console.log(deleteBtn.value);
            //console.log(deleteBtn.id);
            document.getElementById('comment_input').value = '';
            document.getElementById('answer_input').value = '';
        
            
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
            //console.log(key);

            var title=myValue[key].Title;
            var content= myValue[key].Content;
            var table =document.getElementById("commentTable");
            //아직 안쓰는 것들
            var author = myValue[key].Author;
            var date = myValue[key].Date;
            var comments = myValue[key].Comments;
            var answer_input = document.getElementById("answer_input");
            if(myValue[key].Question){
                //console.log("need answer");
                answer_input.value = "";
                $('#answer_input').attr("readonly", false);
            }
            else{
                //console.log("dont need answer");
                answer_input.value = "<3";
                $('#answer_input').attr("readonly", true);
            }



            if (comments == null){
                var numRows = table.rows.length;
                for (var i = 0; i <numRows-1; i++) {
                    table.deleteRow(1);
                }
            }
            else{
                var commentskey = Object.keys(comments); //코멘트들의 key array
                //console.log(commentskey);
                var numRows = table.rows.length;
                for (var i = 0; i <numRows-1; i++) {
                    table.deleteRow(1);
                }
                for(var i =0;i<commentskey.length;i++) {

                    var deleteBtn = document.createElement("button");
                    //var commentPW = document.createElement("input");
                    deleteBtn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
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
                    var newCell6 = newRow.insertCell(5);
                    newCell1.innerHTML = "<i class='fa fa-user' aria-hidden='true'></i>  " + comments[mykey]["Name"];
                    newCell1.style.width="calc(10%)";
                    newCell1.style.fontWeight="bold";
                    /*newCell2.style.borderLeft="1px solid black";*/
                    newCell2.innerHTML = '|\u0020'+ comments[mykey]["Answer"];
                    newCell2.style.width="calc(15%)";
                    newCell3.innerHTML = '|\u0020'+comments[mykey]["Comment"];
                    newCell3.style.width="calc(50%)";
                    newCell4.innerHTML = "<span style = 'color : gray'>"+comments[mykey]["Date"]+"</span>";
                    newCell4.style.fontSize = "2px";
                    newCell5.appendChild(deleteBtn);
                    newCell6.innerHTML = "<input type ='password' id="+ mykey+ " style='width:calc(50%);' placeholder='password'>";
                }
            }
            
            // get data 까지 구현완료
            //console.log(title);
            document.getElementById("post_title").innerHTML="<span style =color:green><i class='fa fa-leaf' aria-hidden='true'></i>  </span>" + title;
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


document.addEventListener('keydown', function(event) {
    //press enter
    if(event.keyCode == 13) {
      if(!auto_selected){
        document.getElementById("comment_btn").click();
        $( "#name" ).autocomplete("close");
      }
      else{
        auto_selected = false;
      }
    }
  });







    printTable("tab-1");
    $.click_row();

    $('.tabs li').click(function(){
        $(".container.post").hide();
        var tab_id = $(this).attr('data-tab');
        //console.log(tab_id);
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');

        printTable(tab_id);
        $.click_row();
    });

});


