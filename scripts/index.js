var tempData;
var filterData=[];
var removeFilterIcon = document.getElementById("remove-applied-filter");
const getMobileData = async () => {
    
  if(localStorage.getItem('filterData')){
    //todo
     var list = document.getElementById("card-data__mobile");
    while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
    filterData= JSON.parse( localStorage.getItem('filterData'))
    filterData.map((item, i) => {
      var d = document.createElement('div');
      d.setAttribute("id", "id_" + (i + 1));
      d.innerHTML = cardMobileText(i, item.name, item.image, item.price, item.discount)
      document.getElementById("card-data__mobile").appendChild(d);
  })
  
  }
  else{
    var list = document.getElementById("card-data__mobile");
    while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
    const res = await fetch('./data/data.json')
    const data = await res.json()
    tempData = data.items;
    data.items.map((item, i) => {
        var d = document.createElement('div');
        d.setAttribute("id", "id_" + (i + 1));
        d.innerHTML = cardMobileText(i, item.name, item.image, item.price, item.discount)
        document.getElementById("card-data__mobile").appendChild(d);
    })
  }
 
  // table();
  // totalBill();
}
let openSortModalButton = document.getElementById('sort-modal-button');

let modalSort = document.getElementById('sort-modal-container');
let closeSortModalButton = document.getElementById('sort-modal-close');
var minValue=9999;
var maxValue=200000;
openSortModalButton.onclick = function() {
  modalSort.style.display = "block";
}

closeSortModalButton.onclick = function() {
  modalSort.style.display = "none";
}


let openFilterModalButton = document.getElementById('filter-modal-button');
let modalFilter = document.getElementById('filter-modal-container');
let closeFilterModalButton = document.getElementById('filter-modal-close');

openFilterModalButton.onclick = function() {
  modalFilter.style.display = "block";
}

closeFilterModalButton.onclick = function() {
  modalFilter.style.display = "none";
}


function getMinRange(event){
  event.target.value=Math.min(event.target.value,event.target.parentNode.childNodes[5].value-1);
           minValue = (event.target.value/parseInt(event.target.max))*100
          console.log(Math.trunc(minValue), `minValue`)
          var children = event.target.parentNode.childNodes[1].childNodes;
          children[1].style.width=minValue+'%';
          children[5].style.left=minValue+'%';
          children[7].style.left=minValue+'%';children[11].style.left=minValue+'%';
          children[11].childNodes[1].innerHTML=event.target.value;
          // localStorage.setItem("filterMinRange",minValue)
}

function getMaxRange(event){
  event.target.value=Math.max(event.target.value,event.target.parentNode.childNodes[3].value-(-1));
          maxValue  = (event.target.value/parseInt(event.target.max))*100
          console.log(Math.trunc(maxValue), `maxValue`)
          var children = event.target.parentNode.childNodes[1].childNodes;
          children[3].style.width=(100-maxValue)+'%';
          children[5].style.right=(100-maxValue)+'%';
          children[9].style.left=maxValue+'%';children[13].style.left=maxValue+'%';
          children[13].childNodes[1].innerHTML=event.target.value;
          // localStorage.setItem("filterMaxRange",maxValue)
}
function filterApply(){
    // if(localStorage.getItem('filterMinRange')){
    //   document.getElementById('minRange').setAttribute('value',localStorage.getItem('filterMinRange'))
    // }
    
    
    if(!localStorage.getItem('filterData')){
      tempData.map((item,i)=>{
        console.log("item.price.display",item.price.display, typeof item.price.display)
        if(i>0&&item.price.display>=minValue && item.price.display<=maxValue){
          filterData.push(item)
        }
      })
      localStorage.setItem('filterData',JSON.stringify(filterData))
      removeFilterIcon.style.display = "flex";
      tempData=[];

    }
    console.log("tempData",tempData.length)
    
    
  getMobileData()
  
  modalFilter.style.display = "none";
  
}
function removeFilter(){
  if(localStorage.getItem("filterData")){
    
    localStorage.removeItem("filterData")
    getMobileData()
  }
  removeFilterIcon.style.display = "none";

}

const addMobileDataToCart = (name, actualPrice, id, type,discountedPrice) => {
var mobileCartData = []
if (localStorage.getItem('mobileCartData')) {
  mobileCartData = JSON.parse(localStorage.getItem('mobileCartData'));
  var flag = 0;
  var temp;

  mobileCartData.map((item, i) => {
    if (item.id === id) {
      temp = item
      flag = 1;  // using this flag to check, if the current cart is exsists or not.
      return;

    }
  })
  var ind = -1;
  if (flag) { // if current data exists. 
    if (type == 1) {
      // type 1, is used to add the data in cart
      temp.quantity = temp.quantity + 1;
    }

    else {
      // type 0, is used to remove the data from the cart.
      if (temp.quantity - 1 > 0) {
        temp.quantity = temp.quantity - 1;
      }
      else {
        temp.quantity = temp.quantity - 1;
        // 0 case -> 
        // ind = item.id;
        ind = mobileCartData.indexOf(temp);
      }
    }

    if (ind == -1) {
      temp.totalAmount = temp.quantity * temp.rate;
      
      mobileCartData.map((item) => {
        if (item.id === temp.id) {
          item.quantity = temp.quantity
          item.totalAmount = temp.totalAmount
          
        }
      })
    }
    else {
      // remove the current object, which has quantity as 0. 
      mobileCartData.splice(ind, 1);
    }
  }

  else {
    // current card data does not exists, need to add new data.
    var obj = {
      'id': id,
      'name': name,
      'quantity': 1,
      'rate': actualPrice,
      'totalAmount': actualPrice,
      'discountedPrice': discountedPrice
    }
    mobileCartData.push(obj)
  }
  localStorage.setItem('mobileCartData', JSON.stringify(mobileCartData));
}

else {
  var obj = {
    'id': id,
    'name': name,
    'quantity': 1,
    'rate': actualPrice,
    'totalAmount': actualPrice,
    'discountedPrice': discountedPrice
  }
  mobileCartData.push(obj)
  localStorage.setItem('mobileCartData', JSON.stringify(mobileCartData));
}
table();
totalBill();

}

const cardMobileText = (i, name, image, price, discount) => {
  var tempId = 'id_' + (i + 1)
  var id = JSON.stringify(tempId);
  var name = JSON.stringify(name);
  var price_actual = JSON.stringify(price.actual)
  var price_display = JSON.stringify(price.display)
  return (
      '<div class="card__mobile">'+
        '<div class="card-body__mobile">'+
          '<div class="card-img__mobile">'+
            '<img src="https://place-hold.it/200" alt="" />'+
          '</div>'+
        '</div>'+

        '<div class="card-footer__mobile">'+
          '<p class="item-name__mobile">'+name+'</p>'+
          '<div class="item-details__mobile">'+
            '<div class="item-price__mobile">'+
              '<p class="item-discount-price__mobile">$ '+price.display+'</p>'+
              '<p class="item-actual-price__mobile">$'+price.actual+'</p>'+
              '<p class="item-actual-discount__mobile">'+discount+ '% off</p>'+
            '</div>'+
            '<div class="item-add-to-card__mobile">'+
              '<button id="${name}" onclick=\'addMobileDataToCart(' + name + ',' +price_display  + ',' + id + ',' + '1' +','+price_actual+ ') \'>'+'Add to cart'+'</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'
  )
}


getMobileData()



