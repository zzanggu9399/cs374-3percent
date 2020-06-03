/*tea_search.js*/

var tea_list = tea_information;
var filter_list = new Array();


$( document ).ready(function() {
    filterTea("",true);
});

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
    filterTea("",false)
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
    filterTea("",true)
};

function filterTea(name,all){
    var imagegrid = document.getElementById('image_grid');
    var show_all = all;
    var cnt = 0;
    //if filter off
    if (!document.getElementById('chck').checked){
        show_all = true;
    }
    //delete exist child
    while(imagegrid.childElementCount>0){
        imagegrid.removeChild(imagegrid.childNodes[0]);

    }

    for (i=0; i<tea_list.length;i++){
        if (show_all || name == tea_list[i].name.toLowerCase() || tea_list[i].tag.filter(value => filter_list.includes(value)).length>0){
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
            div.appendChild(image)
            div.appendChild(p);

            imagegrid.appendChild(div);   
        }   
    }
    if (cnt == 0){
       var div = document.createElement('div');
       div.style = "font-size:50px; margin-right:100px"
       div.innerHTML = "No result"
       imagegrid.appendChild(div); 
    }
}