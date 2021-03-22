// ==========================================================================
// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//

// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    'keys' : ['hello','current-user-table',
    'button-home','button-login', 'change-lang', 'username-label', 'password-label', 'error-login',
            'menu-text'],       // keys for strings
    'pics' : ['pic1'],              // keys for pictures
                                    // pictures have to be
                                    // handled in a special way.

    'en': {
        'hello': "Welcome to this small demonstration",
        'current-user-table': "Choose table: ",
        'button-home' : "Home",
        'button-login' : "Log in",
        'change-lang' : "Svenska",
        'username-label' : "Username",
        'password-label' : "Password",
        'error-login' : "User credenetials were incorrect!",
        'menu-text' : "MENU"
    },
    'sv' : {
        'hello' : "Välkommen till denna lilla demonstration",
        'current-user-table' : "Välj bord: ",
        'button-home' : "Hem",
        'button-login' : "Logga in",
        'change-lang' : "English",
        'username-label' : "Användarnamn",
        'password-label' : "Lösenord",
        'error-login' : "Felaktiga inloggningsuppgifter!",
        'menu-text' : "MENY"
    }
}



// ==========================================================================
// END OF FILE
// ==========================================================================
