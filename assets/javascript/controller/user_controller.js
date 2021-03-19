
/**
 * Simple hashing function for hashing passwords.
 * @see https://stackoverflow.com/a/8831937
 * @returns {number} Hashed string.
 */
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}


/**
 * Handles the login-process.
 * @returns {boolean} A boolean indicating if the login process succeeded or if it didn't.
 */
async function login_handler(event) {

    event.preventDefault();
    const userInfo = db.getUser($('#username').val());
    const enteredPassword = await digestMessage($('#password').val());

    if (userInfo == undefined) {
        show_incorrect();
    }
    else if (userInfo.password != enteredPassword) {
        show_incorrect();
    }
    else if (userInfo.password == enteredPassword) {
        show_correct(userInfo);
    }
}

function show_incorrect() {
    $('#error_msg').css("display", "block");

}

/**
 * 
 * @param {User} user User object containing information about the current user.
 */
function show_correct(user) {
    db.setCurrentUser(user);
    switch (user.credentials) {
        case ACCESS_LEVELS.VIP:
            $('#login-window').css("display", "none");
            break;
        default:
            window.location.href = "index.html"
            break;
    }
}

jQuery(function () {
    $('form').on('submit', login_handler);
});