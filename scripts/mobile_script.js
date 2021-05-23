const getMobileData = async () => {
    const res = await fetch('./data/data.json')
    const data = await res.json()
    data.items.map((item, i) => {
        var d = document.createElement('div');
        d.setAttribute("id", "id_" + (i + 1));
        d.innerHTML = cardMobileText(i, item.name, item.image, item.price, item.discount)
        document.getElementById("card-data__mobile").appendChild(d);
    })
    // table();
    // totalBill();
}

const cardMobileText = (i, name, image, price, discount) => {
    // var tempId = 'id_' + (i + 1)
    // var id = JSON.stringify(tempId);
    // var name = JSON.stringify(name);
    // var price_actual = JSON.stringify(price.actual)
    // var price_display = JSON.stringify(price.display)
    return (`
        <div class="card__mobile">
          <div class="card-body__mobile">
            <div class="card-img__mobile">
              <img src="https://place-hold.it/200" alt="" />
            </div>
          </div>

          <div class="card-footer__mobile">
            <p class="item-name__mobile">${name}</p>
            <div class="item-details__mobile">
              <div class="item-price__mobile">
                <p class="item-discount-price__mobile">$ ${price.display}</p>
                <p class="item-actual-price__mobile">${price.actual}</p>
                <p class="item-actual-discount__mobile">${discount} % off</p>
              </div>
              <div class="item-add-to-card__mobile">
                <button id="${name}" onclick=func(event)>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
    `)
}

getMobileData()