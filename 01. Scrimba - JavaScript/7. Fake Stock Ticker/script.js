// DOM reference
const stockPrice = document.querySelector("#price");
const priceSymbol = document.querySelector("#price-symbol");
const time = document.querySelector("#time");
const announce = document.querySelector("#announcement");

const state = {
  priceArray: [0],
  price: 0,
  trend: "flat", // "up" | "down" | "flat"
  symbol: "",
  time: null
}

// Function to render
function render(){
  stockPrice.textContent = state.price.toFixed(2);
  stockPrice.dataset.trend = state.trend;
  priceSymbol.innerHTML = state.symbol;
  time.textContent = state.time;
  announce.textContent = `Price: ${state.price.toFixed(2)}, Time: ${state.time}`;
}

// Function to get price
function getCurrentStockPrice(){
  state.price = (Math.random() * 3);
  state.priceArray.push(state.price);
}

// Function to keep array to include only previous and current prices
function trimArray(){
  if (state.priceArray.length > 2){
    state.priceArray.shift();
  }
  return;
}

// Function to decide arrow and trend
function getCurrentSymbol(){
  const lastIndex = (state.priceArray.length - 1);
  const currentPrice = state.priceArray[lastIndex];
  const previousPrice = state.priceArray[lastIndex - 1];
  
  if(currentPrice > previousPrice){
    state.trend = "up";
    state.symbol = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 520" width="600" height="520">
  <polygon points="300,0 600,520 0,520" fill="limegreen"/>
</svg>`
    
    return;
  }
  
  if(currentPrice < previousPrice){
    state.trend = "down";
    state.symbol = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 520" width="600" height="520">
  <polygon points="0,0 600,0 300,520" fill="red"/>
</svg>`
    
    return;
  }
  
  else{
    state.trend = "flat";
    state.symbol = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 520" width="600" height="520">
  <polygon points="0,0 520,260 0,520" fill="grey"/>
</svg>`
    
    return;
  }
  
}

// Function to get time
function getTime(){
  const date = new Date();
  state.time = date.toLocaleTimeString();
}

// Function to handle stock ticker
function handleStockTicker(){
  // Push new price
  getCurrentStockPrice();
  
  // Keep last two values only
  trimArray();
  
  // Arrow and trend
  getCurrentSymbol();
  
  // Time
  getTime();
  
  // Render DOM
  render();
}

// Initialize
handleStockTicker();

// setInterval
setInterval(handleStockTicker, 2000);