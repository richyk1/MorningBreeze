  //  Vi startar hela processen genom funktionsanropet start()
start()

/*
    Funktionen start hanterar de olika knapparna och kopplar en
    EventListener till dem så att de fungerar som de ska.
*/
function start() {

    // Remove knappen
    var removeButton = document.getElementsByClassName('remove-item')
    for (var i = 0; i < removeButton.length; i++) {
        var button = removeButton[i]
        button.addEventListener('click', removeCartItem)
    }

    /*
        Vi lägger till en addEventListener till alla knappar som använder sig av
        classen addToCartButton.
    */
    var quantity = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantity.length; i++) {
        var input = quantity[i]
        input.addEventListener('change', newQuantity)
    }
    
    /*
        Vi lägger till en addEventListener till alla knappar som använder sig av
        classen addToCartButton.
    */
    var addToCartButtons = document.getElementsByClassName('addToCartButton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCart)
    }
    
    var ord = document.getElementsByClassName('orderButton')
}


function orderAction(){
    
}


function addToCart(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText

    itemToCart(title, price)
    cartTotal()
}

function itemToCart(title, price, id) {
    var cartItem = document.createElement('div')
    cartItem.classList.add('numberInCart')
    var cartItems = document.getElementsByClassName('cartItems')[0]
 
    /*
        Vi ger HTML kod till varje objekt som finns med på vår cart.
        På så vis skriver vi ut den rätta titeln, priset, håller koll på
        kvantiteten samt att vi lägger till en remove-knapp.
    */
    var cartContent = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input id="cart-input-${id}" class="quantity" type="number" value="1">
            <button class="btn remove-item" type="button">REMOVE</button>
        </div>`
    cartItem.innerHTML = cartContent
    // Lägger till cartItem bland de alla cartItems som vi har.
    cartItems.append(cartItem)

    /*  Lägger till funktionalitet till removeknappen som finns med i HTML-koden för
        varje objekt i kassan. Samt funktionalitet så att man kan ändra på kvantiteten. */
    cartItem.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
    cartItem.getElementsByClassName('quantity')[0].addEventListener('change', newQuantity)
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() // Det behövs två system parentElement för att ta bort hela objektet
    cartTotal()
}

function newQuantity(event) {
    var input = event.target
    if (input.value < 1) {
        input.parentElement.parentElement.remove()
    }
    cartTotal()
}


function cartTotal() {
    var cartItems = document.getElementsByClassName('cartItems')[0].getElementsByClassName('numberInCart')
    var total = 0

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]
        var price = parseFloat(cartItem.getElementsByClassName('cart-price')[0].innerText)
        var quantity = cartItem.getElementsByClassName('quantity')[0].value
        total = total + (price * quantity)
    }
    
    // Detta skyddar oss från att få en massa onödiga decimaler
    total = Math.round(total * 100) / 100
    
    document.getElementsByClassName('totalPrice')[0].innerText = total + " kr"
}