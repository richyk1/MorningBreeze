/**
 * Controller: Add a product to stock
 */
function doAddProduct() {
    var name = $("#productName1").text(); //Hämta argumentet i något html-element
    var price = $("#productPrice1").text();
    var quantity = $("#productQuantity1").text();
    var description = getDescription(name);
    if (description.length > 0) {
	var prod = new Product(name, description, price, quantity);
	add_product_to_stock(prod);
	$("#productName1").empty();
	$("#productPrice1").empty();
	$("#productQuantity1").empty();
    }
    else {
	msg = "Product not found in database of possible products.";
	alert(msg);
    }
}

/**
 * Controller: Remove a product from stock
 */
function doRemoveProduct() {
    var productName = $("#productName2").text();
    remove_product_from_stock(productName);
    $("#productName2").empty();
}

/**
 * Controller: Change the price of a product
 */
function doChangePrice() {
    var productName = $("#productName3").text();
    var temp = $("#addPrice").text();
    var productPrice = parseInt(temp);
    change_product_price(productName, productPrice);
    $("#productName3").empty();
    $("#addPrice").empty();
}

/**
 * Controller: Add or remove quantity in stock
 */
function doAddOrRemoveQtInStock() {
    var productName = $("#productName4").text();
    var temp = $("#addQuantity").text();
    var qt = parseInt(temp);
    add_or_remove_qt_in_stock(productName, qt);
    $("#productName4").empty();
    $("#addQuantity").empty();
}

/**
 * Controller: List the products in stock
 */
function listStock() {
    clearList();
    var stockArray = getStockArray();
    var stockList = document.getElementById('list');
    createList(stockArray, stockList);
}

/**
 * Controller: Create a list of products in stock
 * @param items An array of items to be listed
 * @param parent HTML DOM element where the list shall be placed 
 */
function createList(items, parent){
    var ul  = document.createElement('ul');
    parent.appendChild(ul);
    items.forEach(function generateList(item) {
	var li = document.createElement('li');
	ul.appendChild(li);
	li.innerHTML = "NAME: " + item.name + " | DESCRIPTION: " +item.description + " | PRICE: " + item.price + " | QUANTITY: " + item.quantity;
    });
}

/**
 * Controller: Clear the stock list with id 'list'
 */
function clearList() {
    $("#list").empty();
}

/**
 * Controller: Order a refill of a product
 */
function doOrderRefill() {
    var name = $("#productName5").text();
    var quantity = $("#productQuantity5").text();
    if (quantity > 0) {
	orderRefill(name, quantity);
	$("#productName5").empty();
	$("#productQuantity5").empty();
	msg = "Order placed.";
	alert(msg);
    }
    else {
	$("#productName5").empty();
	$("#productQuantity5").empty();
	msgErr = "Insufficient quantity";
	alert(msgErr);
    }
}
