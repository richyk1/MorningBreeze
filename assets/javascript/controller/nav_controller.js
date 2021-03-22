function occupyTableOnClick() {
    const tableNumber = Number($(this).text().trim());
    db.currentUser.occupiedTable = tableNumber;
    present.occupyTable();
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() // Det behövs två system parentElement för att ta bort hela objektet

    if ($('.cart-item').length == 0) present.hideTotalPrice();
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
    const selectedBeverage = db.loadBeverageByName(productNameBold);

    present.addItem(selectedBeverage);

    /*  Lägger till funktionalitet till removeknappen som finns med i HTML-koden för
        varje objekt i kassan. Samt funktionalitet så att man kan ändra på kvantiteten. */
    $('.remove-item').last().on('click', removeCartItem)
    $('.quantity').last().on('keypress click change', newQuantity)

    cartTotal();
}

function cartTotal() {
    var total = 0
    $('.cart-item').each(function () {
        const price = parseFloat($(this).children('.cart-price').text())
        const quantity = $(this).children('.cart-quantity').children('.quantity').val();
        total = total + (price * quantity)
    });

    // Detta skyddar oss från att få en massa onödiga decimaler
    total = Math.round(total * 100) / 100;

    present.updateTotalPrice();
}

function menu() {
    /**
     * @const
     * @type {Beverage[]} 
     */
    const beverages = db.beverages;

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
                    <img class="beverage-image" src='${beverage.imageUrl}_100.png' draggable="true"></img>
                </div>
            </div>`;

        present.appendBeverage.call(beverageDOM);
    });

    present.showMenu();

    /*
        Vi lägger till en addEventListener till alla knappar som använder sig av
        classen addToCartButton.
    */
    $('.beverage-to-list').on('click', addToCart);
    $('.beverage-image').on('dragstart', drag);
}

function buttonOnClick(event) {
    switch (event.data.button) {
        case "menu":
            menu();
            break;
        case "login-vip":
            present.showLogin();
            break;
        case "login-guest":
            menu();
            break;
        default:
            break;
    }
}

jQuery(function () {
    $('button#menu').on('click', {
        button: "menu"
    }, buttonOnClick);
    $('button.login-vip').on('click', {
        button: "login-vip"
    }, buttonOnClick);
    $('button#login-guest').on('click', {
        button: "login-guest"
    }, buttonOnClick);
    $('div#tint').on('click', present.untint);
    $('button#button-home').on('click', present.home);
    $('#cart-items').on('drop', drop);
    $('#cart-items').on('dragover', allowDrop);
    $('.table-button').each(function () {
        const rand = Math.round(Math.random());
        if (rand) {
            present.toggleColor.call(this, rand);
            $(this).parent().on('click', occupyTableOnClick);
        } else {
            present.toggleColor.call(this, rand);
        }
    });
});