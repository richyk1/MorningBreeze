/**
 * File: nav_controller.js
 * Group: Morning Breeze
 * The file contains the main controller functions of the program.
 */

/**
 * Go to the start page. The function sets the href (URL) of the current page to the location of the start page.. 
 */
function sendHome() {
    window.location.href = "index.html";
}

/**
 * Make html login window untinted. Then remove login window from document and show untinted login form.
 */
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
 * @param privilageLevel The credentials of the current user.
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
/**
 * Create and display the menu so that the user can add beverages to cart, with possibility of undo-redo. 
 * @param event The event
 */
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
                        <button class='beverage-to-list' id="product-${beverage.productId}">
                                <img src='assets/images/add-circle-outline.svg'></img>
                        </button>
                    </div>
                </div>
                <div class='beverage-image-wrapper'> 
                    <img class="beverage-image" src='${beverage.imageUrl}_100.png'></img>
                </div>
            </div>`;

            $('div#all-beverages').append(beverageDOM);

            const temp = {
                execute: addToCart.bind(null, beverage),
                unexecute: removeCartItem.bind(null, beverage)
            }
            document.getElementById("product-"+beverage.productId).addEventListener("click", doit.bind(null, temp));
        });

        $('div#all-beverages').css("display", "grid");
        $(this).css("display", "none");

        /*
            Vi lägger till en addEventListener till alla knappar som använder sig av
            classen addToCartButton.
        */
};

/**
 * Mark the current table as occupied, then remove the table window from the document and display the menu instead.
 */
function occupyTableOnClick() {
    const tableNumber = Number($(this).text().trim());
    db.setCacheTable(tableNumber);
    $('div#table-window').css("display", "none");
    $('button#menu').css("display", "grid");
}

/**
 * Remove a beverage from the cart. Then display the cart without the removed beverage.
 * @param obj The beverage to be removed
 */
function removeCartItem(obj) {
    var i = findObject(obj, cart);
    cart[i].quantity -= 1;
    
    if(cart[i].quantity == 0) {
        cart.splice(i , 1);
    }
    updateViewCart();
}

/**
 * Find a beverage in the cart.
 * @param obj The beverage to search for
 * @param array The cart
 * @returns The index of obj in array if obj was found, else -1. 
 */
function findObject (object , array) {
    for (i in array) {
        if (parseInt(object.productId) == parseInt(array[i].obj.productId)) {
            return i;
        }
    }
    return -1;
}

/**
 * Update the quantity in cart of an added beverage.
 * @param obj The beverage that has been added to cart
 */
function newQuantity(obj) {
    var i = findObject(obj, cart);
    cart[i].quantity 
    cartTotal();
}

/**
 * Add a beverage to the cart. Then update the view of the cart.
 * @param beverageObject The beverage to add to cart. 
 */
function addToCart(beverageObject) {

    var cartIndex = findObject(beverageObject, cart);
    if (cartIndex == -1) {
        var temp = {
            obj: beverageObject,
            quantity: 1
        }
        cart.push(temp);
    } else {
        cart[cartIndex].quantity += 1;
    }
    
    updateViewCart();
}

/**
 * Update the view of the cart when a beverage is added or removed.
 */
function updateViewCart() {

    $("div#cart-items").text(""); 

    for (i in cart) {
        /*
            Vi ger HTML kod till varje objekt som finns med på vår cart.
            På så vis skriver vi ut den rätta titeln, priset, håller koll på
            kvantiteten samt att vi lägger till en remove-knapp.
        */
        var cartContent = `
            <div class="cart-item">
                <div class="cart-column">
                    <span class="cart-item-title">${cart[i].obj.productNameBold}</span>
                </div>
                <span class="cart-price cart-column">${cart[i].obj.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="quantity" type="number" value="${cart[i].quantity}" readyonly>
                    <button class="btn remove-item" type="button">REMOVE</button>
                </div>
            </div>`

        $('span#total-price').css("display", "block");
        // Lägger till cartItem bland de alla cartItems som vi har.


        $('div#cart-items').append(cartContent);


        /*  Lägger till funktionalitet till removeknappen som finns med i HTML-koden för
            varje objekt i kassan. Samt funktionalitet så att man kan ändra på kvantiteten. */
        const temp = {
            execute: removeCartItem.bind(null, cart[i].obj),
            unexecute: addToCart.bind(null, cart[i].obj)
        }

        $('.remove-item').last().on('click', doit.bind(null, temp));
    }

    cartTotal();
}

/**
 * Calculate the total price of the beverages in the cart. Then display the result in the view.
 */
function cartTotal() {
    var total = 0

    for (i in cart) {
        total = total + cart[i].obj.price * cart[i].quantity;
    }

    // Detta skyddar oss från att få en massa onödiga decimaler
    total = Math.round(total * 100) / 100;
    
    $('span#total-price').text(total + " kr");
}



// The data base for the UNDO-REDO mechanism is stored in two stacks
// Both of these are empty to start with.
//
let undostack = [];
let redostack = [];

// The UNDO-manager consists of three functions. In this version they are
// rudimentary, in that they don't check for an empty stack before trying.
// Adding these checks is an easy task.
//
// The UNDO-manager requires that the functions are stored as objects with three
// functions each: execute, unexecute and reexecute. Since the model is very
// small here, the functins are also necessarily simple. With more complex
// models, the functions for this will also grow.
//
// Note, however. that the undo-mechanism does not need to know anything
// about the model or the functions themselves. It just executes the appropriate
// function for the respective moments.
//
// ==========================================================================
// the doit function executes the function and then stores the function object
// on the UNDO-stack.
//
// Note that when a new function is executed, the REDO-stack has to be reset!
//
function doit(funcobj) {
    funcobj.execute();
    undostack.push(funcobj);
    redostack = [];
}


// ==========================================================================
// The undoit first pops the function object from the UNDO-stack, then executes
// UNDO-function and stores the function object on the REDO-stack.
//
function undoit() {
    if (undostack.length == 0) return;
    funcobj = undostack.pop();
    funcobj.unexecute();
    redostack.push(funcobj);
}

// ==========================================================================
// The redoit function pops the function object from the REDO-stack, executes
// the EXECUTE-function and then pushes the function object onto the UNDO-stack.
//
function redoit() {
    if (redostack.length == 0) return;
    funcobj = redostack.pop();
    funcobj.execute();
    undostack.push(funcobj);
}

/**
 * Anonymous control function for the main buttons of the program.
 */
jQuery(function () {
    $('button#menu').on('click', { beverages: db.beverages }, menuOnClick);
    $('button#undo').on('click', undoit);
    $('button#redo').on('click', redoit);

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

/**
 * END of file nav_controller.js
 */
