/**
 * Returns a list of the beverages in the database DB2 whose 'varugrupp' contains 'tag' as a substring.
 * Not case sensitive. Be careful with usage: vinsprit contains vin.
 *
 * Some possible swedish tag categories, based on findings in the database DB2:
 * BOOZE: Cognac, sprit, Rom, Whisky, Grappa, Brandy, Vinsprit, Calvados, Sprit, Marc, Gin, Armagnac,
 * Sake, Likör, Genever, Bourbon, Punsch, Bitter, Drinkar och Cocktails
 * BEER AND CIDER: Öl, Ale, lager, Cider, Blanddrycker, Porter och Stout, Veteöl, Mjöd, Specialöl, Fruktvin
 * WINE: Rosévin, Rosé, Aperitif, Vin, Portvin, Sherry, Madeira, Montilla, Bual, Sercial, Vermouth, Malvoisie/Malmsey, Glögg, Glühwein, starkvin
 * NON ALCOHOLIC: Alkoholfri, Vatten, Alkoholfritt
 *
 * @param tag A String with the specific type of beverage (in swedish) that is searched for in the database DB2
 * @returns An Array containing the corresponding products, if any
 * */
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

/**
 *  Get an array of non alcoholic beverages (0.00 - 2.25 ‰ alc.) in the database DB2
 *  @returns An array of Product
 */
function nonAlcoholic() {
    var collector = sectionBeverages(0.00, 2.25);
    return collector;
}

/**
 * Get an array of beer and cider (2.26 ‰ - 10.00 ‰ alc.) in the database DB2
 * @returns An array of Product
 */
function beerAndCider() {
    var collector = sectionBeverages(2.26, 10.00);
    return collector;
}

/**
 * Get an array of wine, including strong wine, (10.01 ‰ - 22.00 ‰ alc.) in the database DB2
 * @returns An array of Product
 */
function wineInclStrong() {
    var collector = sectionBeverages(10.01, 22.00);
    return collector;
}

/**
 * Get list of booze and other very strong alcohols (22.01 ‰ - 80.00 ‰ alc.) in the database DB2
 * @returns An array of Product
 */
function booze() {
    var collector = sectionBeverages(22.01, 80.00);
    return collector;
}

/**
 * Get beverages in the database DB2 within a range of alcoholic content.
 * @param minStrength The inclusive lower bound of the alcoholic range
 * @param maxStrength The inclusive upper bound of the alcoholic range
 * @returns An array of Product in DB2 whose alcoholic content is within the range
 */
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

/**
 * Lists all beverage types in the database DB2
 * @returns An Array of unique beverage types (varugrupp) in DB2
 */
function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
	addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

/**
 * Adds an item to a set, only if the item is not already there
 * @param set An array modelling the set
 * @param item The item to add to the set
 * @returns a set modelled as an Array containing unique items
 */
function addToSet(set, item) {
    if (!set.includes(item)) {
	set.push(item);
    }
    return set;
}

/**
 * Convenience function to change "xx%" into the percentage in whole numbers (non-strings)
 * @param percentStr The String representation of the percentage
 * @returns A Number representation of percentStr
 */
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}
