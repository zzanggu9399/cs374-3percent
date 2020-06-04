//global variable
var index; //for test page



$(document).ready(function(){
    $('#before i').hide();
    index = 1;
    $('#2table').hide();
    $('#3table').hide();
    $('#4table').hide();

})

$('#after').click(function(){
    $('#'+index+'table').hide();
    index++;
    $('#page_no').html(index+"/4");
    $('#'+index+'table').show();
    if(index != 1){
        $('#before i').show();
    } 
    if(index == 4){
        $('#after i').hide();
    }
})

$('#before').click(function(){
    $('#'+index+'table').hide();
    index--;
    $('#page_no').html(index+"/4");
    $('#'+index+'table').show();
    if(index == 1){
        $('#before i').hide();
    } 
    if(index != 4){
        $('#after i').show();
    }
})

$('.MBTEAi_table td').one('click', function(){
    var k = $(this).children();
    if(k != null){
        k = k.children();
        var n = k.attr('name');
        var v = k.attr('value');
        $("input:radio[name=" + n +"]:radio[value=" + v + "]").prop("checked", true);
    }
})