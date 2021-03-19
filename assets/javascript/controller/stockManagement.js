function doAddProduct() {
    var name = $("#productName1").text(); //Hämta argumentet i något html-element
    var price = $("#productPrice1").text();
    var quantity = $("#productQuantity1").text();
    var description = getDescription(name);
    var prod = new Product(name, description, price, quantity);
    add_product_to_stock(prod);
    $("#productName1").empty();
    $("#productPrice1").empty();
    $("#productQuantity1").empty();
}

function doAddProd() {
    var name = document.getElementById('pname').value;
    var price = document.getElementById('pprice').value;
    var quantity = document.getElementById('pquantity').value;
    var description = getDescription(name);
    var prod = new Product(name, description, price, quantity);
    add_product_to_stock(prod);
}

function doRemoveProduct() {
    var productName = $("#productName2").text();
    remove_product_from_stock(productName);
    $("#productName2").empty();
}

function doChangePrice() {
    var productName = $("#productName3").text();
    var temp = $("#addPrice").text();
    var productPrice = parseInt(temp);
    change_product_price(productName, productPrice);
    $("#productName3").empty();
    $("#addPrice").empty();
}

function doAddOrRemoveQtInStock() {
    var productName = $("#productName4").text();
    var temp = $("#addQuantity").text();
    var qt = parseInt(temp);
    add_or_remove_qt_in_stock(productName, qt);
    $("#productName4").empty();
    $("#addQuantity").empty();
}

function seeAvailabilityOfProduct() {
    var productName = $("#productName5").text();
    var arr = getAProductInStock(productName);
    var temp = arr[0];
    if (temp != undefined) {
	var qt = temp.quantity;
	msg = productName + ": " + qt;
	alert(msg)
    }
    $("#productName5").empty();
}

function listStock() {
    clearList();
    var stockArray = getStockArray();
    var stockList = document.getElementById('list');
    createList(stockArray, stockList);
}

function createList(items, parent){
    var ul  = document.createElement('ul');
    parent.appendChild(ul);
    items.forEach(function generateList(item) {
	var li = document.createElement('li');
	ul.appendChild(li);
	li.innerHTML = "NAME: " + item.name + " | DESCRIPTION: " +item.description + " | PRICE: " + item.price + " | QUANTITY: " + item.quantity;
    });
}

function clearList() {
    $("#list").empty();
}
