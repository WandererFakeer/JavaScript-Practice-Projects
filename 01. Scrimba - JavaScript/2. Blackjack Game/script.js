// DOM references
const statement = document.querySelector("#heading");
const cardsHand = document.querySelector("#hand");
const cardsSum = document.querySelector("#sum");
const startGameButton = document.querySelector("#start");
const newCardButton = document.querySelector("#new");

// Save state variables as object
const state = {
  cardDeck: buildDeck(),
  message: `Want to play Blackjack? Press the "START GAME" button`,
  cardsList: [],
  cardsSum: 0,
  isAlive: false,
  hasBlackjack: false,
};

// Function to build the card deck
function buildDeck() {
  return Array.from({length: 11}, (_, i) => i + 1);
}

// Function to render
function render() {
  statement.textContent = state.message;
  cardsHand.textContent = state.cardsList.join(" ");
  cardsSum.textContent = state.cardsSum;

  // Disable "newButton" button if "state.isAlive" is false or if "state.hasBlackjack" is true
  newCardButton.disabled = !state.isAlive || state.hasBlackjack;
}

// Function to reset the state objects before game starts
function resetState() {
  state.message = `Want to play Blackjack? Press the "START GAME" button`;
  state.cardsList = [];
  state.cardsSum = 0;
  state.isAlive = true;
  state.hasBlackjack = false;
}

// Function for game rules
function normalizeCard(value) {
  if (value === 1) {
    return 11;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}

// Function to generate random value from array and normalize it
function selectRandomCard() {
  const randomIndex = Math.floor(Math.random() * state.cardDeck.length);
  const randomCard = state.cardDeck[randomIndex];
  return normalizeCard(randomCard);
}

// Function to compute sum with "reduce" method
function getSum(array) {
  return array.reduce((sum, current) => sum + current, 0);
}

// Function to evaluate hands
function evaluateHand() {
  if (state.cardsSum < 21) {
    state.isAlive = true;
    state.message = `Press the "New Card" button to deal a new card. Press "Start Game" button to start a new game`;
  } else if (state.cardsSum === 21) {
    state.isAlive = true;
    state.hasBlackjack = true;
    state.message = "You got Blackjack!!";
  } else {
    state.isAlive = false;
    state.message = "Game over";
  }
}

// Function to handle "Start Game" button click
function handleStart() {
  // Reset state with 'resetState()'
  resetState();

  // Draw 2 random cards with "selectRandomCard()"
  state.cardsList.push(selectRandomCard(), selectRandomCard());

  // Get the sum of the 2 cards with "getSum()"
  state.cardsSum = getSum(state.cardsList);

  // Evaluate hands
  evaluateHand();

  // Render on screen
  render();
}

// Function to handle "New Card" button click
function handleNewCard() {
  // If "state.isAlive" is false or "state.hasBlackjack" is true, just return
  if (!state.isAlive || state.hasBlackjack) {
    return;
  }

  // Draw random card with "selectRandomCard()"
  state.cardsList.push(selectRandomCard());

  // Get the sum of the dealt cards with "getSum()"
  state.cardsSum = getSum(state.cardsList);

  // Evaluate hands
  evaluateHand();

  // Render on screen
  render();
}

// Disable "newButton" button at the start of the game
newCardButton.disabled = true;

// Initial render
render();

// Event listeners
startGameButton.addEventListener("click", handleStart);

newCardButton.addEventListener("click", handleNewCard);