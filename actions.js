function income(player, wallet) {

}

function checkCard(player) { //takes in a handCards object of playerInfo/playersGame; only when the player is alive | ie. playersGame[1]
  if ((player.firstcard == "dead") && player.secondcard != "dead") {
    return player.secondcard;
  }
  else if (player.secondcard == "dead" && player.firstcard != "dead") {
    return player.firstcard;
  }
  else {
    var whichCard = Math.round;
    if (whichCard >= 0.5) {
      return player.secondcard;
    }
    else if (whichCard < 0.5) {
      return player.firstcard;
    }
  }
}
