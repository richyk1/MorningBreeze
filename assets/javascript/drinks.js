function buyBeverage(articleNumber) {
    var menu = document.getElementById("menu");
    menu.addEventListener("click", printAllBeverages); 
}

function printAllBeverages() {
    var id = document.getElementById("allBeverages");

    if (menu.style.display === "none") {
        menu.style.display = "block";
        id.style.display = "none";
    }
    else {
        menu.style.display = "none";
        id.className = "show-beverages"
        var allBev = allBeverages();
        console.log(parseInt("5") + 1);
        for(var i = 0; i < 10; i++) {
            var name = document.createElement("div");
            var type = document.createElement("div");
            var price = document.createElement("div");
            name.appendChild(document.createTextNode(allBev[i][0]));
            type.appendChild(document.createTextNode(allBev[i][1]));
            price.appendChild(document.createTextNode(allBev[i][2]))
            name.className = "beverage-name";
            type.className = "beverage-type";
            price.className = "beverage-price";

            //var buyButton = document.createElement("button");
            //buyButton.className = "beverage-buy-button";
            //var buy = document.createElement("div");
            //buy.appendChild(document.createTextNode("Köp"));
            //buy.className = "buy-text";
            //buyButton.appendChild(buy);
            //buyButton.addEventListener("click", buyBeverage.bind(null, "artikelnummer"));


            var container = document.createElement("div");
            container.className = "beverage-container";
            str1 = "container";
            str2 = i;
            container.id = str1.concat(str2);
            container.draggable="true" 
            container.addEventListener("dragstart", drag);
            container.appendChild(name);
            container.appendChild(type);
            container.appendChild(price);
            container.setAttribute("name", allBev[i][0]);
            container.setAttribute("price", allBev[i][2]);
            //container.appendChild(buyButton);
            id.appendChild(container);
        }
    }
}

$(document).ready(function() {
    buyBeverage();
});