
const addToCart = (name) => {

    var cartDataValues = localStorage.getItem('cartData');

    if (cartDataValues) {
        // present
        localStorage.setItem('cartData', cartData);
        
    }
    else {
        //not present
        cartData = {
            "id_1": {
                "name": "LED",
                "quantity": 2,
                "rate": 20,
                "price": 40
            }
        }

        localStorage.setItem('cartData', cartData);
        
    }
    
    console.log("Event -> ", name);
}

const getData = async () => {
    const res = await fetch('./data/data.json')
    const data = await res.json()

    data.items.map((item, i) => {
        var d = document.createElement('div');
        d.setAttribute("id", "id_" + (i + 1));
        d.innerHTML = cardText(item.name, item.image, item.price, item.discount)
        document.getElementById("card-data").appendChild(d);
    })
}

const cardText = (name, image, price, discount) => {

    return (`
    <div class="card">
        <div class="card-body">
            <div class="d-flex my-2">
            <p class="item-offer">${discount}% Off</p>
            <div class="item-img">
                <img
                src="https://place-hold.it/200"
                alt=""
                height="150px"
                width="150px"
                />
            </div>
            </div>
        </div>

        <div class="card-footer">
            <p class="item-name">${name}</p>
            <div class="item-details">
            <div class="item-price">
                <p class="item-actual-price">$ ${price.actual}</p>
                <p class="item-discount-price">$ ${price.display}</p>
            </div>
            <button class="item-add-to-card"  onclick=addToCart('name11') >Add to cart</button>
            </div>
        </div>
    </div>
`)
}

getData()