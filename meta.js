/*
Meta actions like leaving, joining
kicking, killing the game, starting,
etc.
*/

function joinGame(arg, array) {
  if (array.indexOf(arg.author) === -1) {
    array.push(arg.author);
    arg.channel.sendMessage(arg.author + " has joined the game!");
  }
  else {
    arg.channel.sendMessage(arg.author + " has had an error joining the game! Perhaps they are already entered?");
  }
}

function leaveGame(arg, array) {
  if (array.indexOf(arg.author) === -1) {
    arg.channel.sendMessage(arg.author + " is not in the game!");
  }
  if (array.indexOf(arg.author) > -1) {
    array.splice(array.indexOf(arg.author), 1);
    arg.channel.sendMessage(arg.author + " has been removed from the game!");
  }
}

function startGame(arg, array) {
  if (gameActive == false) {
    if (array.length >= 2) {
      gameActive = true;
      arg.channel.sendMessage("The game has begun! (Don't bother to) Check your DMs for further info.");
    }
    else {
      arg.channel.sendMessage("Not enough players.");
    }
  }
  else if (gameActive == true) {
    arg.channel.sendMessage("The game has already begun!");
  }
}

function killGame(arg, state, array) {
  if (state == true) {
    state = false;
    array = [];
    arg.channel.sendMessage("The game has been killed and all players have been purged! Please type '!join' to rejoin the game.");
  }
  else if (state == false) {
    arg.channel.sendMessage("The game has not begun yet.");
  }
}
