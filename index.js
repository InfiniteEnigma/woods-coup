var Discord = require("discord.js");
var bot = new Discord.Client();

//include meta.js
var meta = require('fs');
eval(meta.readFileSync('meta.js')+'');

var gameActive = false;
var players = [];

bot.on("message", msg => {

  let prefix = "!";

  if (!msg.content.startsWith(prefix)) return;

  //Test bot response.
  else if (msg.content.startsWith(prefix + "ping")) {
    msg.channel.sendMessage("Hi " + msg.author + "!");
  }

  //Joining a game if game is inactive
  else if (((msg.content == "!join") || (msg.content == "!j")) && (gameActive == false)) {
    joinGame(msg, players);
  }

  //Leaving a game if game is inactive
  else if (((msg.content == "!leave") || (msg.content == "!l")) && (gameActive == false)) {
    leaveGame(msg, players);
  }

  //Lists players
  else if (msg.content.startsWith(prefix + "players")) {
    if (players.length == 0) {
      msg.channel.sendMessage("There are no players in the game!");
    }
    else {
      msg.channel.sendMessage(players);
    }
  }

  //Starts game
  else if (msg.content == "!start") {
    startGame(msg, players);
  }

  //Kills game
  else if (msg.content == "!killgame") {
    killGame(msg, gameActive, players);
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("token");
