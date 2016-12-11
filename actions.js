function checkCard(player) { //takes in a handCards object of playerInfo/playersGame; only when the player is alive | ie. playersGame[1]
  var card = "";
  if ((player.firstcard == "dead") && (player.secondcard != "dead")) {
    card = player.secondcard;
  }
  else if (player.secondcard == "dead" && player.firstcard != "dead") {
    card = player.firstcard;
  }
  else {
    var whichCard = Math.random();
    if (whichCard >= 0.5) {
      card = player.secondcard;  //player.secondcard;
    }
    else if (whichCard < 0.5) {
      card = player.firstcard; //player.firstcard;
    }
  }
  return card;
}
