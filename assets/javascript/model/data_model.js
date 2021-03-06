/**
 * File: data_model.js
 * Group: Morning Breeze
 *
 * This is a template file for the use of data from JSON files. It is defined
 * to use the AJAX asynchronous loading. This means that it will not block other
 * functions. However, this also means that the loading is not guaranteed to be
 * finished before other commands are given.
 *
 * NOTE: JSON DOES NOT ALLOW COMMENTS IN THE FILE!
 *
 *
 * The Data object holds the database.
 */

/**
 * Load the data from a JSON database.
 * @param callback A callback function to receive the file's data-
 * @param file The file containing the jSON database.
 */

function loadJSON(callback, file) {

    // We load the file using an XMLHttpRequest, which is part of AJAX
    //
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");

    // Open the file for reading. Filename is relative to the script file.
    //
    xobj.open('GET', file, true);

    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {

            // It is necessary to use an anonymous callback as .open will NOT
            // return a value but simply returns undefined in asynchronous mode.
            //
            callback(xobj.responseText);
        }
    };

    xobj.send(null);
};

/** Class representing user information. */
class User {
    /**
     *
     * @param {number} credentials A number representing the privilage level of a user.
     * @param {string} password A hashed string containing users password.
     * @param {string} username A string containing the username.
     * @param {string} first_name A string containing first name.
     * @param {string} last_name A string containing last_name.
     * @param {string} email A string containing the e-mail address of the user.
     * @param {number} phone A number representing the phone number of the user.
     */
    constructor(credentials, password, username, first_name, last_name, email, phone) {
        this.credentials = credentials;
        this.password = password;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}

/** Class representing information of a beverage. */
class Beverage {
    /**
     * @param {string} productNameBold Product name in bold.
     * @param {string} productNameThin Product mini-slogan.
     * @param {string} imageUrl URL of beverage image.
     * @param {string} taste Some information about the product.
     */
    constructor(productId, productNameBold, productNameThin, imageUrl, taste, usage, country, price) {
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.productNameBold = productNameBold; 
        if(productNameThin) this.productNameThin = productNameThin;
        else this.productNameThin = "";
        this.taste = taste;
        this.usage = usage;
        this.country = country;
        this.price = price;
    }
}

/** Represents the credentials of the different types of users. */
const ACCESS_LEVELS = {
    MANAGER: "0",
    BARTENDER: "1",
    WAITER: "2",
    VIP: "3",
    REGULAR: "4"
}

/** Represents the customer cart. */
var cart = [];

/**
 * Puts a beverage in the cart.
 * @param cartItem The beverage to put in the cart.
 */
function pushStack(cartItem) {
    stack.push(cartItems);
}

/**
 * Removes a beverage from the cart.
 * @param cartItem The beverage to remove from the cart.
 */
function popStack(cartItem) {
    var lastStack = stack.pop()

    cartItems = lastStack ? lastStack : cartItems
}



/** Class responsible for extracting relevant information from databases */
class Data {
    constructor() {
        this.users = [];
        this.beverages = [];
        this.payments = [];
        this.bought = [];
        this.sold = [];
        this.cachedTable = 0;

        this.loadUsers = function () {
            loadJSON((response) => {
                db.users = JSON.parse(response);
            }, 'database/morningbreeze_users.json');
        };

        this.loadBeverages = function () {
            loadJSON((response) => {
                const parsedResponse = JSON.parse(response);
                Array.from(parsedResponse.products).forEach((value) => {
                    this.beverages.push(new Beverage(value.productId, value.productNameBold, value.productNameThin, value.images[0].imageUrl, value.taste,
                        value.usage, value.country, value.price));
                })
            }, 'database/morningbreeze_beers.json');
        };

        /**
         * Retrieves users information from the database by the given username.
         * @param {string} username - The string containing username.
         * @returns {User} A User object.
         */
        this.getUser = function (username) {
            var foundUser = Array.from(db.users.users).find(user => user.username == username);
            if (foundUser) return new User(foundUser.credentials,
                foundUser.password,
                foundUser.username,
                foundUser.first_name,
                foundUser.last_name,
                foundUser.email,
                foundUser.phone);

            return undefined;
        };

        this.setCacheTable = function (tableNumber) {
            this.cachedTable = tableNumber;
        }

        this.getCacheTable = function () {
            return this.cachedTable;
        }

        /**
         * Retrieves beverage by name.
         * @param {string} productNameBold
         * @returns {Beverage}
         */
        this.loadBeverageByName = function(productNameBold) {
            return this.beverages.find(beverage => beverage.productNameBold == productNameBold);
        }
    }
}

/** Set up the data for the program. */
const db = new Data();
db.loadUsers();
db.loadBeverages();

/**
 * END of file data_model.js
 */
