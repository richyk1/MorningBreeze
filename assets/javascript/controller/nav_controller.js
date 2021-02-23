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