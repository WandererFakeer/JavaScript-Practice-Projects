// DOM references
const imageAuthorName = document.querySelector("#bg-image-author-name");
const stockMarketSection = document.querySelector("#stock-market-section");
const weatherSection = document.querySelector("#weather-section");
const time = document.querySelector("#time");
const todoSection = document.querySelector("#random-todo-list");
const quoteSection = document.querySelector("#quote-section");

const FIXED_VARIABLES = {
  UNSPLASH_IMAGE_LINK:
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
  FALLBACK_IMAGE:
    "https://images.unsplash.com/photo-1494935362342-566c6d6e75b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjUxMTMxNzR8&ixlib=rb-4.1.0&q=85",
  FALLBACK_AUTHOR: "Cristina Gottardi",
  STOCK_INDEX_URL: "https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN", 
  STOCK_INDEX_REFRESH_TIME: 15 * 60 * 1000, 
  WEATHER_URL:
    "https://apis.scrimba.com/openweathermap/data/2.5/weather?q=kolkata&units=metric",
  WEATHER_REFRESH_TIME: 60 * 60 * 1000,
  TIME_REFRESH_TIME: 1 * 60 * 1000,
  BORED_TODO: "https://apis.scrimba.com/bored/api/activity",
  NUMBER_OF_TODOS: 2, 
  QUOTE_URL: "https://thequoteshub.com/api/"
};

const state = {
  bgImage: "",
  bgImageAuthor: "",
  bgImageAuthorLink: "",
  stockMarketImageURL: "",
  stockMarketName: "",
  stockMarketIndexArray: [],
  stockMarketChange: "",
  weatherImageURL: "",
  weatherTemp: "",
  weatherState: "",
  currentTime: null,
  todoArray: [], 
  quote: "", 
  quoteAuthor: ""
};

// Function to render
function render() {
  // Backgroun image and author details
  document.body.style.backgroundImage = `url(${state.bgImage})`;

  imageAuthorName.innerHTML = "";

  const authorLink = document.createElement("a");
  authorLink.href = state.bgImageAuthorLink;
  authorLink.textContent = state.bgImageAuthor;
  authorLink.target = "_blank";

  imageAuthorName.textContent = "By: ";
  imageAuthorName.append(authorLink);

  // To-do section
  todoSection.innerHTML = "";

  const fragment = document.createDocumentFragment();

  state.todoArray.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    fragment.append(listItem);
  });

  todoSection.append(fragment);
  
  // Quote section
  quoteSection.innerHTML = "";
  
  const quote = document.createElement("h2");
  quote.classList.add("quote");
  quote.textContent = state.quote;
  
  const quoteAuthor = document.createElement("h3");
  quoteAuthor.classList.add("quote-author");
  quoteAuthor.textContent = `- ${state.quoteAuthor}`;
  
  quoteSection.append(quote, quoteAuthor);
}

// Function to get random photo and photo data
async function getPhotoData() {
  const response = await fetch(FIXED_VARIABLES.UNSPLASH_IMAGE_LINK);
  return await response.json();
}

// Function to set background image and author
async function setPhotoDetails() {
  try {
    const data = await getPhotoData();
    state.bgImage = data.urls.full;
    state.bgImageAuthor = data.user.name;
    state.bgImageAuthorLink = data.user.links.html;
  } catch (error) {
    state.bgImage = FIXED_VARIABLES.FALLBACK_IMAGE;
    state.bgImageAuthor = FIXED_VARIABLES.FALLBACK_AUTHOR;
  }
}

// Function to get stock market data
async function getStockMarketData() {
  try {
    const response = await fetch(FIXED_VARIABLES.STOCK_INDEX_URL);

    if (!response.ok) {
      throw Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error(`getStockData error:, ${error}`);
  }
}

// Function to set stock market data
async function setStockMarketData() {
  const data = await getStockMarketData();
  
  state.stockMarketImageURL = "https://i.postimg.cc/tC8xq1sr/sensex.jpg";
  state.stockMarketName = data.data.company;
  state.stockMarketIndexArray = [
    data.data.pricecurrent,
    data.data.HIGH,
    data.data.LOW,
  ];

  const changeRate = Number(data.data.CHANGE);
  if (changeRate > 0) {
    state.stockMarketChange = `▲ ${data.data.CHANGE}`;
  } else {
    state.stockMarketChange = `🔻${data.data.CHANGE}`;
  }
}

// Function to render only stock market data
async function renderStock() {
  await setStockMarketData();

  // Stock market section
  stockMarketSection.innerHTML = "";

  const stockMarketLogo = document.createElement("img");
  stockMarketLogo.alt = "BSE Sensex Logo";
  stockMarketLogo.classList.add("stock-market-logo");
  stockMarketLogo.src = state.stockMarketImageURL;

  const stockMarketName = document.createElement("h2");
  stockMarketName.classList.add("stock-market-name");
  stockMarketName.textContent = state.stockMarketName;

  const currentIndex = document.createElement("h3");
  currentIndex.classList.add("current-index");
  currentIndex.textContent = `🎯: ${state.stockMarketIndexArray[0]}`;

  const change = document.createElement("h3");
  change.classList.add("change-index");
  change.textContent = state.stockMarketChange;

  const highIndex = document.createElement("h3");
  highIndex.classList.add("high-index");
  highIndex.textContent = `👍: ${state.stockMarketIndexArray[1]}`;

  const lowIndex = document.createElement("h3");
  lowIndex.classList.add("low-index");
  lowIndex.textContent = `👎: ${state.stockMarketIndexArray[2]}`;

  stockMarketSection.append(
    stockMarketLogo,
    stockMarketName,
    currentIndex,
    change,
    highIndex,
    lowIndex
  );
}

// Function to get weather data
async function getWeatherData() {
  try {
    const response = await fetch(FIXED_VARIABLES.WEATHER_URL);

    if (!response.ok) {
      throw Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error(`Data not available: ${error}`);
  }
}

// Function to set weather data
async function setWeatherData() {
  const data = await getWeatherData();
  
  const getIconURL = "https://openweathermap.org/img/wn/";
  const iconCode = data.weather[0].icon;

  state.weatherImageURL = `${getIconURL}${iconCode}@2x.png`;
  state.weatherTemp = `${Math.round(data.main.temp)}°C`;
  state.weatherState = data.name;
}

// Function to render only weather data
async function renderWeather() {
  await setWeatherData();

  // Update weather section
  weatherSection.textContent = "";

  const weatherIcon = document.createElement("img");
  weatherIcon.classList.add("weather-icon");
  weatherIcon.src = state.weatherImageURL;
  weatherIcon.alt = "Current weather icon";

  const temperature = document.createElement("h2");
  temperature.classList.add("temperature");
  temperature.textContent = state.weatherTemp;

  const placeName = document.createElement("p");
  placeName.classList.add("place");
  placeName.textContent = state.weatherState;

  weatherSection.append(weatherIcon, temperature, placeName);
}

// Function to set current time
function setCurrentTime() {
  const date = new Date();
  const timeOption = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  };

  const currentTime = date.toLocaleTimeString("en-IN", timeOption);

  state.currentTime = currentTime;
}

// Function to update only time rendering
function renderTime() {
  setCurrentTime();

  // Update time section
  time.textContent = state.currentTime;
}

// Function to get random to-do activities
async function getRandomTodo() {
  const response = await fetch(FIXED_VARIABLES.BORED_TODO);
  return await response.json();;
}

// Function to set to-do activities
async function setRandomTodo() {
  state.todoArray = [];

  for (let i = 0; i < FIXED_VARIABLES.NUMBER_OF_TODOS; i++) {
    const data = await getRandomTodo();

    state.todoArray.push(data.activity);
  }
}

// Function to get quote
async function getQuote() {
  const response = await fetch(FIXED_VARIABLES.QUOTE_URL);
  return await response.json();;
}

// Function to set quote
async function setQuote(){
  const data = await getQuote();
  state.quote = data.text;
  state.quoteAuthor = data.author;
}

async function personalDashboard() {
  await setPhotoDetails();
  await renderStock();
  await renderWeather();
  renderTime();
  await setRandomTodo();
  await setQuote();
  
  render();

  setInterval(renderStock, FIXED_VARIABLES.STOCK_INDEX_REFRESH_TIME);
  setInterval(renderWeather, FIXED_VARIABLES.WEATHER_REFRESH_TIME);
  setInterval(renderTime, FIXED_VARIABLES.TIME_REFRESH_TIME);
}

personalDashboard();