/**
 * 
 */
function sendHome() {
    window.location.href = "index.html";
}

function untint() {
    $("div#login-window").animate({
        opacity: 0,
    }, 200, function () {
        // Animation complete. Show login window

        $('div#login-window').css("display", "none");
    });

    $("div#tint").animate({
        opacity: 0,
    }, 200, function () {
        // Animation complete. Show login window

    });
}

/**
 * Shows the login box
 */
function show_login(privilageLevel) {
    $('div#login-window').css("display", "flex");
    $("div#login-window").animate({
        opacity: 1,
    }, 200, function () {
        // Animation complete. Show login window
        document.getElementById('username').focus();
    });


    $("div#tint").animate({
        opacity: 0.5,
    }, 200, function () {
        // Animation complete. Show login window

    });
}

// Controller-view relationship

function menuOnClick(event) {
        /**
         * @const
         * @type {Beverage[]} 
         */
        const beverages = event.data.beverages;

        beverages.forEach(function (beverage) {
            const beverageDOM = '<div class="beverage">' +
                "<div class='beverage-info'>" + 
                    "<div class='beverage-header'>" + 
                        "<h2>" + beverage.productNameBold + "</h2>" +
                        "<h4>" + beverage.productNameThin + "</h4>" +
                        "<hr>" +
                    "</div>" +
                    "<div class='beverage-main-content'>" + 
                        "<p>" + beverage.taste +"</p>" +
                        "<p>" + beverage.usage +"</p>" +
                    "</div>" +
                    "<div class='beverage-footer'>" + 
                        "<span class='beverage-country-icon'>" + 
                            '<img src=assets/images/flags/' + beverage.country + ".svg" + "></img>" +
                        "</span>" + 
                        "<span class='beverage-country-name'>" + 
                            beverage.country + 
                        "</span>" + 
                        "<span class='beverage-price'>" + 
                            beverage.price + ":-" +
                        "</span>" + 
                        "<button class='beverage-to-list'>" +
                                "<img src=assets/images/add-circle-outline.svg></img>" +
                        "</button>" +
                    "</div>" +
                "</div>" +
                "<div class='beverage-image-wrapper'>" + 
                    '<img class="beverage-image" src=' + beverage.imageUrl + "_100.png" + "></img>" +
                "</div>"
            "</div>";
            
            $('div#all-beverages').append(beverageDOM);
        });

        $('div#all-beverages').css("display", "grid");
        $(this).css("display", "none");
};

jQuery(function () {
    $('button#menu').on('click', { beverages: db.beverages }, menuOnClick);

});
