/* function discardCard(player) {
  player.playerID.sendMessage("Please select a card to discard:\n1. " + player.firstcard + "\n2. " + player.secondcard);
  //counter {
    bot.on("message", discard => {
      if (discard.author == player.playerID) {
        if (discard.content.)
      }
    });
  //counter }
}

function challenge(arg, challenger, challengee, role) {//challenger = person challenging, challengee = person challanged, role = role being challenged
  if (role != (challengee.firstcard || challengee.secondcard)) { //ie. challenger is right

  }
  else if (role == (challengee.firstcard || challengee.secondcard)) { //ie. challenger is wrong

  }
}

//counter
function counter() {
  currentTime = Date.now();
  endTime = Date.now() + 60000;
  tenFiveFourThreeTwoOne = [false,false,false,false,false,false];
  while (initTime < endTime) {

    currentTime = Date.now();
  }
} */

function checkCard(stalkee, arrayOfInfo, arg) { //takes in a handCards object of playerInfo/playersGame; only when the player is alive | ie. playersGame[1]
  var card = "";
  for (let i in arrayOfInfo) {
    if (arrayOfInfo[i].playerID == stalkee) {
      if ((arrayOfInfo[i].firstcard == "dead") && (arrayOfInfo[i].secondcard != "dead")) {
        card = arrayOfInfo[i].secondcard;
      }
      else if (arrayOfInfo[i].secondcard == "dead" && arrayOfInfo[i].firstcard != "dead") {
        card = arrayOfInfo[i].firstcard;
      }
      else {
        var whichCard = Math.random();
        if (whichCard >= 0.5) {
          card = arrayOfInfo[i].secondcard;  //player.secondcard;
        }
        else if (whichCard < 0.5) {
          card = arrayOfInfo[i] .firstcard; //player.firstcard;
        }
      }
    }
  }

  turn += 1
  if (turn > (playersGame.length-1)) {
    turn = 0;
  }
  arg.channel.sendMessage(arrayOfInfo[turn].playerID + ", it's your turn!");
  return card;
}

function income(arg, arrayOfInfo, player) { // not challengeable
  var valid = false;
  for (let i in arrayOfInfo) {
    if (arrayOfInfo[i].playerID == player) {
      arrayOfInfo[i].balance += 1;
      valid = true;
      arg.channel.sendMessage(player + "'s wallet is now " + arrayOfInfo[i].balance + " coins.")

      turn += 1
      if (turn > (playersGame.length-1)) {
        turn = 0;
      }
      arg.channel.sendMessage(playersGame[turn].playerID + ", it's your turn!");
    }
  }
  if (valid == false) {
    arg.channel.sendMessage("You are not in the game!");
  }
}

function foreignAid(arg, arrayOfInfo, player) {
  var valid = false;
  /*
  write code for Duke blocking here
  */
  for (let i in arrayOfInfo) {
    if (arrayOfInfo[i].playerID == player) {
      arrayOfInfo[i].balance += 2;
      valid = true;
      arg.channel.sendMessage(player + "'s wallet is now " + arrayOfInfo[i].balance + " coins.")

      turn += 1
      if (turn > (playersGame.length-1)) {
        turn = 0;
      }
      arg.channel.sendMessage(arrayOfInfo[turn].playerID + ", it's your turn!");
    }
  }
  if (valid == false) {
    arg.channel.sendMessage("You are not in the game!");
  }
}

function tax(arg, arrayOfInfo, player) {
  var valid = false;
  /*
  write code for challenging here
  */
  for (let i in arrayOfInfo) {
    if (arrayOfInfo[i].playerID == player) {
      arrayOfInfo[i].balance += 3;
      valid = true;
      arg.channel.sendMessage(player + "'s wallet is now " + arrayOfInfo[i].balance + " coins.")

      turn += 1
      if (turn > (playersGame.length-1)) {
        turn = 0;
      }
      arg.channel.sendMessage(arrayOfInfo[turn].playerID + ", it's your turn!");
    }
  }
  if (valid == false) {
    arg.channel.sendMessage("You are not in the game!");
  }
}

function steal(arg, player, arrayOfInfo) { //player is person stolen from
  var amountStolen = 0;
  for (let i in arrayOfInfo) { //steal
    if (arrayOfInfo[i].playerID == player) {
      if (arrayOfInfo[i].balance == 1) {
        arrayOfInfo[i].balance = 0;
        amountStolen = 1;
      }
      else if (arrayOfInfo[i].balance >= 2) {
        arrayOfInfo[i].balance -= 2;
        amountStolen = 2;
      }
      arg.channel.sendMessage(player + " now has " + arrayOfInfo[i].balance + " coins.")
    }
  }
  for (let i in arrayOfInfo) {
    if (arrayOfInfo[i].playerID == arg.author) {
      arrayOfInfo[i].balance += amountStolen;
      arg.channel.sendMessage(arg.author + " now has " + arrayOfInfo[i].balance + " coins.")
    }
  }
}

function kill(AorC, target, killer) {

}
