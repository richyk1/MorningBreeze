/**
 * Global variable for stock. Contains array of Product.
 */
let stock = {
    "products" : []
}

/**
 * Global variable for refill orders. Contains an array of arrays containing a product name and a quantity to order.
 */
let refill = {
    "order" : []
}

/**
 * Constructor for Product. A Product is an element in stock["products"].
 * @param name The name of the product
 * @param description An array returned from the function call getDescription(name)
 * @param price The product's price
 * @param quantity The quantity of product in stock
 */
function Product(name, description, price, quantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

/**
 * Change the price of a product in stock
 * @param product_name The product's name
 * @param price The new price of the product
 */
function change_product_price(product_name, price) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product_name );

    if (typeof(found) != "undefined") {
	found.price = price;
    } else {
	var error_msg = "Product name not in stock list.";
	alert(error_msg);
    }
}

/**
 * Add or remove quantity of a product in stock
 * @param product_name The product's name
 * @param qt_to_add_or_remove The quantity of product to add (if quantity is positive) or remove (if quantity is negative)
 */
function add_or_remove_qt_in_stock(product_name, qt_to_add_or_remove) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product_name );

    if (typeof(found) != "undefined" && typeof(found.quantity) != "undefined") {
	var tempStr = found.quantity;
	var tempN = parseInt(tempStr);
	if (tempN + qt_to_add_or_remove >= 0) {
	    found.quantity = tempN + qt_to_add_or_remove;
	} else {
	    var error_msg1 = "Stock cannot be negative.";
	    alert(error_msg1);
	}
    } else {
	var error_msg2 = "Product name not in stock list.";
	alert(error_msg2);
    }
}

/**
 * Add a new product to stock
 * @param product The Product to add to stock
 */
function add_product_to_stock(product) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product.name );

    if (typeof(found) == "undefined") {
	temp.push(product);
    } else {
	var error_msg = "Product name already in stock list.";
	alert(error_msg);
    }
}

/**
 * Remove a product from stock
 * @param product_name The name of the product to remove
 */
function remove_product_from_stock(product_name) {
    var temp = stock["products"];
    var i = 0;
    var ind = -1;

    for (i = 0; i < temp.length; i++) {
	if (temp[i].name === product_name) {
	    ind = i;
	    break;
	}
    }

    if (ind >= 0) { //If index >= 0 then product is in stock
	temp.splice(ind, 1); //Remove product from stock
    } else {
	var error_msg = "Product name not in stock list."
	alert(error_msg);
    }
}


/**
 * Get an array with selected information describing a product from the database DB2
 * The information in the array is pertinent for display on menu
 * @param productName The name of the product
 * @returns An array with information about the product
 */
function getDescription(productName) {
    var collector = [];
    var spirits = DB2["spirits"];

    for (i = 0; i < spirits.length; i++) {
	var temp = spirits[i].namn;
	if (temp === productName) {
	    collector.push(spirits[i].namn, spirits[i].producent, spirits[i].ursprung, spirits[i].ursprungslandnamn,
			   spirits[i].varugrupp, spirits[i].forpackning, spirits[i].argang, spirits[i].alkoholhalt);
	    return collector;
	}
    }

    var error_msg = "Product name not in database of possible products.";
    alert(error_msg);

    return collector;
}

/**
 * Get all products in stock whose 'varugrupp' in the database DB2 contains tag as a substring
 * @param tag A string with the specific type of beverage that is searched for in stock
 * @returns An array containing the corresponding products, if any
 */
function getTaggedDrinksInStock(tag) {

    var collector = [];
    var tagLower = tag.toLowerCase();
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {

	var prod = products[i];
	var info = prod.description;
	var typeLower = info[4].toLowerCase();
	var index = typeLower.indexOf(tagLower); // index of substring or -1 if no substring

	if (index != -1) { // if tag is a substring of varugrupp, get generic information about the merchandise
	    collector.push(products[i]);
	}
    }

    return collector;
}

/**
 *  Get an array of non alcoholic beverages (0.00 - 2.25 ‰ alc.) in stock
 *  @returns An array of Product
 */
function nonAlc() {
    var collector = sectionDrinks(0.00, 2.25);
    return collector;
}

/**
 * Get an array of beer and cider (2.26 ‰ - 10.00 ‰ alc.) in stock
 * @returns An array of Product
 */
function beerCider() {
    var collector = sectionDrinks(2.26, 10.00);
    return collector;
}

/**
 * Get an array of wine, including strong wine, (10.01 ‰ - 22.00 ‰ alc.) in stock
 * @returns An array of Product
 */
function wines() {
    var collector = sectionDrinks(10.01, 22.00);
    return collector;
}

/**
 * Get list of booze and other very strong alcohols (22.01 ‰ - 80.00 ‰ alc.) in stock
 * @returns An array of Product
 */
function strongest() {
    var collector = sectionDrinks(22.01, 80.00);
    return collector;
}

/**
 * Get beverages in stock within a range of alcoholic content.
 * @param minStrength The inclusive lower bound of the alcoholic range
 * @param maxStrength The inclusive upper bound of the alcoholic range
 * @returns An array of Product in stock whose alcoholic content is within the range
 */
function sectionDrinks(minStrength, maxStrength) {

    var collector = [];
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {

	var temp = products[i].description;

	if (percentToNumber(temp[7]) >= minStrength && percentToNumber(temp[7]) <= maxStrength) {

	    collector.push(products[i]);
	}
    }

    return collector;
}

/**
 * Lists all beverage types in stock
 * @returns An Array of String where each element is a unique beverage type in stock
 */
function typesDrinks() {
    var types = [];
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {
	var temp = products[i].description;
	addToSet(types, temp[4]);
    }
    return types;
}

/**
 * Get array with products in stock, ordered by category according to four alcoholic strengths
 * @returns An array of Product in stock
 */
function getStockArray() {
    var n = nonAlc();
    var b = beerCider();
    var w = wines();
    var s = strongest();

    var t1 = n.concat(b);
    var t2 = w.concat(s);

    var collector = t1.concat(t2);

    return collector;
}

/**
 * Get an array containing a specific product in stock
 * @param productName The name of the product to find in stock
 * @returns An array containing a single Product in stock that has the productName, or an empty array if the product is not in stock
 */
function getAProductInStock(productName) {
    var collector = [];
    var nameLower = productName.toLowerCase();
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {
	var temp = products[i].name.toLowerCase();
	if (temp === nameLower) {
	    collector.push(products[i]);
	    return collector;
	}
    }
    var msg = "Product name not in stock list.";
    alert(msg);
    return collector;
}

/**
 * Put a refill order in the Refill var.
 * @param productName The name of the product to refill
 * @param quantityToOrder The quantity of product to order
 */
function orderRefill(productName, quantityToOrder) {
    var quantity = parseInt(quantityToOrder);
    var collector = [];
    collector.push(productName);
    collector.push(quantity);
}
