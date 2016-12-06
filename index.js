var Discord = require("discord.js");
var bot = new Discord.Client();

//include meta.js
var meta = require('fs');
eval(meta.readFileSync('meta.js')+'');

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
    joinGame(msg, players)
  }

  //Leaving a game if game is inactive
  else if (((msg.content.startsWith(prefix + "leave")) || (msg.content.startsWith(prefix + "l"))) && (gameActive == false)) {
    leaveGame(msg, players)
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("yourcomplicatedBotTokenhere");
