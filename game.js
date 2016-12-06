function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function coupGame(playerNum, ambassadorInquisitor) {
  var playerMoney = [];
  var cardCount;
  var deck = [];
  if (playerNum == 2) {
      playerMoney[0] = 1;
      playerMoney[1] = 2;
      cardCount = 3;
  }
  else {
    for (let i in playerNum) {
      playerMoney[i-1] = 2;
      if (playerNum >= 5) {
        cardCount = 3;
      }
      else {
        cardCount = 3 + (Math.ceil((playerNum-5)/3);
      }
    }
  }
  for (let i in cardCount) {
    deck[5*i-1] = "Captain";
    deck[5*i] = "Assassin";
    deck[5*i+1] = "Duke";
    deck[5*i+2] = "Contessa";
    if (ambassadorInquisitor == 1) {
      deck[5*i+3] = "Ambassador";
    }
    else if (ambassadorInquisitor == 2) {
      deck[5*i+3] = "Inquisitor";
    }
  }
  for (var i = 0; i < Math.floor(Math.random()*100) + 1; i++) {
    shuffleArray(deck);
  }
}
coupGame(3,1);
