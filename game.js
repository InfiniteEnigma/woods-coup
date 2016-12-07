//variables and arrays to be used in game
var deck = [];
var playerInfo = [];
var cardCount;
var deckRemain;

//function to declare objects that hold the cards of the player, the balance of the player, and the player number
function handCards(card1, card2, money, playernum) {
  this.firstcard = card1;
  this.secondcard = card2;
  this.balance = money;
  this.playerVal = playernum;
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

//function that gives players money, shuffles deck, deals cards, assigns each player a player number, and sends players private message before game begins
function beforeCoup(playerNum, ambassadorInquisitor) {
  cardCount = Math.ceil((playerNum-5)/3) + 3;
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
  if (playerNum == 2) {
    playerInfo.push(new handCards(deck[0],deck[2], 1));
    playerInfo.push(new handCards(deck[1],deck[3], 2));
  }
  else {
    for (let i = 1; i <= playerNum; i++) {
      playerInfo.push(new handCards(deck[i-1],deck[i+playerNum-1], 2, i));
    }
  }
  deckRemain = deck.length - 2 * playerNum;
  deck.splice(0, 2*playerNum);
  console.log(playerInfo);
  console.log(deck);
  for (let i = 1; i <= playerNum; i++) {
    //find a way to make sure players are random and get a random hand and stuff
  }
}

beforeCoup(6,2);
