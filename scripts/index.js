var tempData;
var filterData = [];
var sortData = [];
var cartItemData;
var removeFilterIcon = document.getElementById("remove-applied-filter");

const getMobileData = async () => {
  if (localStorage.getItem("filterData")) {
    var list = document.getElementById("card-data__mobile");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    filterData = JSON.parse(localStorage.getItem("filterData"));
    filterData.map((item, i) => {
      var d = document.createElement("div");
      d.setAttribute("id", "id_" + (i + 1));
      d.innerHTML = cardMobileText(
        i,
        item.name,
        item.image,
        item.price,
        item.discount
      );
      document.getElementById("card-data__mobile").appendChild(d);
    });
  }
  else if(JSON.parse(localStorage.getItem("sortData"))){
    var list = document.getElementById("card-data__mobile");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    sortData = JSON.parse(localStorage.getItem("sortData"));
    sortData.map((item, i) => {
      var d = document.createElement("div");
      d.setAttribute("id", "id_" + (i + 1));
      d.innerHTML = cardMobileText(
        i,
        item.name,
        item.image,
        item.price,
        item.discount
      );
      document.getElementById("card-data__mobile").appendChild(d);
    });

  }
   else {
    var list = document.getElementById("card-data__mobile");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    const res = await fetch("./data/data.json");
    const data = await res.json();
    tempData = data.items;
    data.items.map((item, i) => {
      var d = document.createElement("div");
      d.setAttribute("id", "id_" + (i + 1));
      d.innerHTML = cardMobileText(
        i,
        item.name,
        item.image,
        item.price,
        item.discount
      );
      document.getElementById("card-data__mobile").appendChild(d);
    });
  }

  let cartNumber = document.getElementById("num-of-items");
  cartNumber.innerHTML = localStorage.getItem("totalCartQuantity")
    ? localStorage.getItem("totalCartQuantity")
    : 0;
};
let openSortModalButton = document.getElementById("sort-modal-button");

let modalSort = document.getElementById("sort-modal-container");
let closeSortModalButton = document.getElementById("sort-modal-close");
var minValue = 9999;
var maxValue = 200000;
// openSortModalButton.onclick = function () {
//   modalSort.style.display = "block";
// };

// closeSortModalButton.onclick = function () {
//   modalSort.style.display = "none";
// };

let openFilterModalButton = document.getElementById("filter-modal-button");
let modalFilter = document.getElementById("filter-modal-container");
let closeFilterModalButton = document.getElementById("filter-modal-close");

// openFilterModalButton.onclick = function () {
//   modalFilter.style.display = "block";
// };

// closeFilterModalButton.onclick = function () {
//   modalFilter.style.display = "none";
// };

function getMinRange(event) {
  event.target.value = Math.min(
    event.target.value,
    event.target.parentNode.childNodes[5].value - 1
  );
  minValue = (event.target.value / parseInt(event.target.max)) * 100;
  console.log(Math.trunc(minValue), `minValue`);
  var children = event.target.parentNode.childNodes[1].childNodes;
  children[1].style.width = minValue + "%";
  children[5].style.left = minValue + "%";
  children[7].style.left = minValue + "%";
  children[11].style.left = minValue + "%";
  children[11].childNodes[1].innerHTML = event.target.value;
}

function getMaxRange(event) {
  event.target.value = Math.max(
    event.target.value,
    event.target.parentNode.childNodes[3].value - -1
  );
  maxValue = (event.target.value / parseInt(event.target.max)) * 100;
  console.log(Math.trunc(maxValue), `maxValue`);
  var children = event.target.parentNode.childNodes[1].childNodes;
  children[3].style.width = 100 - maxValue + "%";
  children[5].style.right = 100 - maxValue + "%";
  children[9].style.left = maxValue + "%";
  children[13].style.left = maxValue + "%";
  children[13].childNodes[1].innerHTML = event.target.value;
  // localStorage.setItem("filterMaxRange",maxValue)
}
function showCartItem() {
  console.log("here")
  
  cartItemData = JSON.parse(localStorage.getItem("mobileCartData"));
  cartItemData.map((item, i) => {
    var d1 = document.createElement('div');
    d1.setAttribute("id", "id_" + (i + 1));
    d1.innerHTML = cartDataMobile(item.id, item.name, item.image, item.quantity, item.discountedPrice, item.rate)
    document.getElementById("card__mobile").appendChild(d1);
    totalCartQuantity=JSON.parse(localStorage.getItem("totalCartQuantity"))
    
  })


}
const increaseQuantity = (id) => {
  console.log("cartItemData", id)
  
  cartItemData.map((item) => {
    if (item.id === id) {
      item.quantity += 1
    }
    
  })
  localStorage.setItem('mobileCartData', JSON.stringify(cartItemData))
  
}
const decreaseQuantity = (id) => {
  console.log("cartItemData", id)
  cartItemData.map((item) => {
    if (item.id === id) {
      item.quantity -= 1
    }
  })
  localStorage.setItem('mobileCartData', JSON.stringify(cartItemData))

  
}
const cartDataMobile = (index, name, image, quantity, discount, price) => {
  var totalDiscount = quantity * discount;
  var totalPrice = quantity * price;
  var tempQuantity = quantity;
  var id = JSON.stringify(index);
  var tempName = JSON.stringify(name);
  var price_actual = JSON.stringify(price.actual)
  var price_display = JSON.stringify(price.display)
  return (
    ' <div class="cart-card__mobile">' +
    '<div class="cart-card-body__mobile">' +
    '<h2 class="item-name__mobile">' + name + '</h2>' +
    '<div class="item-price__mobile">' +
    ' <h3 class="item-discount-price__mobile">$' + totalDiscount + '</h3>' +
    '<p class="item-actual-price__mobile">$' + totalPrice + '</p>' +
    '</div>' +

    '<div class="item-price__mobile">' +
    '<button class="item-quan-btn__mobile" onclick=\'increaseQuantity(' + id + ') \'>' +
    '+' + '</button>' +
    '<p class="item-quantity__mobile" id="item-quantity__mobile">' + quantity + '</p>' +
    '<button class="item-quan-btn__mobile"onclick=\'decreaseQuantity(' + id + ') \'>' + '-' + '</button>' +
    '</div>' +
    '</div>' +

    '<div class="card-img__mobile">' +
    '<img src="https://place-hold.it/200" alt="" />' +
    '</div>' +
    '</div>')
}


function filterApply() {
  removeSort();
  if (!localStorage.getItem("filterData")) {
    tempData.map((item, i) => {
      console.log(
        "item.price.display",
        item.price.display,
        typeof item.price.display
      );
      if (
        i > 0 &&
        item.price.display >= minValue &&
        item.price.display <= maxValue
      ) {
        filterData.push(item);
      }
    });
    localStorage.setItem("filterData", JSON.stringify(filterData));
    removeFilterIcon.style.display = "flex";
  }

  //need to update local storage data when user changes the range

  console.log("tempData", tempData.length);

  getMobileData();

  modalFilter.style.display = "none";
}
function removeFilter() {
  if (localStorage.getItem("filterData")) {
    filterData = [];
    localStorage.removeItem("filterData");
    getMobileData();
  }
  removeFilterIcon.style.display = "none";
}

const addMobileDataToCart = (name, actualPrice, id, type, discountedPrice) => {
  var mobileCartData = [];
  let totalCartQuantity = 0;
  // cartNumber.innerHTML = localStorage.getItem("");

  if (localStorage.getItem("mobileCartData")) {
    mobileCartData = JSON.parse(localStorage.getItem("mobileCartData"));
    var flag = 0;
    var temp;

    mobileCartData.map((item, i) => {
      if (item.id === id) {
        temp = item;
        flag = 1; // using this flag to check, if the current cart is exsists or not.
        return;
      }
    });

    var ind = -1;
    if (flag) {
      // if current data exists.
      if (type == 1) {
        // type 1, is used to add the data in cart
        temp.quantity = temp.quantity + 1;
        totalCartQuantity = Number(localStorage.getItem("totalCartQuantity"));
        console.log("abc", Number(localStorage.getItem("totalCartQuantity")));
        totalCartQuantity = totalCartQuantity + 1;
        localStorage.setItem("totalCartQuantity", totalCartQuantity);
      } else {
        // type 0, is used to remove the data from the cart.
        if (temp.quantity - 1 > 0) {
          temp.quantity = temp.quantity - 1;
        } else {
          temp.quantity = temp.quantity - 1;
          // 0 case ->
          // ind = item.id;
          ind = mobileCartData.indexOf(temp);
        }

        if (ind == -1) {
          temp.totalAmount = temp.quantity * temp.rate;
          mobileCartData.map((item) => {
            if (item.id === temp.id) {
              item.quantity = temp.quantity;
              item.totalAmount = temp.totalAmount;
            }
          });
        } else {
          // remove the current object, which has quantity as 0.
          mobileCartData.splice(ind, 1);
        }

        totalCartQuantity = Number(localStorage.getItem("totalCartQuantity"));
        totalCartQuantity = totalCartQuantity - 1;
        localStorage.setItem("totalCartQuantity", totalCartQuantity);
      }
    } else {
      // current card data does not exists, need to add new data.
      var obj = {
        id: id,
        name: name,
        quantity: 1,
        rate: actualPrice,
        totalAmount: actualPrice,
        discountedPrice: discountedPrice,
      };

      totalCartQuantity = Number(localStorage.getItem("totalCartQuantity"));
      totalCartQuantity = totalCartQuantity + 1;
      localStorage.setItem("totalCartQuantity", totalCartQuantity);

      mobileCartData.push(obj);
    }
    localStorage.setItem("mobileCartData", JSON.stringify(mobileCartData));
  } else {
    var obj = {
      id: id,
      name: name,
      quantity: 1,
      rate: actualPrice,
      totalAmount: actualPrice,
      discountedPrice: discountedPrice,
    };

    totalCartQuantity = 1;
    localStorage.setItem("totalCartQuantity", totalCartQuantity);

    mobileCartData.push(obj);
    localStorage.setItem("mobileCartData", JSON.stringify(mobileCartData));
  }

  let cartNumber = document.getElementById("num-of-items");
  cartNumber.innerHTML = localStorage.getItem("totalCartQuantity")
    ? localStorage.getItem("totalCartQuantity")
    : 0;

  table();
  totalBill();
};

const cardMobileText = (i, name, image, price, discount) => {
  var tempId = "id_" + (i + 1);
  var id = JSON.stringify(tempId);
  var name = JSON.stringify(name);
  var price_actual = JSON.stringify(price.actual);
  var price_display = JSON.stringify(price.display);
  return (
    '<div class="card__mobile">' +
    '<div class="card-body__mobile">' +
    '<div class="card-img__mobile">' +
    '<img src="https://place-hold.it/200" alt="" />' +
    "</div>" +
    "</div>" +
    '<div class="card-footer__mobile">' +
    '<p class="item-name__mobile">' +
    name.replaceAll('"', '') +
    "</p>" +
    '<div class="item-details__mobile">' +
    '<div class="item-price__mobile">' +
    '<p class="item-discount-price__mobile">$ ' +
    price.display +
    "</p>" +
    '<p class="item-actual-price__mobile">$' +
    price.actual +
    "</p>" +
    '<p class="item-actual-discount__mobile">' +
    discount +
    "% off</p>" +
    "</div>" +
    '<div class="item-add-to-card__mobile">' +
    '<button id="${name}" onclick=\'addMobileDataToCart(' +
    name +
    "," +
    price_display +
    "," +
    id +
    "," +
    "1" +
    "," +
    price_actual +
    ") '>" +
    "Add to cart" +
    "</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
};

function sortAscending(a, b) {
  return a.price.display - b.price.display;
}

function sortDescending(a, b) {
  return b.price.display - a.price.display;
}

function sortDiscount(a, b) {
  return b.discount - a.discount;
}

function sortOptions() {
  //clear sorting button
  //delete local data while clearning
  removeFilter()

  var sortValue = document.querySelector('input[name="sorting"]:checked').value;

  if (!localStorage.getItem("sortData")) {
    tempData.map((item, i) => {
      console.log(
        "item.price.display",
        item.price.display,
        typeof item.price.display
      );
      sortData.push(item);
    });

    // removeFilterIcon.style.display = "flex";
  } else {
    sortData = JSON.parse(localStorage.getItem("sortData"));
  }
  if (sortValue == "lowhigh") {
    sortData.sort(sortAscending);
  }

  if (sortValue == "highlow") {
    sortData.sort(sortDescending);
  }

  if (sortValue == "discount") {
    sortData.sort(sortDiscount);
  }
  localStorage.setItem("sortData", JSON.stringify(sortData));

  console.log(sortData);

  modalSort.style.display = "none";

  getMobileData();
}

function removeSort() {
  if (localStorage.getItem("sortData")) {
    sortData = [];
    localStorage.removeItem("sortData");
    getMobileData();
  }
  // removeFilterIcon.style.display = "none";
}

getMobileData();
showCartItem();
