// Global variable for stock. Contains array of Product.
var stock = {
    "products" : []
}

// Product is an element in stock["products"].
function Product(name, description, price, quantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

//Change the price of a product in stock.
function change_product_price(product_name, price) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product_name );

    if (typeof(found) != "undefined") {
	found.price = price;
    } else {
	var error_msg = "Product name not in list.";
	alert(error_msg);
    }
}

// Add/remove quantity to/from a product in stock.
// If qt_to_add_or_remove is negative, quantity is removed. Else quantity is added.
function add_or_remove_qt_in_stock(product_name, qt_to_add_or_remove) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product_name );

    if (typeof(found) != "undefined" && typeof(found.quantity) != "undefined") {
	if (found.quantity + qt_to_add_or_remove >= 0) {
	    found.quantity = found.quantity + qt_to_add_or_remove;
	} else {
	    var error_msg1 = "Stock cannot be negative.";
	    alert(error_msg1);
	}
    } else {
	var error_msg2 = "Product name not in list.";
	alert(error_msg2);
    }
}

//Add a new product to stock.
function add_product_to_stock(product) {
    var temp = stock["products"];
    var found = temp.find(found => found.name === product.name );

    if (typeof(found) == "undefined") {
	temp.push(product);
    } else {
	var error_msg = "Product name already in list.";
	alert(error_msg);
    }
}

//Remove a product from stock
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
	temp.splice(ind, 1); //Remove product
    } else {
	var error_msg = "Product name not in list."
	alert(error_msg);
    }
}

//Get an array with the description (pertinent info only) of a product from DB2.
//so that the array can be inserted as the attribute 'description' when creating a product
//that shall be put into stock
function getDescription(productName) {
    var collector = [];
    //var nameLower = productName.toLowerCase();
    //console.log(nameLower)
    var spirits = DB2["spirits"];

    for (i = 0; i < spirits.length; i++) {
	//var temp = spirits[i].namn.toLowerCase();
	var temp = spirits[i].namn;
	console.log(temp);
	if (temp === productName) {
	    collector.push(spirits[i].namn, spirits[i].producent, spirits[i].ursprung, spirits[i].ursprungslandnamn,
			   spirits[i].varugrupp, spirits[i].forpackning, spirits[i].argang, spirits[i].alkoholhalt);
	    return collector;
	}
    }

    var error_msg = "Product name not in list.";
    alert(error_msg);

    return collector;
}

//Get all products in stock whose 'varutyp' in DB2 contains tag as a substring
function getTaggedDrinksInStock(tag) {

    var collector = [];
    var tagLower = tag.toLowerCase();
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {

	var prod = products[i];
	var info = prod.description;
	console.log(info);
	var typeLower = info[4].toLowerCase();
	var index = typeLower.indexOf(tagLower); // index of substring or -1 if no substring

	if (index != -1) { // if tag is a substring of varugrupp, get generic information about the merchandise
	    collector.push(products[i]);
	}
    }

    return collector;
}

//For stock: Get list of non alcoholic beverages with some generic data.
function nonAlc() {
    var collector = sectionDrinks(0.00, 2.25);
    return collector;
}

//For stock: Get list of beer and cider with some generic data.
function beerCider() {
    var collector = sectionDrinks(2.26, 10.00);
    return collector;
}

//For stock: Get list of wine (including strong wine) with some generic data.
function wines() {
    var collector = sectionDrinks(10.01, 22.00);
    return collector;
}

//For stock: Get list of booze and other very strong alcohols with some generic data.
function strongest() {
    var collector = sectionDrinks(22.01, 80.00);
    return collector;
}

//For stock: Get beverages with alcoholic content from minStrength (inclusive) to maxStrength (inclusive).
//Returns array with some generic data.
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

// =====================================================================================================
// Lists all beverage types in stock.
//
function typesDrinks() {
    var types = [];
    var products = stock["products"];

    for (i = 0; i < products.length; i++) {
	var temp = products[i].description;
	addToSet(types, temp[4]);
    }

    return types;
}

//Get array with products in stock, ordered by category (non alcoholic etc.).
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

//Get an array containing a specific product in stock.
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
    var msg = "Product name not in list.";
    alert(msg);
    return collector;
}
