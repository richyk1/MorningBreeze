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
