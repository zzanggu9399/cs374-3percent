//global variable
var index; //for test page



$(document).ready(function(){
    $('#before i').hide();
    index = 1;
    $('#2table').hide();
    he = $('#MBTEAi').height();
    $('#before').height(he);
    $('#after').height(he);

})

$('#after').click(function(){
    $('#'+index+'table').hide();
    index++;
    $('#page_no').html(index+"/2");
    $('#'+index+'table').show();
    if(index != 1){
        $('#before i').show();
    } 
    if(index == 2){
        $('#after i').hide();
    }
})

$('#before').click(function(){
    $('#'+index+'table').hide();
    index--;
    $('#page_no').html(index+"/2");
    $('#'+index+'table').show();
    if(index == 1){
        $('#before i').hide();
    } 
    if(index != 2){
        $('#after i').show();
    }
})

$('.MBTEAi_table td').on('click', function(){
    var k = $(this).children();
    if(k != null){
        k = k.children();
        var n = k.attr('name');
        var v = k.attr('value');
        $("input:radio[name=" + n +"]:radio[value=" + v + "]").prop("checked", true);
    }
})

$('#submit').click(function(){
    var l = []
    var branch = true;
    for(var i = 1 ; i<21 ; i++){
        if(! $('input:radio[name=q'+i+']').is(':checked')){// if not checked
            branch = false;
            l.push(i+" ");
        }
    }
    if(branch){
        
    }
    else{
        alert('You have not answered Question '+l+' yet');
    }

})