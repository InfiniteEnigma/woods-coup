var Discord = require("discord.js");
var bot = new Discord.Client();

//include meta.js
var meta = require('fs');
eval(meta.readFileSync('meta.js')+'');

//Global variables
var gameActive = false;       // has the game begun?
var ambassadorInquisitor = 0; // 0 = game has not started; 1 = ambassador; 2 = inquisitor
var players = [];             // list of players in the game
var playersGame = [];         // list of player info, cards, that stuff
var courtDeck = [];           // list of cards in the deck if game is active.

bot.on("message", msg => {

  let prefix = "!";

  if (msg.channel.type == "text") {

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
      startGame(msg, players, ambassadorInquisitor, gameActive, playersGame);
      if ((msg.content = "!start a" || "!start i") && (gameActive == true)) {
        //reloads game.js everytime start is called.
        var coupGame = require('fs');
        eval(coupGame.readFileSync('game.js')+'');
        console.log(ambassadorInquisitor);
	      playersGame = beforeCoup(players.length, ambassadorInquisitor, players)                                                                                       ;
        courtDeck = deck;
        console.log(courtDeck);
        for (let i in playersGame) {
          playersGame[i].playerID.sendMessage("Welcome to Coup!\n ``` Card One: " + playersGame[i].firstcard +
                                              "\n Card Two: " + playersGame[i].secondcard + "\n Cash: " +
                                              playersGame[i].balance + "```" + "Thank you for playing!");
        }
      }
    }

    //Kills game
    else if (msg.content == "!killgame") {
      gameActive = false;
      players = [];
      ambassadorInquisitor = 0;
      msg.channel.sendMessage("The game has been killed and all players have been purged! Please type '!join' to rejoin the game.");
      //killGame(msg, gameActive, players, ambassadorInquisitor);
      //console.log(gameActive, players, ambassadorInquisitor);
      playersGame = [];
      courtDeck = [];
    }

  } //closes if channel is group

  //loops 5 time for some reason
  //else if (msg.channel.type != "text") {
  //  msg.channel.sendMessage("Please do not DM this bot!");
  //}

});

bot.on('ready', () => {
  console.log('Ready to roll! \n');
});

bot.login("tokenGoesHere");
