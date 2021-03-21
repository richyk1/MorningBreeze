// This is a template file for the use of data from JSON files. It is defined
// to use the AJAX asynchronous loading. This means that it will not block other
// functions. However, this also means that the loading is not guaranteed to be
// finished before other commands are given.
//
// NOTE: JSON DOES NOT ALLOW COMMENTS IN THE FILE!
//
//
// The Data object holds the database.
//
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
    constructor(credentials, password, username, first_name, last_name, email, phone, account_balance, payFromAccount) {
        this.credentials = credentials;
        this.password = password;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.account_balance = account_balance;
        this.payFromAccount = payFromAccount;

        this.PayFromAccount = function() {
            this.payFromAccount = !this.payFromAccount;
            if(this.payFromAccount) $('.btn.toggle').css("background-color", "#CB5E56");
            else $('.btn.toggle').css("background-color", "#56cb5a");
        }

        this.UpdateBalance = function() {
            $('#account-balance').text("Account balance: " + this.account_balance);
        }

        this.Logout = function() {
            this.currentUser = null;
            window.location.href = "index.html";
        }
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
    constructor(productNameBold, productNameThin, imageUrl, taste, usage, country, price) {
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

const ACCESS_LEVELS = {
    MANAGER: "0",
    BARTENDER: "1",
    WAITER: "2",
    VIP: "3",
    REGULAR: "4"
}

/** Class responsible for extracting relevant information from databases */
class Data {
    constructor() {
        this.users = [];
        this.beverages = [];
        this.payments = [];
        this.bought = [];
        this.sold = [];
        this.currentUser;

        this.loadUsers = function () {
            loadJSON((response) => {
                db.users = JSON.parse(response);
            }, 'database/morningbreeze_users.json');
        };

        this.loadBeverages = function () {
            loadJSON((response) => {
                const parsedResponse = JSON.parse(response);
                Array.from(parsedResponse.products).forEach((value) => {
                    try {
                        this.beverages.push(new Beverage(value.productNameBold, value.productNameThin, value.images[0].imageUrl, value.taste,
                            value.usage, value.country, value.price));
                    } catch (error) {
                        // We aren't handling the error, because we can just skip that iteration without an image.
                    }
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
                foundUser.phone,
                Math.floor(Math.random() * 100), // Generates account balance between 0 and 100
                false)

            return undefined;
        };

        this.setCacheTable = function (tableNumber) {
            this.cachedTable = tableNumber;
        }

        this.getCacheTable = function () {
            return this.cachedTable;
        }

        this.getCurrentUser = function () {
            return this.currentUser;
        }

        this.setCurrentUser = function (user) {
            this.currentUser = user;
        }

        this.getBeverages = function() { return this.beverages };

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

const db = new Data();
db.loadUsers();
db.loadBeverages();