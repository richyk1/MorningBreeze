// Returns a list of the beverages in the database whose varugrupp contains tag as a substring.
// Returned list will contain generic information for all elements.
// Not case sensitive. Be careful with usage: vinsprit contains vin.
// Everything is ONLY IN SWEDISH for the moment.
// Some possible swedish tag categories, based on findings in the database:
// BOOZE: Cognac, sprit, Rom, Whisky, Grappa, Brandy, Vinsprit, Calvados, Sprit, Marc, Gin, Armagnac,
// Sake, Likör, Genever, Bourbon, Punsch, Bitter, (rinkar och Cocktails
// BEER AND CIDER: Öl, Ale, lager, Cider, Blanddrycker, Porter och Stout, Veteöl, Mjöd, Specialöl, Fruktvin
// WINE: Rosévin, Rosé, Aperitif, Vin, Portvin, Sherry, Madeira, Montilla, Bual, Sercial, Vermouth, Malvoisie/Malmsey, Glögg, Glühwein, starkvin
// NON ALCOHOLIC: Alkoholfri, Vatten, Alkoholfritt
//
function allTaggedDrinks(tag) {

    var collector = [];
    var tagLower = tag.toLowerCase();
    var spirits = DB2["spirits"];

    for (i = 0; i < DB2.spirits.length; i++) {

        var tempStr = spirits[i].varugrupp.toLowerCase();
        var index = tempStr.indexOf(tagLower); // index of substring or -1 if no substring

        if (index != -1) { // if tag is a substring of varugrupp, get generic information about the merchandise

            collector.push([DB2.spirits[i].namn, DB2.spirits[i].producent, DB2.spirits[i].ursprung, DB2.spirits[i].ursprungslandnamn,
                DB2.spirits[i].varugrupp, DB2.spirits[i].forpackning, DB2.spirits[i].argang, DB2.spirits[i].alkoholhalt]);
        }
    }
    return collector;
}

//Get list of non alcoholic beverages with some generic data.
function nonAlcoholic() {
    var collector = sectionBeverages(0.00, 2.25);
    return collector;
}

//Get list of beer and cider with some generic data.
function beerAndCider() {
    var collector = sectionBeverages(2.26, 10.00);
    return collector;
}

//Get list of wine (including strong wine) with some generic data.
function wineInclStrong() {
    var collector = sectionBeverages(10.01, 22.00);
    return collector;
}

//Get list of booze and other very strong alcohols with some generic data.
function booze() {
    var collector = sectionBeverages(22.01, 80.00);
    return collector;
}

//Get beverages with alcoholic content from minStrength (inclusive) to maxStrength (inclusive).
//Returns array with some generic data.
function sectionBeverages(minStrength, maxStrength) {

    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {

        if (percentToNumber(DB2.spirits[i].alkoholhalt) >= minStrength && percentToNumber(DB2.spirits[i].alkoholhalt) <= maxStrength) {

            collector.push([DB2.spirits[i].namn, DB2.spirits[i].producent, DB2.spirits[i].ursprung, DB2.spirits[i].ursprungslandnamn,
                DB2.spirits[i].varugrupp, DB2.spirits[i].forpackning, DB2.spirits[i].argang, DB2.spirits[i].alkoholhalt]);
        }
    }

    return collector;
}

// =====================================================================================================
// Lists all beverage types in the database. As you will see, there are quite a few, and you might want
// select only a few of them for your data.
//
function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

// =====================================================================================================
// Adds an item to a set, only if the item is not already there.
// The set is modelled using an array.
//
function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

// =====================================================================================================
// Convenience function to change "xx%" into the percentage in whole numbers (non-strings).
//
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}
