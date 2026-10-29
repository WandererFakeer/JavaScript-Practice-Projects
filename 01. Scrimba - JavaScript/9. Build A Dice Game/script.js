// DOM references
const heading = document.querySelector("#heading");
const player1Total = document.querySelector("#player-1-total");
const player2Total = document.querySelector("#player-2-total");
const player1Roll = document.querySelector("#player-1-current-score");
const player2Roll = document.querySelector("#player-2-current-score");
const rollButton = document.querySelector("#roll");
const resetButton = document.querySelector("#reset");
const announce = document.querySelector("#details-announcement");

const statements = [
  "Player 1 Turn",
  "Player 2 Turn",
  "Player 1 Won 🏅",
  "Player 2 Won 🎖️",
  "It's a tie! 🤝",
];

const TARGET_SCORE = 20;

// Variables for game state
const state = {
  gameMessage: statements[0], // "Player 1 Turn"
  totalScore1: 0,
  totalScore2: 0, 
  currentRoll1: "-", 
  currentRoll2: "-",
  player1NumberOfTurns: 0,
  player2NumberOfTurns: 0,
  activePlayer: 1,
  isGameOver: false,
  read: "Player 1 turn. Player 1 score 0. Player 2 score 0. Press Roll Dice to start."
};

// Function to render
function render(){
  heading.textContent = state.gameMessage;
  player1Total.textContent = state.totalScore1;
  player2Total.textContent = state.totalScore2;
  player1Roll.textContent = state.currentRoll1;
  player2Roll.textContent = state.currentRoll2;
  
  // Visual focus for current player and game-over
  player1Roll.classList.toggle("active-player", state.activePlayer === 1 && !state.isGameOver);
  
  player2Roll.classList.toggle("active-player", state.activePlayer === 2 && !state.isGameOver);
  
  // Buttons visibility based on game state
  rollButton.hidden = state.isGameOver;
  resetButton.hidden = !state.isGameOver;
}

// Function to generate random number
function generateRandomNumber(){
  return (Math.floor(Math.random() * 6) + 1);
}

// Function to get current roll
function getCurrentRoll (currentRoll, totalScore){
  currentRoll = generateRandomNumber();
  totalScore += currentRoll;
  
  return [currentRoll, totalScore];
}

// Function to declare winner
function handleWinner(){
  
  // Only decide when both players have taken the same number of turns
  if( (state.player1NumberOfTurns === state.player2NumberOfTurns) && ( (state.totalScore1 >= TARGET_SCORE) || (state.totalScore2 >= TARGET_SCORE) ) ){
    if (state.totalScore1 > state.totalScore2){
      state.gameMessage = statements[2]; // "Player 1 Won 🏅"
      state.read = "Player 1 wins.";
    }
    
    else if(state.totalScore2 > state.totalScore1){
      state.gameMessage = statements[3]; // "Player 2 Won 🎖️"
      state.read = "Player 2 wins.";
    }
    
    else{
      state.gameMessage = statements[4]; // "It's a tie! 🤝"
      state.read = "It's a tie.";
    }
    
    state.isGameOver = true;
    return;
  }
  
  return;
}

// Function to handle roll dice
function handleRollDice(){
  if (state.isGameOver){
    return;
  }
  
  if(state.activePlayer === 1){
    state.gameMessage = statements[1]; // "Player 2 Turn"
    
    // Get current player's roll and total score with "getCurrentRoll()"
    [state.currentRoll1, state.totalScore1] = getCurrentRoll (state.currentRoll1, state.totalScore1);
    
    state.activePlayer = 2;
    
    state.player1NumberOfTurns += 1;
    
    state.read = `Player 1 rolled ${state.currentRoll1}. Total score ${state.totalScore1}.`;
  }
  
  else{
    state.gameMessage = statements[0]; // "Player 1 Turn"
    
    [state.currentRoll2, state.totalScore2] = getCurrentRoll (state.currentRoll2, state.totalScore2);
    
    state.activePlayer = 1;
    state.player2NumberOfTurns += 1;
    state.read = `Player 2 rolled ${state.currentRoll2}. Total score ${state.totalScore2}.`;
  }
  
  // Check winner with "handleWinner()"
  handleWinner();
  
  render();
}

// Function to handle reset game
function handleReset(){
  state.gameMessage = statements[0]; // "Player 1 Turn"
  state.totalScore1 = 0;
  state.totalScore2 = 0; 
  state.currentRoll1 = "-"; 
  state.currentRoll2 = "-";
  state.player1NumberOfTurns = 0;
  state.player2NumberOfTurns = 0;
  state.activePlayer = 1;
  state.isGameOver = false;
  state.read = "Player 1 turn. Player 1 score 0. Player 2 score 0. Press Roll Dice to start.";
 
  render();
}

// Initialize
render();

// Event Listeners
rollButton.addEventListener("click", handleRollDice);

resetButton.addEventListener("click", handleReset);
