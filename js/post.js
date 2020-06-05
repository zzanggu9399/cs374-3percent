
 /*  
var firebaseConfig = {
    apiKey: "AIzaSyAC7HlE8qFQ6kKX7vgxJpU_bkBV30CuMLg",
    authDomain: "team3per.firebaseapp.com",
    databaseURL: "https://team3per.firebaseio.com",
    projectId: "team3per",
    storageBucket: "team3per.appspot.com",
    messagingSenderId: "124634951152",
    appId: "1:124634951152:web:fa5b0ae1a4f37fd94c8135"
  };
  */

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

$( document ).ready(function() {
    $('.post').click(function(){
        var title = document.getElementById("title");
        var maintext = document.getElementById("main_text");
        var category = document.getElementById("category");
        var author = document.getElementById("author");
        var password = document.getElementById("password");
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let day = today.getDate();  // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        let date = year + '/' + month + '/' + day + " " + hours +":"+minutes;

        //alert(category.value);
        if (category.value == "none"||title.value==''||author.value ==''||password.value==''||maintext.value==''){
            alert("There is a empty field");
        }
        else{
            var dic = {
                Title : title.value,
                Content : maintext.value,
                Category : category.value,
                Author : author.value,
                Password : password.value,
                Date : date
            };
            console.log(dic);
            database.ref('text').push(dic);
            alert("post complete!");
            window.location.href ='community.html';
        }
        
    });
});



