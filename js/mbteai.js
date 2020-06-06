//global variable
var index; //for test page

$(document).ready(function(){
    $('#before i').hide();
    $('#prev').hide();
    index = 1;
    $('#2table').hide();
})

$('#prev').click(function(){
    $('#2table').hide();
    index--;
    $('#page_no').html("1/2");
    $('#1table').show();
    $('#prev').hide();
    $(location).removeAttr("href");
})

$('.MBTEAi_table td').on('click', function(){
    var k = $(this).children('input');
    if(k != null){
        //k = k.children('input');
        //console.log(k);
        var n = k.attr('name');
        var v = k.attr('value');
        $("input:radio[name=" + n +"]:radio[value=" + v + "]").prop("checked", true);
        if(v == 1){
        $("input:radio[name=" + n +"]:radio[value=1]").parent('td').css("background", "red");
        $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background","#a5d194");
        }
        else{
            $("input:radio[name=" + n +"]:radio[value=2]").parent('td').css("background", "red");
            $("input:radio[name=" + n +"]:radio[value=1]").parent('td').css("background","#a5d194");
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
        $(location).attr("href",'mbteai_result.html');
        

        /*
        if(branch){
            
        }
        else{
            alert('You have not answered Question '+l+' yet');
        }
        */
    }


})