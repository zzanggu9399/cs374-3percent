/*tea_search.js*/

var tea_list = tea_information



$( document ).ready(function() {
    var imagegrid = document.getElementById('image_grid');
    for (i=0; i<tea_list.length;i++){
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
});

function addFilter(filter_name){
    alert(filter_name);
}
