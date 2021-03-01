//Update the account balance using the teacher's
//changeBalance as an auxiliary function
function updateAccount(userID, amt_to_add_or_remove) {
    var oldBalance = getAccountBalance(userID);
    var newBalance = Number(oldBalance) + Number(amt_to_add_or_remove);

    if (newBalance < 0) {
	var msg = "Not enough credit in the account.";
	alert(msg);
    }
    else {
	for (i = 0; i < DB.users.length; i++) {
	    if (DB.users[i].user_id == userID) {
		var userName = DB.users[i].username;
		changeBalance(userName, newBalance);
	    }
	}
    }
}

//Get account balance of user with userID.
function getAccountBalance(userID) {

    for (i = 0; i < DB.account.length; i++) {
	if (DB.account[i].user_id == userID) {
	    var balance = DB.account[i].creditSEK;
	    return balance;
	}
    }

    var msg = "UserID not in list.";
    alert(msg);
    return 0;
}

// =====================================================================================================
// This function will change the credit amount in the user's account. Note that the amount given as argument is the new
// balance and not the changed amount (± balance).
//
function changeBalance(userName, newAmount) {

    // We use this variable to store the userID, since that is the link between the two data bases.
    var userID;

    // First we find the userID in the user data base.
    //
    for (i = 0; i < DB.users.length; i++) {
	if (DB.users[i].username == userName) {
	    userID = DB.users[i].user_id;
	};
    };

    // Then we match the userID with the account list.
    // and change the account balance.
    //
    for (i = 0; i < DB.account.length; i++) {
	if (DB.account[i].user_id == userID) {
	    DB.account[i].creditSEK = newAmount;   // This changes the value in the JSON object.
	};
    };
}
