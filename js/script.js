const getData = async () => {
    const res = await fetch('data.json')
    const data = await res.json()

    data.items.map((item, i) => {
        console.log("item", item.name);
        var d = document.createElement('div');
        d.setAttribute("id", "id_" + (i + 1));
        d.innerHTML = cardText(item.name, item.image, item.price, item.discount)
        console.log("item", d);

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
            <button class="item-add-to-card">Add to cart</button>
            </div>
        </div>
    </div>
`)
}

getData()