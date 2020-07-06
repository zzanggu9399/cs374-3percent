/*tea_search.js*/

/*Variables */
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

$( document ).ready(function() {
    temp = location.href.split("?");
    var branch = temp.length
    
    if(branch == 2){ // only redirect
        var t1= temp[1];
        var t2 = t1.split("%20");
        var name1;
        var name2;
        if(t2.length == 1){ // in the case of 'Rosemary'
            name1 = t2[0];
            if(name1.indexOf('#') == -1){
                searchTeaR(name1);
            }
            else{
                loading("",true);
            }
        }
        else{
            name1 = t2[0];
            name2 = t2[1];
            if(name2.indexOf('#') == -1){
                searchTeaR(name1 + ' ' + name2 );
            }
            else{
                loading("",true);
            }

        }
    }
    else{
        loading("",true);
    }
    
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

    if(filter_name.length >= 10){
        div.style.fontSize = '19px'
    }

    if (filter_list.length == 0){
        ft.rows[0].deleteCell(0);
        ft.rows[0].insertCell(0);
        ft.rows[0].cells[0].appendChild(div);
        ft.rows[0].cells[0].addEventListener('click',function(){delCell(filter_name)},false )
    }
    else{
        if(filter_list.length < Math.floor(max_num/2)){
            var idx = filter_list.length;
            ft.rows[0].insertCell(idx);
            ft.rows[0].cells[idx].appendChild(div);

            ft.rows[0].cells[idx].addEventListener('click',function(){delCell(filter_name)},false )
        }
        else{
            var idx = filter_list.length-Math.floor(max_num/2);
            ft.rows[1].insertCell(idx);
            ft.rows[1].cells[idx].appendChild(div);
            idx = String(idx)
            ft.rows[1].cells[idx].addEventListener('click',function(){delCell(filter_name)},false )
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

            var figc = document.createElement('div');
            figc.innerHTML = tea_list[i].info.replace(/\n/g, '<br/>');
            figc.className ="caption_center"

            // var figc2 = document.createElement('div');
            // figc2.innerHTML = tea_list[i].info.replace(/\n/g, '<br/>');
            // figc2.className ="caption_info"

            var p = document.createElement('p');
            p.innerHTML = tea_list[i].name;
            p.style = "font-size:25px";

            div.appendChild(image)
            div.appendChild(p);
            div.appendChild(figc);
            //div.appendChild(figc2);
            
            
            
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

function searchTeaR(teaname){
    loading(teaname.toLowerCase(),false);
}

function delCell(name){
    var index = filter_list.indexOf(name.toLowerCase());
    var box_width = document.getElementById('filterBox').offsetWidth
    var block_width = 200;
    var max_num = 2 * Math.floor( box_width/block_width );
    if(filter_list.length == 1)
        filterReset();
    else{
        var row = 0;
        var cell = 0;
        if(index < Math.floor(max_num/2)){
            row = 0;
            cell = index;
        }
        else{
            row = 1;
            cell = index - Math.floor(max_num/2);
        }
        if(filter_list.length > Math.floor(max_num/2) && index< Math.floor(max_num/2)){   
            var filter_temp = filter_list
            filterReset();
            filter_temp.splice(index,1)
            for (i=0; i<filter_temp.length;i++){
                addFilter(filter_temp[i])
            }
        }
        else{
            document.getElementById("filter_table").rows[row].deleteCell(cell);
            filter_list.splice(index,1)
        }
       
        loading("",false)
    }
    
    
}