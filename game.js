//variables and arrays to be used in game
var deck = [];
var playerMoney = [];
var playerCards = [];
var cardCount;
var deckRemain;

//function to declare objects of 2 strings which hold the cards that the
//players possess
function handCards(card1,card2) {
  this.firstcard = card1
  this.secondcard = card2
}

//function to shuffle cards
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//function that gives players money, shuffles deck, deals cards, and sends
//players private message before game begins
function beforeCoup(playerNum, ambassadorInquisitor) {
  if (playerNum == 2) {
    playerMoney.push(1);
    playerInfo.push(2);
    cardCount = 3;
  }
  else {
    for (let i = 1; i <= playerNum; i++) {
      playerMoney.push(2);
    }
    cardCount = Math.ceil((playerNum-5)/3) + 3;
  }
  for (let i = 1; i <= cardCount; i++) {
    deck.push("Captain");
    deck.push("Duke");
    deck.push("Contessa");
    deck.push("Assassin");
    if (ambassadorInquisitor == 1) {
      deck.push("Ambassador");
    }
    else if (ambassadorInquisitor == 2) {
      deck.push("Inquisitor");
    }
  }
  deck = shuffleArray(deck);
  for (let i = 1; i <= playerNum; i++) {
    playerCards.push(new handCards(deck[i-1],deck[i+playerNum-1]));
  }
  deckRemain = deck.length - 2 * playerNum;
  console.log(deckRemain);
  deck.splice(0, 2*playerNum);
  console.log(playerCards);
  console.log(deck);
  console.log(deck.length);
}

beforeCoup(6,2);
