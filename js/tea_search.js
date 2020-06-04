/*tea_search.js*/

/*Variables */
var tea_list = tea_information;
var filter_list = new Array();
var tea_name_list = new Array();
for (i=0;i < tea_list.length;i++){
    tea_name_list[i] = tea_list[i].name;
}
var auto_selected = false;//check is auto selected

$( document ).ready(function() {
    loading("",true);
});

document.addEventListener('keydown', function(event) {
    //press enter
    if(event.keyCode == 13) {
      if(!auto_selected){
        document.getElementById("btn_search").click();
        $( "#name" ).autocomplete("close");
      }
      else{
        auto_selected = false;
      }   
    }
  });

  //Autocomplete
$( function() {
    var availableTags = tea_name_list;
    $( "#name" ).autocomplete({
        source: availableTags,
        minLength: 2,
        focus: function( event, ui ) {
            var answer = document.getElementById("name");
            answer.value = ui.item.value;
        },
        select: function(event, ui){
            auto_selected = true;
            var answer = document.getElementById("name");
            answer.value = ui.item.value;
            document.getElementById("btn_search").click();
            return false; //it clear input if select function return false
        }
      });
  } );

function addFilter(filter_name){
    //filter already exist
    if (filter_list.includes(filter_name.toLowerCase())){
        return;
    }
    var box_width = document.getElementById('filterBox').offsetWidth
    var block_width = 200;
    var max_num = 2 * Math.floor( box_width/block_width );
    //max 10
    if(filter_list.length == max_num){
        //alert("Max number of filter is 10");
        return;
    }
    var ft = document.getElementById("filter_table");
    var div = document.createElement('div');
    div.className = "filter_block";
    div.innerHTML = filter_name.toUpperCase();

    if (filter_list.length == 0){
        ft.rows[0].deleteCell(0);
        ft.rows[0].insertCell(0);
        ft.rows[0].cells[0].appendChild(div);
    }
    else{
        if(filter_list.length < Math.floor(max_num/2)){
            var idx = filter_list.length;
            ft.rows[0].insertCell(idx);
            ft.rows[0].cells[idx].appendChild(div);
        }
        else{
            var idx = filter_list.length-Math.floor(max_num/2);
            ft.rows[1].insertCell(idx);
            ft.rows[1].cells[idx].appendChild(div);
        }
    }
    filter_list[filter_list.length] =  filter_name.toLowerCase();
    loading("",false)

    
    
};

function filterReset(){
    if (filter_list.length == 0){
        return;
    }
    
    var ft = document.getElementById("filter_table");
    var box_width = document.getElementById('filterBox').offsetWidth
    var block_width = 200;
    var max_num = 2 * Math.floor( box_width/block_width );
    var len = filter_list.length;

    for(i=0; i<len;i++){
        if(i >= Math.floor(max_num/2)){
            ft.rows[1].deleteCell(0);
        }
        else{
            ft.rows[0].deleteCell(0);
        }
        
    }
    var div = document.createElement('div');
    div.className = "filter_block";
    div.innerHTML = "No filter";
    ft.rows[0].insertCell(0);
    ft.rows[0].cells[0].appendChild(div);
    filter_list = new Array();
    loading("",true)
};

function filterTea(name,all){
    
    var imagegrid = document.getElementById('image_grid');
    var show_all = all;
    var cnt = 0;
    
    //if filter off and no search
    // if (name == ""){
    //     show_all = true;
    // }

    for (i=0; i<tea_list.length;i++){

        if (show_all || (tea_list[i].name.toLowerCase().includes(name) && ( filter_list.filter(value => tea_list[i].tag.includes(value)).length == filter_list.length))){
            cnt++;
            var div = document.createElement('div');
            div.className = "grid";
            var image = document.createElement('img');
            image.src = tea_list[i].src;
            image.alt = "Cannot Load Image";
            image.className = "image";
            
            var p = document.createElement('p');
            p.innerHTML = tea_list[i].name
            p.style = "font-size:25px";

            var figc = document.createElement('figcaption');
            figc.innerHTML = tea_list[i].info;
            figc.className ="bottom-right"

            div.appendChild(image)
            div.appendChild(figc);
            div.appendChild(p);
            
            
            imagegrid.appendChild(div);
            
        }   
    }
    if (cnt == 0){
       var div = document.createElement('div');
       div.style = "font-size:40px; margin-right:100px"
       div.innerHTML = 'No result <i class="fas fa-exclamation-circle"></i>'
       imagegrid.appendChild(div); 
    }
}

function loading(name,all) {
    var imagegrid = document.getElementById('image_grid');
    //delete exist child
    while(imagegrid.childElementCount>0){
        imagegrid.removeChild(imagegrid.childNodes[0]);

    }
    document.getElementById('name').value = "";
    var mask = document.getElementById('mask')
    mask.style.display = "flex";

    setTimeout(function(){filterTea(name,all); mask.style.display="none"}, 350);
}

function searchTea(){
    var input = document.getElementById('name');
    if (input.value == "" || input.value.replace(/\s/g, '') == "") return;
    loading(input.value.toLowerCase(),false);
    
}
