var temp
var focus ="";
$(document).ready(function(){
    temp = location.href.split("?");
    if(temp.length != 1){
        var a,b,c,d, data;
        data = temp[1];
        a = data[0];
        b = data[1];
        c = data[2];
        d = data[3];
        if($.isNumeric(a)){
            whatIsMBTI(a,b,c,d);
            focusON(focus);
        }
        else{
            focus += data;
            focusON(focus);
        }
    }
    
})

function whatIsMBTI(a,b,c,d){
    if(a>=3){ //E
        focus += 'E';
    }
    else{ //I
        focus += 'I';
    }
    if(b>=3){//S
        focus += 'S';
    }
    else{//N
        focus += 'N';
    }
    if(c>=3){//T
        focus += 'T';
    }
    else{//F
        focus += 'F';
    }
    if(d>=3){//J
        focus += 'J';
    }
    else{//P
        focus += 'P';   
    }

}

function focusON(focus){
    $('#'+focus).css('border','4px solid red');
    var move = $('#'+focus).position().top-200;
    $('html, body').animate({scrollTop:move},100);
}
var brr = 0;

$('.fa-image').on({
    mouseover: function(){
            $(this).next().next().next().css("display","block");
    },
    mouseleave: function(){     
            $(this).next().next().next().css("display","none");
    }
});

$('.fa-file').on({
    
    mouseover: function(){
        console.log($(this).parent().next().first());
            $(this).parent().next().css("display","block");
    },
    mouseleave: function(){     
        $(this).parent().next().css("display","none");
    }
});