// DOM references
const newDeckButtonEl = document.querySelector(".new-deck");
const remaningCardEl = document.querySelector(".remaning-card");
const headingEl = document.querySelector(".heading");
const computerScoreEl = document.querySelector(".computer-score");
const computerImageWrapperEl = document.querySelector(
  "#computer-image-wrapper");
const playerScoreEl = document.querySelector(".player-score");
const playerImageWrapperEl = document.querySelector("#player-image-wrapper");
const drawButtonEl = document.querySelector(".draw-card-button");

const BASE_URL = "https://apis.scrimba.com/deckofcards/api/deck/";
const CARDS = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
};

const state = {
  deckId: 0,
  remaining: 0,
  computerDetails: {
    computerCardURL: "",
    computerScore: 0,
    computerTotalScore: 0,
  },
  playerDetails: { playerCardURL: "", playerScore: 0, playerTotalScore: 0 },
  roundWinner: "Game of War",
};

// Render
function render() {
  remaningCardEl.textContent = state.remaining;

  drawButtonEl.disabled = state.remaining === 0;

  headingEl.textContent = state.roundWinner;

  computerScoreEl.textContent = state.computerDetails.computerTotalScore;
  computerImageWrapperEl.textContent = "";

  // Only create "img" element if "state.computerDetails.computerCardURL" is truthy
  if (state.computerDetails.computerCardURL) {
    const computerCard = document.createElement("img");
    computerCard.src = state.computerDetails.computerCardURL;
    computerImageWrapperEl.append(computerCard);
  }

  playerScoreEl.textContent = state.playerDetails.playerTotalScore;
  playerImageWrapperEl.textContent = "";

  // Only create "img" element if "state.playerDetails.playerCardURL" is truthy
  if (state.playerDetails.playerCardURL) {
    const playerCard = document.createElement("img");
    playerCard.src = state.playerDetails.playerCardURL;
    playerImageWrapperEl.append(playerCard);
  }
}

// Get new Deck ID
async function getNewDeckID() {
  const response = await fetch(`${BASE_URL}new/shuffle/`);
  return response.json();
}

// Reset values
function reset() {
  state.roundWinner = "Game of War";
  state.computerDetails.computerCardURL = "";
  state.computerDetails.computerScore = 0;
  state.computerDetails.computerTotalScore = 0;

  state.playerDetails.playerCardURL = "";
  state.playerDetails.playerScore = 0;
  state.playerDetails.playerTotalScore = 0;
}

// Set new Deck ID
async function setNewDeckID() {
  const data = await getNewDeckID();

  state.deckId = data.deck_id;
  state.remaining = data.remaining;
  remaningCardEl.textContent = state.remaining;
  drawButtonEl.disabled = false;
  reset();
  render();
}

// Get Deck card
async function getNewDeckCard() {
  const response = await fetch(`${BASE_URL}${state.deckId}/draw/?count=2`);
  return response.json();
}

// Find the winner
function getWinner() {
  const compScore = CARDS[state.computerDetails.computerScore];
  const playerScore = CARDS[state.playerDetails.playerScore];

  if (state.remaining === 0) {
    if (
      state.computerDetails.computerTotalScore >
      state.playerDetails.playerTotalScore
    ) {
      state.roundWinner = "The computer won the game";
      return;
    }

    state.roundWinner = "You won the game";
    return;
  }

  if (compScore === playerScore) {
    state.roundWinner = "War";
    return;
  }

  if (compScore > playerScore) {
    state.roundWinner = "Computer won";
    state.computerDetails.computerTotalScore += 1;
    return;
  }

  state.roundWinner = "You won";
  state.playerDetails.playerTotalScore += 1;
  return;
}

// Set Deck card
async function setNewDeckCard() {
  const data = await getNewDeckCard();

  state.computerDetails.computerCardURL = data.cards[0].image;
  state.computerDetails.computerScore = data.cards[0].value;
  state.playerDetails.playerCardURL = data.cards[1].image;
  state.playerDetails.playerScore = data.cards[1].value;
  state.remaining = data.remaining;

  getWinner();
  render();
}

render();

// Event listeners
newDeckButtonEl.addEventListener("click", setNewDeckID);
drawButtonEl.addEventListener("click", setNewDeckCard);