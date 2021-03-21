/**
 * File: user_controller.js
 * Group: Morning Breeze
 * The file contains the controller functions related to the different types of users and their credentials.
 */

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
async function login_handler() {
    const userInfo = db.getUser($('#username').val());
    const enteredPassword = await digestMessage($('#password').val());

    if (userInfo == undefined) {
        show_incorrect();
        return false;
    }
    else if (userInfo.password != enteredPassword) {
        show_incorrect();
        return false;
    }
    else if (userInfo.password == enteredPassword) {
        show_correct(userInfo);
    }

    return false;
}

function show_incorrect() {
    $('#error_msg').css("display", "block");

}

/**
 * Set the href (URL) of the current page depending on the current user's credentials.
 * @param {User} user User object containing information about the current user.
 */
function show_correct(user) {
    switch (user.credentials) {
        case ACCESS_LEVELS.VIP:
            window.location.href = "vip.html?user=" + user.username;
            break;
        case ACCESS_LEVELS.MANAGER:
            window.location.href = "manager.html?user=" + user.username;
            break;
        default:
            window.location.href = "index.html"
            break;
    }
}

/**
 * END of file user_controller.js
 */
