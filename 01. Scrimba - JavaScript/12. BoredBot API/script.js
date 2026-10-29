// DOM reference
const wholeBody = document.body;
const botHeading = document.querySelector("h1");
const activity = document.querySelector("#activity-normal");
const buttonClick = document.querySelector("button");

const boredURL = "https://apis.scrimba.com/bored/api/activity";

const state = {
  activityText: "",
};

// Function to render
async function render() {
  wholeBody.classList.add("activity-generated-background");
  botHeading.textContent = "😁HappyBot😆";
  botHeading.classList.add("activity-generated-heading");
  activity.textContent = "";
  activity.textContent = state.activityText;
  activity.classList.add("activity-generated-text");
}

// Function to return data from API
async function boredAPIReq() {
  const response = await fetch(boredURL);

  const data = await response.json();

  return data.activity;
}

async function handleClick() {
  state.activityText = await boredAPIReq();
  render();
}

// Event listener
buttonClick.addEventListener("click", handleClick);
