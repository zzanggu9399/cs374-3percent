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
$('.MBTEAi_table td:nth-child(2)').on({
    mouseover: function(){
        $(this).css('background-color','#2EE59D');
    },
    mouseleave: function(){
        $(this).css('background-color','rgba(0,0,0,0)');
    },
    click:function(){
        $(this).off('mouseleave');
    }
});
   
$('.MBTEAi_table td:nth-child(3)').on({
    mouseover: function(){
        $(this).css('background-color','#2EE59D');
    },
    mouseleave: function(){
        $(this).css('background-color','rgba(0,0,0,0)');
    },
    click:function(){
        $(this).off('mouseleave');
    }
});

$('.MBTEAi_table td').on('click', function(){
    var k = $(this).children('input');
    if(k != null){
        //k = k.children('input');
        //console.log(k);
        var n = k.attr('name');
        var v = k.attr('value');
        $("input:radio[name=" + n +"]:radio[value=" + v + "]").prop("checked", true);
        if(v == 1){
        $("input:radio[name=" + n +"]:radio[value=1]").parent('td').css({"background-color":"#2EE59D"});
        $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background-color","rgba(0,0,0,0)");
        $("input:radio[name=" + n +"]:radio[value=2]").parent('td').on('mouseleave',function(){
                $(this).css('background-color','rgba(0,0,0,0)');
        });

        }
        else{
            $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background-color", "#2EE59D");
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

    }
    else{
        var l = []
          var branch = true;
        for(var i = 1 ; i<21 ; i++){
            if(! $('input:radio[name=q'+i+']').is(':checked')){// if not checked
                branch = false;
                l.push(i+" ");
            }
        }
        E = $('.E:radio:checked').length;
        S = $('.S:radio:checked').length;
        T = $('.T:radio:checked').length;
        J = $('.J:radio:checked').length;

        //$(location).attr("href",'mbteai_result.html?'+E+S+T+J);
        $(location).attr("href",'mbteai_result.html?3333');
        

        /*
        if(branch){
            
        }
        else{
            alert('You have not answered Question '+l+' yet');
        }
        */
    }


})