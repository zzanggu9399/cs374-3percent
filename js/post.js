
    var firebaseConfig = {
    apiKey: "AIzaSyAC7HlE8qFQ6kKX7vgxJpU_bkBV30CuMLg",
    authDomain: "team3per.firebaseapp.com",
    databaseURL: "https://team3per.firebaseio.com",
    projectId: "team3per",
    storageBucket: "team3per.appspot.com",
    messagingSenderId: "124634951152",
    appId: "1:124634951152:web:fa5b0ae1a4f37fd94c8135"
  };

  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$( document ).ready(function() {
    $('.post').click(function(){
        var title = document.getElementById("title");
        var maintext = document.getElementById("main_text");
        var category = document.getElementById("category");
        if (category.value == "none"){
            alert("should select category");
        }
        else{
            var dic = {
                Title : title.value,
                Content : maintext.value,
                Category : category.value
            };
            console.log(dic);
            database.push(dic);
        }
        
    });
});