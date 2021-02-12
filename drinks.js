function buyBeverage(articleNumber) {
    var menu = document.getElementById("menu");
    menu.addEventListener("click", printAllBeverages); 
}

function printAllBeverages() {
    var id = document.getElementById("allBeverages");

    if (menu.style.display === "none") {
        menu.style.display = "block";
        id.style.display = "none";
        console.log("hej");
    }
    else {
        menu.style.display = "none";
        id.className = "show-beverages"
        var allBev = allBeverages();
        for(var i = 0; i < allBev.length; i++) {
            var name = document.createElement("div");
            var type = document.createElement("div");
            name.appendChild(document.createTextNode(allBev[i][0]));
            type.appendChild(document.createTextNode(allBev[i][1]));
            name.className = "beverage-name";
            type.className = "beverage-type";

            var buyButton = document.createElement("button");
            buyButton.className = "beverage-buy-button";
            var buy = document.createElement("div");
            buy.appendChild(document.createTextNode("Köp"));
            buy.className = "buy-text";
            buyButton.appendChild(buy);
            buyButton.addEventListener("click", buyBeverage.bind(null, "artikelnummer"));


            var container = document.createElement("div");
            container.className = "beverage-container";
            container.appendChild(name);
            container.appendChild(type);
            container.appendChild(buyButton);
            id.appendChild(container);
        }
    }
}

$(document).ready(function() {
    buyBeverage();
});