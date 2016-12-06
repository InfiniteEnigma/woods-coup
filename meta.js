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
