/**
 * 
 */
function sendHome() {
    window.location.href = "index.html";
}


var dutchman_bar_payments = [];

function untint() {
    $("div#login-window").animate({
        opacity: 0,
    }, 200, function () {
        // Animation complete. Show login window

        $('div#login-window').css("display", "none");
    });

    $("div#tint").animate({
        opacity: 0,
    }, 200, function () {
        // Animation complete. Show login window

    });
}

/**
 * Shows the login box
 */
function show_login(privilageLevel) {
    $('div#login-window').css("display", "flex");
    $("div#login-window").animate({
        opacity: 1,
    }, 200, function () {
        // Animation complete. Show login window
        document.getElementById('username').focus();
    });


    $("div#tint").animate({
        opacity: 0.5,
    }, 200, function () {
        // Animation complete. Show login window

    });
}

// Controller-view relationship

function menuOnClick(event) {
        /**
         * @const
         * @type {Beverage[]} 
         */
        const beverages = event.data.beverages;

        beverages.forEach(function (beverage) {
            const beverageDOM = `
            <div class="beverage">
                <div class='beverage-info'>
                    <div class='beverage-header'>
                        <h2>${beverage.productNameBold}</h2>
                        <h4>${beverage.productNameThin}</h4>
                        <hr>
                    </div>
                    <div class='beverage-main-content'> 
                        <p>${beverage.taste}</p>
                        <p>${beverage.usage}</p>
                    </div>
                    <div class='beverage-footer'> 
                        <span class='beverage-country-icon'> 
                            <img src='assets/images/flags/${beverage.country}.svg'></img>
                        </span> 
                        <span class='beverage-country-name'> 
                            ${beverage.country}
                        </span> 
                        <span class='beverage-price'> 
                            ${beverage.price}:-
                        </span> 
                        <button class='beverage-to-list'>
                                <img src='assets/images/add-circle-outline.svg'></img>
                        </button>
                    </div>
                </div>
                <div class='beverage-image-wrapper'> 
                    <img class="beverage-image" src='${beverage.imageUrl}_100.png'></img>
                </div>
            </div>`;
            
            $('div#all-beverages').append(beverageDOM);
        });

        $('div#all-beverages').css("display", "grid");
        $(this).css("display", "none");

        /*
            Vi lägger till en addEventListener till alla knappar som använder sig av
            classen addToCartButton.
        */
        $('.beverage-to-list').on('click', addToCart);  
};

function occupyTableOnClick() {
    const tableNumber = Number($(this).text().trim());
    db.setCacheTable(tableNumber);
    $('div#table-window').css("display", "none");
    $('button#menu').css("display", "grid");
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() // Det behövs två system parentElement för att ta bort hela objektet

    if($('.cart-item').length == 0) $('span#total-price').css("display", "none");
    cartTotal();
}

function newQuantity(event) {
    var input = event.target
    if (input.value < 1) {
        input.parentElement.parentElement.remove()
    }
    cartTotal();
}

function addToCart() {
    const productNameBold = $(this).parent().parent().children('div.beverage-header').children('h2').text()
    const beverageObject = db.loadBeverageByName(productNameBold);

    /*
        Vi ger HTML kod till varje objekt som finns med på vår cart.
        På så vis skriver vi ut den rätta titeln, priset, håller koll på
        kvantiteten samt att vi lägger till en remove-knapp.
    */
    var cartContent = `
        <div class="cart-item">
            <div class="cart-column">
                <span class="cart-item-title">${beverageObject.productNameBold}</span>
            </div>
            <span class="cart-price cart-column">${beverageObject.price}</span>
            <div class="cart-quantity cart-column">
                <input class="quantity" type="number" value="1">
                <button class="btn remove-item" type="button">REMOVE</button>
            </div>
        </div>`

    $('span#total-price').css("display", "block");
    // Lägger till cartItem bland de alla cartItems som vi har.
    $('div#cart-items').append(cartContent);


    /*  Lägger till funktionalitet till removeknappen som finns med i HTML-koden för
        varje objekt i kassan. Samt funktionalitet så att man kan ändra på kvantiteten. */
    $('.remove-item').last().on('click', removeCartItem)
    $('.quantity').last().on('keypress click change', newQuantity)


    cartTotal();
}

function cartTotal() {
    var total = 0
    $('.cart-item').each(function(index, item) {
        var price = parseFloat($(this).children('.cart-price').text())
        var quantity = $(this).children('.cart-quantity').children('.quantity').val();
        total = total + (price * quantity)
    });

    // Detta skyddar oss från att få en massa onödiga decimaler
    total = Math.round(total * 100) / 100;
    console.log(total);

    $('span#total-price').text(total + " kr");
    return total;
}

function checkout(event) {
    var totalInCart = parseInt(cartTotal());
    console.log(totalInCart);
    var transaction_id = (dutchman_bar_payments.length) + 1;
    var admin_id = 2;
    dutchman_bar_payments.push({"Amount" : totalInCart ,
    "Transaction_id" : transaction_id , 
    "Admin_id" : admin_id});
    console.log(dutchman_bar_payments);
    $('.cart-item').each(function(index, item) {
        var name = $(this).children('.cart-name').text();
        var quantity = $(this).children('.cart-quantity').children('.quantity').val();
        //add_or_remove_qt_in_stock(name , quantity); TODO: Funkar ej pga stock inte i main branch
        $(this).remove();
    });

}


jQuery(function () {
    $('button#menu').on('click', { beverages: db.beverages }, menuOnClick);
    $('button#order').on('click', checkout);
    $('.table-button').each(function(index) {
        const rand = Math.round(Math.random());
        if(rand) {
            $(this).css("background-color", "#68a26a").parent().addClass("table-available");
            $(this).parent().on('click', occupyTableOnClick);
        } else {
            $(this).css("background-color", "#cb5e56"); 
        }
    });
});