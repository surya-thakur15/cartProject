
const addToCart = (name,actualPrice,id,type) => {
    var cartData=[]
   if(localStorage.getItem('cartData')){
       console.log("here")
        cartData = JSON.parse(localStorage.getItem('cartData'));
        // console.log("localCartData",localCartData)
        var flag=0;
        var temp;
        cartData.map((item)=>{
            if(item.id===id){
                temp=item
                console.log("temp",temp);
                flag=1;
                return;
                
            }
        })
        if(flag){
            if(type==1){
                temp.quantity=temp.quantity+1;
            }
            else{
                temp.quantity=temp.quantity-1>=0?temp.quantity-1:temp.quantity;
            }
            temp.totalAmount = temp.quantity*temp.rate;
            cartData.map((item)=>{
                if(item.id===temp.id){
                    item.quantity=temp.quantity
                    item.totalAmount=temp.totalAmount
                }
                
            })
        }
        else{         
        var obj={
            'id':id,
            'name':name,
            'quantity':1,
            'rate':actualPrice,
            'totalAmount':actualPrice
            }
            cartData.push(obj)
        }

        localStorage.setItem('cartData', JSON.stringify(cartData));
        // console.log("getData",JSON.parse(localStorage.getItem('cartData')))
   }
    else {
        var obj={
            'id':id,
            'name':name,
            'quantity':1,
            'rate':actualPrice,
            'totalAmount':actualPrice
        }
        cartData.push(obj)
        
        //not present
        // cartData = {
        //     "id_1": {
        //         "name": "LED",
        //         "quantity": 2,
        //         "rate": 20,
        //         "price": 40
        //     }
        // }
        localStorage.setItem('cartData', JSON.stringify(cartData));
        // console.log("getData",JSON.parse(localStorage.getItem('cartData')))

        
    }
    var cartDataValues = localStorage.getItem('cartData');
    console.log("Event -> ", name,actualPrice,id);
    table();
}

const getData = async () => {
    
    const res = await fetch('./data/data.json')
    const data = await res.json()

    data.items.map((item, i) => {
        var d = document.createElement('div');
        d.setAttribute("id", "id_" + (i + 1));
        d.innerHTML = cardText(i,item.name, item.image, item.price, item.discount)
        document.getElementById("card-data").appendChild(d);
    })
    table();
}
const table=()=>{
//     <div class="row" style="margin-top: 10px;">
//     <div class="item-card">Items2 x</div>
//     <div class="item-card">- 1</div>
//     <div class="item-card">$20</div>
//   </div>
//   <div class="row" style="margin-bottom: 10px;">
//     <div class="item-card">Items2 x</div>
//     <div class="item-card">- 1</div>
//     <div class="item-card">$20</div>
//   </div>
    var data=JSON.parse(localStorage.getItem('cartData'));
    var list=document.getElementById("item_data");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
}
    data.map((item,i)=>{
        var d = document.createElement('div');
        var d1 = document.createElement('div');
        var d2 = document.createElement('div');
        var d3 = document.createElement('div');
        var btn = document.createElement('BUTTON');
        var btn2 = document.createElement('BUTTON');
        
        // d.setAttribute("id", "id_" + (i + 1));
        d.setAttribute("class","row")
        // d.setAttribute("id", "id_item_" + (i + 1));
        d1.innerHTML = item.name
        d1.setAttribute("class","item-card")
        d2.innerHTML = item.quantity
        
        d2.setAttribute("class","item-card")
        d3.innerHTML = item.totalAmount
        d3.setAttribute("class","item-card")
        btn.innerHTML='+'
        btn2.innerHTML='-'
        // btn.addEventListener('click',func())
        btn.onclick = function(){
            return addToCart(item.name,item.totalAmount,item.id,'1');
          };
          btn2.onclick = function(){
            return addToCart(item.name,item.totalAmount,item.id,'0');
          };
        d.appendChild(d1);
        d.appendChild(btn);
        
        d.appendChild(d2);
        d.appendChild(btn2);
        d.appendChild(d3);

        document.getElementById("item_data").appendChild(d);
        
    })
    console.log("getData",JSON.parse(localStorage.getItem('cartData')))
}
const  func=()=>{
    console.log("here")
}
const cardText = (i,name, image, price, discount) => {
    console.log(typeof name)
    var tempId= 'id_'+(i+1)
    var id = JSON.stringify(tempId);
    var  name=JSON.stringify(name);
    var price_actual = JSON.stringify(price.actual)
    return (
        
    '<div class="card"><div class="card-body"><div class="d-flex my-2"><p class="item-offer">'+discount+'% Off</p>'+
    '<div class="item-img"><img src="https://place-hold.it/200" alt="" height="150px" width="150px"/></div></div></div>'+
'<div class="card-footer"><p class="item-name">'+name+'</p><div class="item-details"><div class="item-price">'+
                '<p class="item-actual-price">$'+price.actual+'</p><p class="item-discount-price">$' +price.display+'</p></div>'+
            '<button class="item-add-to-card" onclick=\'addToCart(' + name +','+price_actual+','+id+','+'1' +') \'>' + 'Add to cart' + '</button>' +
           ' </div>'+
        '</div>'+
    '</div>'
)
}

getData()