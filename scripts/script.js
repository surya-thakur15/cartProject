
const addToCart = (name, actualPrice, id, type,discountedPrice) => {
  var cartData = []
  if (localStorage.getItem('cartData')) {
    cartData = JSON.parse(localStorage.getItem('cartData'));
    var flag = 0;
    var temp;

    cartData.map((item, i) => {
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
          ind = cartData.indexOf(temp);
        }
      }

      if (ind == -1) {
        temp.totalAmount = temp.quantity * temp.rate;
        
        cartData.map((item) => {
          if (item.id === temp.id) {
            item.quantity = temp.quantity
            item.totalAmount = temp.totalAmount
            
          }
        })
      }
      else {
        // remove the current object, which has quantity as 0. 
        cartData.splice(ind, 1);
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
      cartData.push(obj)
    }
    localStorage.setItem('cartData', JSON.stringify(cartData));
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
    cartData.push(obj)
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }
  table();
  totalBill();
  
}

const totalBill = () => {
  let totalData = JSON.parse(localStorage.getItem('cartData'));
  let totalSum = 0;
  let totalQuantity = 0;
  let totalDiscount =0;
  let discountedPrice =0;
  if (totalData && totalData.length > 0) {
    totalData.map(item => {
      totalQuantity = totalQuantity + Number(item.quantity);
      totalSum = totalSum + Number(item.totalAmount);
      discountedPrice = discountedPrice + Number(item.discountedPrice) * item.quantity;

    })
  }
  console.log("discountedPrice", discountedPrice);
  totalDiscount = totalSum - discountedPrice;

  let totalQ = document.getElementById("order-total-quantity");
  let totalD = document.getElementById("order-total-discount");
  let totalA = document.getElementById("order-total-amount");
  let totalO = document.getElementById("order-total");
  totalQ.innerHTML = totalQuantity;
  totalA.innerHTML = totalSum;
  totalD.innerHTML = "-"+totalDiscount;
  totalO.innerHTML = discountedPrice;
  console.log("total sum & quantity", totalSum, " - ", totalDiscount, "..", discountedPrice);

}

const getData = async () => {
  const res = await fetch('./data/data.json')
  const data = await res.json()
  data.items.map((item, i) => {
    var d = document.createElement('div');
    d.setAttribute("id", "id_" + (i + 1));
    d.innerHTML = cardText(i, item.name, item.image, item.price, item.discount)
    document.getElementById("card-data").appendChild(d);
  })
  table();
  totalBill();
}


const table = () => {
  var data = JSON.parse(localStorage.getItem('cartData'));
  var list = document.getElementById("item_data");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (data && data.length > 0) {
    data.map((item, i) => {
      var d = document.createElement('div');
      var d1 = document.createElement('div');
      var d2 = document.createElement('div');
      var d3 = document.createElement('div');
      var btn = document.createElement('BUTTON');
      var btn2 = document.createElement('BUTTON');

      d.setAttribute("class", "row")
      d1.innerHTML = item.name
      d1.setAttribute("class", "item-card")
      d2.innerHTML = item.quantity
      d2.setAttribute("class", "item-card")
      d3.innerHTML = item.totalAmount
      d3.setAttribute("class", "item-card")
      btn.innerHTML = '+'
      btn2.innerHTML = '-'
      btn.onclick = function () {
        return addToCart(item.name, item.totalAmount, item.id, '1');
      };
      btn2.onclick = function () {
        return addToCart(item.name, item.totalAmount, item.id, '0');
      };
      d.appendChild(d1);
      d.appendChild(btn);
      d.appendChild(d2);
      d.appendChild(btn2);
      d.appendChild(d3);
      document.getElementById("item_data").appendChild(d);
    })
  }
}

const cardText = (i, name, image, price, discount) => {
  var tempId = 'id_' + (i + 1)
  var id = JSON.stringify(tempId);
  var name = JSON.stringify(name);
  var price_actual = JSON.stringify(price.actual)
  var price_display = JSON.stringify(price.display)
  return (
    '<div class="card"><div class="card-body"><div class="d-flex my-2"><p class="item-offer">' + discount + '% Off</p>' +
    '<div class="item-img"><img src="https://place-hold.it/200" alt="" height="150px" width="150px"/></div></div></div>' +
    '<div class="card-footer"><p class="item-name">' + name.replaceAll('"', '') + '</p><div class="item-details"><div class="item-price">' +
    '<p class="item-actual-price">$' + price.display + '</p><p class="item-discount-price">$' +  price.actual+ '</p></div>' +
    '<button class="item-add-to-card" onclick=\'addToCart(' + name + ',' +price_display  + ',' + id + ',' + '1' +','+price_actual+ ') \'>' + 'Add to cart' + '</button>' +
    ' </div>' +
    '</div>' +
    '</div>'
  )
}

getData()