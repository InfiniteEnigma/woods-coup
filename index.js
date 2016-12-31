//include Discord.js
var Discord = require("discord.js");
var bot = new Discord.Client();

//include meta.js
var meta = require('fs');
eval(meta.readFileSync('meta.js')+'');

//include actions.js
var actions = require('fs');
eval(actions.readFileSync('actions.js')+'');

//Global variables
var gameActive = false;       // has the game begun?
var ambassadorInquisitor = 0; // 0 = game has not started; 1 = ambassador; 2 = inquisitor
var players = [];             // list of players in the game
var playersGame = [];         // list of player info, cards, that stuff
var courtDeck = [];           // list of cards in the deck if game is active.
var playerList = "";          // i have too many variables called players lol; this one is for the numbered list
var turn = 0;
var test;                     //timeout function

bot.on("message", msg => {

  if (msg.channel.type == "text") {

    // test countdown
    if (msg.content.startsWith("!cd")) {
      msg.channel.sendMessage("countdown started!");
      test = setTimeout(function() {
        console.log("automatically broken!");
        msg.channel.sendMessage("automatically broken!");
      }, 5000);
    }

    // break countdown
    if (msg == "stopcd") {
      if (test != undefined) {
        console.log("manually broken!");
        msg.channel.sendMessage("manually broken!");
      }
      clearTimeout(test);
      test = undefined;
    }

    //Test bot response.
    if (msg.content.startsWith("!ping")) {
      msg.channel.sendMessage("Hi " + msg.author + "!");
    }

    //Kills game
    else if (msg.content == "!killgame") {
      gameActive = false;
      players = [];
      ambassadorInquisitor = 0;
      msg.channel.sendMessage("The game has been killed and all players have been purged! Please type '!join' to rejoin the game.");
      //killGame(msg, gameActive, players, ambassadorInquisitor);
      playersGame = [];
      courtDeck = [];
      playerList = "";
      turn = 0;
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
    else if (msg.content.startsWith("!players")) {
      if (gameActive == false) {
        if (players.length == 0) {
          msg.channel.sendMessage("There are no players in the game!");
        }
        else {
          msg.channel.sendMessage(players);
        }
      }
      else if (gameActive == true) {
        msg.channel.sendMessage(playerList);
      }
    }

    // when gameActive == true | ie when the game is running
    else if (gameActive == true && msg.content.startsWith("!")) {

      if (msg.author == playersGame[turn].playerID) { //coment this out if testing w/ bots

        if (msg.content.startsWith("!view ") && (gameActive == true)) {
          var stalked = msg.mentions.users.first();
          if (stalked) {
            Card = checkCard(stalked, playersGame, msg);
            msg.channel.sendMessage(msg.author + ", please check your DMs.")
            msg.author.sendMessage(stalked + " has a " + Card + " in his hand.");
          }
          else {
            msg.channel.sendMessage("Not a valid player!");
          }
        }

        else if (msg.content.startsWith("!income") || msg.content.startsWith("!onecoin")) {
          income(msg, playersGame, msg.author);
        }

        else if (msg.content.startsWith("!foreignaid") || msg.content.startsWith("!twocoins")) {
          foreignAid(msg, playersGame, msg.author);
        }

        else if (msg.content.startsWith("!taxes") || msg.content.startsWith("!threecoin") || msg.content.startsWith("!tax")) {
          tax(msg, playersGame, msg.author);
        }

        else if (msg.content.startsWith("!steal ")) {
          var person = msg.mentions.users.first();
          if (person) {
            steal(msg, person, playersGame);
            turn += 1
            if (turn > (playersGame.length-1)) {
              turn = 0;
            }
            msg.channel.sendMessage(playersGame[turn].playerID + ", it's your turn!");
          }
          else msg.channel.sendMessage("Player could not be stealed from.");
        }

      } //ends if message author == whos turn it is

      if (msg.content.startsWith("!me")) {
        //display info about the player
      }

    }

    //Starts game
    else if (msg.content.startsWith("!start")) {
      startGame(msg, players, ambassadorInquisitor, gameActive, playersGame);
      if ((msg.content = "!start a" || "!start i") && (gameActive == true)) {

        //reloads game.js everytime start is called.
        var coupGame = require('fs');
        eval(coupGame.readFileSync('game.js')+'');

	      playersGame = beforeCoup(players.length, ambassadorInquisitor, players)                                                                                       ;
        courtDeck = deck;
        for (let i in playersGame) {
          playersGame[i].playerID.sendMessage("Welcome to Coup!\n ``` Card One: " + playersGame[i].firstcard +
                                              "\n Card Two: " + playersGame[i].secondcard + "\n Cash: " +
                                              playersGame[i].balance + "```" + "Thank you for playing!");
          var tempValue = new Number(parseInt(i)+1)
          playerList = (playerList + tempValue + ". " + playersGame[i].playerID + "\n");
        }
        msg.channel.sendMessage("These are the players playing the game!" + "\n" + playerList);
        msg.channel.sendMessage(playersGame[turn].playerID + ", it's your turn!");
      }
    }

    //FOR TESTING ONLY
    else if (msg.content.startsWith("!forcejoin ")) {
      var person = msg.mentions.users.first();
      if (person) {
        msg.channel.sendMessage(person + " has been forced into the game.");
        players.push(person);
      }
      else msg.channel.sendMessage("Player could not be forced into the game.");
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

bot.on('error', e => { console.error(e); });

bot.login("bot key here");
