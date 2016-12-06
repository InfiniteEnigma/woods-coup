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
  else if (((msg.content.startsWith(prefix + "join")) || (msg.content.startWith(prefix + "j"))) && (gameActive == false)) {
    var temp = players.indexOf(msg.author);
    if (temp == -1) {
      players = players.push(msg.author);
      msg.channel.sendMessage(msg.author + " has joined the game!");
    }
    else {
      msg.channel.sendMessage("Error joining the game! Perhaps you are already entered?");
    }
  }

  //Leaving a game if game is inactive
  else if (((msg.content.startsWith(prefix + "leave")) || (msg.content.startWith(prefix + "l"))) && (gameActive == false)) {
    var temp = players.indexOf(msg.author);
    if (temp == -1) {
      msg.channel.sendMessage("You are not in the game!");
    }
    if (temp > -1) {
      players = players.splice(pos, temp);
      msg.channel.sendMessage("You are have been removed from the game!");
    }
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("yourcomplicatedBotTokenhere");
