Viewcard = "";

function income(player, wallet) {

}

function checkCard(player) { //takes in a handCards object of playerInfo/playersGame; only when the player is alive | ie. playersGame[1]
  console.log(player);
  console.log(player.firstcard);
  console.log(player.secondcard);
  if ((player.firstcard == "dead") && (player.secondcard != "dead")) {
    Viewcard = player.secondcard;
  }
  else if (player.secondcard == "dead" && player.firstcard != "dead") {
    Viewcard = player.firstcard;
  }
  else {
    var whichCard = Math.round;
    if (whichCard >= 0.5) {
      Viewcard = player.secondcard;  //player.secondcard;
    }
    else if (whichCard < 0.5) {
      Viewcard = player.firstcard; //player.firstcard;
    }
  }
  console.log(Viewcard);
}
