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

function startGame(arg, array, IorA, active, PlayersInfo) {
  if (gameActive == false) {
    if (array.length >= 1) {
      if (arg.content.startsWith("!start")) {
        if (arg.content === "!start i") {
          ambassadorInquisitor = 2; //IorA = 2;
          gameActive = true;
          arg.channel.sendMessage("The game has begun! We will be playing with inquisitors. Check your DMs for further info.");
        }
        else if (arg.content === "!start a") {
          ambassadorInquisitor = 1; //IorA = 1;
          gameActive = true;
          arg.channel.sendMessage("The game has begun! We will be playing with ambassadors. Check your DMs for further info.");
        }
        else {
          gameActive = false;
          arg.channel.sendMessage("Please indicate '!start a' or '!start i' for ambassador or inquisitor");
        }
      }
    }

    else {
      arg.channel.sendMessage("Not enough players.");
      active = false;
    }
  }

  else if (gameActive == true) {
    arg.channel.sendMessage("The game has already begun!");
  }
}

//Not working for some reason
function killGame(arg, state, array, IorA) {
  if (state == true) {
    state = false;
    array = [];
    IorA = 0;
    arg.channel.sendMessage("The game has been killed and all players have been purged! Please type '!join' to rejoin the game.");
    console.log(state, array, IorA);
  }
  else if (state == false) {
    arg.channel.sendMessage("The game has not begun yet.");
  }
}
