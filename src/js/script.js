var brands=["Apple","Samsung","ASUS","Microsoft","Motorola"];
var os=["iOS","Android","Windows"];

createHtml();
//Change event of Brand dropdown
$("body").on("change", "#brand", function(){
  var os=$("#os").val();
  var brand=$("#brand").val();
  var prod;
  if(brand == -1 ){
      prod=products;
  }
  else if(os == -1){
      prod=products.filter((v,i) =>{
          return v.brand === brand;
      });
  }
  else{
      prod=products.filter((v,i) =>{
          return v.os === os && v.brand === brand;
      });
  }
  createSearchTable(prod);
});
//Change event of OS dropdown
$("body").on("change", "#os", function(){
  var os=$("#os").val();
  var brand=$("#brand").val();
  var prod;
  if(os == -1){
      prod=products;
  }
  else if(brand == -1){
      prod=products.filter((v,i) =>{
          return v.os === os;
      });
  }
  else{
      prod=products.filter((v,i) =>{
          return v.os === os && v.brand === brand;
      });
  }
  createSearchTable(prod);
});


//Create the Page elements
function createHtml(){
  var html=`<div class="wrapper">
  <div class="header">
      <div id="filterDropdown">
          <select id="brand"></select>
          <select id="os"></select>
      </div>
  </div>
  <br>
  <div id="product"></div>
  <br>
  <div id="searchBar">
  <label for="search">Search:<input type="text" name="" id="search"></label>
</div>
</div>`;
$("#data").html(html);
}

$(document).ready(function(){
  createSearchTable(products);
  DropDownOptions(brands, "brand");
  DropDownOptions(os, "os");
  console.log(products);
  $("body").on("click","#Btn", function(){
      var pid=$(this).data("pid");
      $("#"+pid).hide();
  });
})

//Create the search table
function createSearchTable(products){
  var name = 
  `<table><thead>
  <tr id="head">
  <th>Id</th>
  <th>Name</th>
  <th>Brand</th>
  <th>Operating System</th>
  <th>Remove</th>
  </tr></thead>`;
for (let i = 0; i < products.length; i++) {
  name += `<tr id="${products[i].id}">
  <td>${products[i].id}</td>
  <td>${products[i].name}</td>
  <td>${products[i].brand}</td>
  <td>${products[i].os}</td>
  <td><a href="#" id="Btn" data-pid="${products[i].id}">&#10005;</a></td>
  </tr>`;
}
name += `</table>`;
$("#product").html(name);
$("#head").css("background-color","Cyan");
}


//Filtering the search
$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });createSearchTable(prod);
});



//DropDown options
function DropDownOptions(opts, value){
  var opt=`<option value = -1 >Select ${value}</option>`;
  for(var i=0;i<opts.length;i++){
      opt+=`<option value="${opts[i]}">${opts[i]}</option>`;
  }
  $("#"+value).html(opt);
}
