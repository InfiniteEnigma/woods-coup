var Discord = require("discord.js");
var bot = new Discord.Client();

//include meta.js
var meta = require('fs');
eval(meta.readFileSync('meta.js')+'');
/*include meta.js
var coupGame = require('fs');
eval(meta.readFileSync('game.js')+'');*/

var gameActive = false;
var ambassadorInquisitor = 0; // 0 = game has not started; 1 = ambassador; 2 = inquisitor
var players = [];

bot.on("message", msg => {

  let prefix = "!";

  //Test bot response.
  if (msg.content.startsWith(prefix + "ping")) {
    msg.channel.sendMessage("Hi " + msg.author + "!");
  }

  //Joining a game if game is inactive
  else if (((msg.content == "!join") || (msg.content == "!j")) && (gameActive == false)) {
    joinGame(msg, players);
  }

  //Leaving a game if game is inactive
  else if ( ( (msg.content == "!leave") || (msg.content == "!l") ) && (gameActive == false) ) {
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
  else if (msg.content.startsWith("!start")) {
    startGame(msg, players, ambassadorInquisitor);
  }

  //Kills game
  else if (msg.content == "!killgame") {
    gameActive = false;
    players = [];
    ambassadorInquisitor = 0;
    msg.channel.sendMessage("The game has been killed and all players have been purged! Please type '!join' to rejoin the game.");
    //killGame(msg, gameActive, players, ambassadorInquisitor);
    console.log(gameActive, players, ambassadorInquisitor);
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("token");
