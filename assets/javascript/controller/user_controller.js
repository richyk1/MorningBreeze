/**
 * Simple hashing function for hashing passwords.
 * @see https://stackoverflow.com/a/8831937
 * @returns {number} Hashed string.
 */
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}


/**
 * Handles the login-process.
 * @returns {boolean} A boolean indicating if the login process succeeded or if it didn't.
 */
async function login_handler(event) {

    event.preventDefault();
    const userInfo = db.getUser($('#username').val());
    const enteredPassword = await digestMessage($('#password').val());

    if (userInfo == undefined) {
        show_incorrect();
    } else if (userInfo.password != enteredPassword) {
        show_incorrect();
    } else if (userInfo.password == enteredPassword) {
        show_correct(userInfo);
    }
}

function show_incorrect() {
    $('#error_msg').css("display", "block");
}

function show_vip_customer() {
    $('main').children().each(function (index) {
        $(this).css("display", "none");
    })

    db.getCurrentUser().UpdateBalance();
    $('#vip-customer').css("display", "grid");
}

/**
 * 
 * @param {User} user User object containing information about the current user.
 */
function show_correct(user) {
    db.setCurrentUser(user);
    switch (user.credentials) {
        case ACCESS_LEVELS.VIP:
            $('#login-window').css("display", "none");
            show_vip_customer();
            break;
        default:
            window.location.href = "index.html"
            break;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";

}

function drag(event) {
    const beverage = db.loadBeverageByName($(this).parents('.beverage').children('.beverage-info').children('.beverage-header').children('h2').text());
    event.dataTransfer.setData('text/plain', beverage.productNameBold);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");


    const beverageObject = db.loadBeverageByName(data);

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

jQuery(function () {
    $('form').on('submit', login_handler);
    $('.btn.toggle').on('click', function () {
        db.getCurrentUser().PayFromAccount();
    });
    $('button.logout').on('click', function () {
        db.getCurrentUser().Logout();
    });


    $.event.addProp('dataTransfer');

});