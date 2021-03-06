//global variable
var index; //for test page
var E,S,T,J;

$(document).ready(function(){
    $('#before i').hide();
    $('#prev').hide();
    index = 1;
    $('#2table').hide();
    E = 0;
    S = 0;
    T = 0;
    J = 0;
})

$('#prev').click(function(){
    $('#2table').hide();
    index--;
    $('#page_no').html("1/2");
    $('#submit').html("NEXT");
    $('#1table').show();
    $('#prev').hide();
    $(location).removeAttr("href");
})
$('.MBTEAi_table tr.Answer td:nth-child(2)').on({
    mouseover: function(){
        $(this).css('background-color','#D3F1D2;');
    },
    mouseleave: function(){
        $(this).css('background-color','rgba(0,0,0,0)');
    },
    click:function(){
        $(this).off('mouseleave');
    }
});
   
$('.MBTEAi_table tr.Answer td:nth-child(4)').on({
    mouseover: function(){
        $(this).css('background-color','#D3F1D2;');
    },
    mouseleave: function(){
        $(this).css('background-color','rgba(0,0,0,0)');
    },
    click:function(){
        $(this).off('mouseleave');
    }
});

$('.MBTEAi_table tr.Answer td').on('click', function(){
    var k = $(this).children('input');

    if(k != null){
        //k = k.children('input');
        //console.log(k);
        var n = k.attr('name');
        var v = k.attr('value');
        $("input:radio[name=" + n +"]:radio[value=" + v + "]").prop("checked", true);
        if(v == 1){
        $("input:radio[name=" + n +"]:radio[value=1]").parent('td').css({"background-color":"#D3F1D2;"});
        $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background-color","rgba(0,0,0,0)");
        $("input:radio[name=" + n +"]:radio[value=2]").parent('td').on('mouseleave',function(){
                $(this).css('background-color','rgba(0,0,0,0)');
        });

        }
        else{
            $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background-color", "#D3F1D2;");
            $("input:radio[name=" + n +"]:radio[value=1]").parent('td').css("background-color","rgba(0,0,0,0)");
            $("input:radio[name=" + n +"]:radio[value=1]").parent('td').on('mouseleave',function(){
                $(this).css('background-color','rgba(0,0,0,0)');
        });
        }
    }
})

$('#submit').click(function(){ 
    if(index == 1){
        index++;
        $('#1table').hide();
        $('#2table').show();
        $('#prev').show();
        $('#submit').html("SUBMIT");
        $('#page_no').html("2/2");
        var move = $('#MBTEAi').position().top-50;
        //console.log(move);
        $('html, body').animate({scrollTop:move},150);

    }
    else{
        var l = [];
          var branch = true;
        for(var i = 1 ; i<21 ; i++){
            if(! $('input:radio[name=q'+i+']').is(':checked')){// if not checked
                branch = false;
                l.push(i+" ");
            }
        }
        if(branch){
            E = $('.E:radio:checked').length;
            S = $('.S:radio:checked').length;
            T = $('.T:radio:checked').length;
            J = $('.J:radio:checked').length;
            for(var i = 1 ; i<21 ; i++){
                $('input:radio[name=q'+i+']').removeAttr('checked');
            }
            $(location).attr("href",'mbteai_result.html?'+E+S+T+J);
            //$(location).attr("href",'mbteai_result.html?3333'); //for presentation
        }
        else{
            alert('You have not answered Question '+l+' yet');
            var min = l[0];
            if(min<11){
                $('#1table').show();
                $('#2table').hide();
                $('#prev').hide();
                $('#submit').html("NEXT");
                $('#page_no').html("1/2");
                index--;
                var mov = $('input:radio[name=q'+min+']').position().top;
                $('html, body').animate({scrollTop:mov},150);
            }
            else{
                var mov = $('input:radio[name=q'+min+']').position().top;
                $('html, body').animate({scrollTop:mov},150);
            }
        }

        
    }


})

// To see the result not doing the MBTI test
var mbti = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"];

$(function() {
    $("#direct_input").autocomplete({
        source: mbti,
        focus: function( event, ui ) {
            var answer = document.getElementById("direct_input");
            answer.value = ui.item.value;
        },
        select: function(event, ui) {
            var answer = document.getElementById("direct_input");
            answer.value = ui.item.value;
            $(location).attr("href",'mbteai_result.html?'+answer.value);
            return false;
        },
    });
});

function directR(ans, num){
    if(ans == ""){
        alert("empty field!");
    
    }
    else if(num != -1){
        $(location).attr("href",'mbteai_result.html?'+ans);
    }
    else if(num == -1){
        alert("Please type a vaild MBTI type.");
        $('#direct_input').val('');
        $('#direct_input').focus();
    }
}

$('#direct_submit').click(function(){
    var ans = $('#direct_input').val().toUpperCase();
    var num = mbti.indexOf(ans);
    directR(ans, num);
})

$(document).keydown(function (key) {
    if (key.keyCode == 13) {
        var ans = $('#direct_input').val().toUpperCase();
        var num = mbti.indexOf(ans);
        directR(ans,num);
    }
});