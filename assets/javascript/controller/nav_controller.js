class Presenter {
    constructor() {
        this.showCombinationLock = function () {
            $('div#combo-lock').css('display', 'flex');
            $('div#focus-window').css("display", "flex");
            $("div#focus-window").animate({
                opacity: 1,
            }, 200, function () {
                // Animation complete. Show combinationlock window
            });

            $("div#tint").animate({
                opacity: 0.5,
            }, 200, function () {

            });
        }

        this.showLogin = function () {
            $('div#focus-window form').css("display", "flex");
            $('div#focus-window').css("display", "flex");
            $("div#focus-window").animate({
                opacity: 1,
            }, 200, function () {
                // Animation complete. Show login window
                document.getElementById('username').focus();
            });

            $("div#tint").animate({
                opacity: 0.5,
            }, 200, function () {

            });
        }

        this.untint = function () {
            $("div#focus-window").animate({
                opacity: 0,
            }, 200, function () {
                $('div#focus-window').css("display", "none");
                $('div#combo-lock').css('display', 'none');
                $('div#focus-window form').css("display", "none");
            });

            $("div#tint").animate({
                opacity: 0,
            }, 200, function () {
                // Animation complete. Show login window
            });
        }

        this.appendBeverage = function () {
            $('div#all-beverages').append(this);
        }

        this.showMenu = function () {
            $('div#all-beverages').css("display", "grid");
            $('button.login-vip').css("display", "none");
            $('button#login-guest').css("display", "none");
        };

        this.occupyTable = function () {
            $('div#table-window').css("display", "none");
            $('div.dropdown').css("display", "none");
            $('button.login-vip').css("display", "grid");
            $('button.btn.login-vip').css("display", "block");
            $('button#login-guest').css("display", "grid");
            $('h1#current-user-table').text('Your table: ' + db.currentUser.occupiedTable);
        }

        this.home = function () {
            window.location.href = 'index.html'
        }

        this.totalPrice = function () {
            $('span#total-price').text(total + " kr");
        }

        this.addItem = function (selectedBeverage) {
            /*
                Vi ger HTML kod till varje objekt som finns med på vår cart.
                På så vis skriver vi ut den rätta titeln, priset, håller koll på
                kvantiteten samt att vi lägger till en remove-knapp.
            */
            var cartContent = `
            <div class="cart-item">
                <div class="cart-column">
                    <span class="cart-item-title">${selectedBeverage.productNameBold}</span>
                </div>
                <span class="cart-price cart-column">${selectedBeverage.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="quantity" type="number" value="1">
                    <button class="btn remove-item" type="button">REMOVE</button>
                </div>
            </div>`

            $('span#total-price').css("display", "block");
            // Lägger till cartItem bland de alla cartItems som vi har.

            $('div#cart-items').append(cartContent);
        }

        this.hideTotalPrice = function () {
            $('span#total-price').css("display", "none");
        }

        this.toggleColor = function (rand) {
            if (rand) {
                $(this).css("background-color", "#68a26a").parent().addClass("table-available");
            } else {
                $(this).css("background-color", "#cb5e56");
            }
        }

        this.showIncorrect = function () {
            $('#error_msg').css("display", "block");
        }

        this.showCorrect = function () {
            $('h1#current-user-privilage').text(privilageToString(db.currentUser.credentials));
            $('#focus-window').css("display", "none");
            $('div#combo-lock').css('display', 'none');
            $('div#focus-window form').css("display", "none");
            $('div#table-window').css("display", "none");
            switch (db.currentUser.credentials) {
                case ACCESS_LEVELS.VIP:
                    this.showVipCustomer();
                    break;
                case ACCESS_LEVELS.BARTENDER:
                    this.showBartender();
                    break;
                case ACCESS_LEVELS.MANAGER:
                    this.showManager();
                    break;
                default:
                    window.location.href = "index.html"
                    break;
            }
        }

        this.showVipCustomer = function () {
            $('main').children().each(function (index) {
                $(this).css("display", "none");
            })

            $('#account-balance').text("Account balance: " + db.currentUser.account_balance);
            $('#vip-customer').css("display", "grid");
        }

        this.showBartender = function () {
            manager_menu();
        };

        this.showManager = function () {
            manager_menu();
        };

        this.payFromAccount = function () {
            if (this.payFromAccount) $('.btn.toggle').css("background-color", "#CB5E56");
            else $('.btn.toggle').css("background-color", "#56cb5a");
        }

        this.updateBalance = function () {
            $('#account-balance').text("Account balance: " + db.currentUser.account_balance);
        }

        this.logout = function () {
            this.currentUser = null;
            window.location.href = "index.html";
        }
    }
}

var language = 'sv'

function update_view() {
    keys = dict['keys'];
    for (idx in keys) {
        key = keys[idx];
        console.log(key);
        $("#" + key).text(get_string(key));
    };
    pics = dict['pics'];
    for (idx in pics) {
        pic = pics[idx];
        $("#" + pic).attr('src', get_string(pic));
    };
}

// Update the language we use
function change_lang() {
    if (language=='en') {
        language = 'sv';
    } else {language = 'en'};
    update_view();
}

function update_taste() {
    $("#bevv").find('.sv').css( "color", "red" );
}

// This function will return the appropriate string for each
// key. The language handling is made "automatic".
//
function get_string(key) {
    return dict[language][key];
}

/**
 * 
 */
function sendHome() {
    window.location.href = "index.html";
}
const present = new Presenter();

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

function privilageToString(privilage) {
    switch (privilage) {
        case ACCESS_LEVELS.MANAGER:
            return "Manager"
        case ACCESS_LEVELS.BARTENDER:
            return "Bartender"
        case ACCESS_LEVELS.WAITER:
            return "Waiter"
        case ACCESS_LEVELS.VIP:
            return "VIP"
        case ACCESS_LEVELS.REGULAR:
            return "Regular"
        default:
            return "Regular";
    }
}

function menu() {
    /**
     * @const
     * @type {Beverage[]} 
     */
    const beverages = db.beverages;

        beverages.forEach(function (beverage) {
            const beverageDOM = `
            <div class="beverage" id="bevv">
                <div class='beverage-info'>
                    <div class='beverage-header'>
                        <h2>${beverage.productNameBold}</h2>
                        <h4>${beverage.productNameThin}</h4>
                        <hr>
                    </div>
                    <div class='beverage-main-content sv'> 
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

function manager_menu() {
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
                        <span class='beverage-available'> 
                            <input type="number" id="points" value="${beverage.stock}" name="points" step="1">
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

    $('.beverage-available input').on('click', function() {
		const newStock = parseInt($(this).val());
        const selectedBeverage = db.loadBeverageByName($(this).parents('.beverage').children('.beverage-info').children('.beverage-header').children('h2').text());
        selectedBeverage.stock = newStock;
    })
    present.showMenu();
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
    $('.btn.btn-nav2').on('click', change_lang);

    $('h1#current-user-privilage').text(privilageToString(db.currentUser.credentials));
    update_view();
});
