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
            var name = allBev[i][0];
            var type = allBev[i][1];
            var price = allBev[i][2];

            id.insertAdjacentHTML("beforeend", `
                <div class="beverage-container" id="container${i}" draggable="true" name="${name}" price="${price}">
                <div class="beverage-name">${name}</div>
                <div class="beverage-type">${type}</div>
                <div class="beverage-price">${price}</div>
                </div>
            `);
            document.getElementById("container"+i).addEventListener("dragstart", drag);
        }
    }
}

$(document).ready(function() {
    buyBeverage();
});