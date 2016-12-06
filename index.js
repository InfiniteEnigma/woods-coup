var Discord = require("discord.js");
var bot = new Discord.Client();

var gameActive = false
var players = [];

bot.on("message", msg => {

  let prefix = "!";

  if (!msg.content.startsWith(prefix)) return;

  //Test bot response.
  else if (msg.content.startsWith(prefix + "ping")) {
    msg.channel.sendMessage("Hi " + msg.author + "!");
  }

  //Joining a game if game is inactive
  else if (((msg.content.startsWith(prefix + "join")) || (msg.content.startsWith(prefix + "j"))) && (gameActive == false)) {
    if (players.indexOf(msg.author) === -1) {
      players.push(msg.author);
      msg.channel.sendMessage(msg.author + " has joined the game!");
    }
    else {
      msg.channel.sendMessage("Error joining the game! Perhaps you are already entered?");
    }
  }

  //Leaving a game if game is inactive
  else if (((msg.content.startsWith(prefix + "leave")) || (msg.content.startsWith(prefix + "l"))) && (gameActive == false)) {
    if (players.indexOf(msg.author) === -1) {
      msg.channel.sendMessage("You are not in the game!");
    }
    if (players.indexOf(msg.author) > -1) {
      players.splice(players.indexOf(msg.author), 1);
      msg.channel.sendMessage("You have been removed from the game!");
    }
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("yourcomplicatedBotTokenhere");
