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
