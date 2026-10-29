// DOM reference
const titleInput = document.querySelector("input");
const bodyInput = document.querySelector("textarea");
const formEl = document.querySelector("form");
const mainArticleArea = document.querySelector("main");

const baseURL = "https://apis.scrimba.com/jsonplaceholder/";

const request = new Request(`${baseURL}posts`);

const state = {
  posts: []
};

// Function to render
function render(){
 
  mainArticleArea.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  
  state.posts.forEach( (returnedObject) => {
    
    // Create the individual article, h2, and p elements
    const article = document.createElement("article");
    const heading = document.createElement("h2");
    const para = document.createElement("p");
  
    heading.textContent = returnedObject.title;
    para.textContent = returnedObject.body;
    
    // Append the heading/para to the article
    article.append(heading, para);
    
    // Append the complete article to the fragment
    fragment.append(article);

  })
  
  mainArticleArea.append(fragment);
  
}

// Function to fetch and return data slice
async function sendReq(){
  const response = await fetch(request, {method: "GET"});
  
  const data = await response.json();
  
  return data.slice(0, 5);
}

// Function to handle initial data load
async function initialize(){
  
  // Fetch data and populate the state array
  state.posts = await sendReq();
  
  // Render the initial data
  render();
}

// Function to send data
async function postTitleAndBody(event){
  event.preventDefault();
  
  const response = await fetch(request, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleInput.value, 
      body: bodyInput.value
    }),
  })
  
  const data = await response.json()
  state.posts.unshift(data);
  
  // Rerender page with updated state
  render();
  
  // Clear the form inputs
  formEl.reset();
}

initialize();

// Event Listener
formEl.addEventListener("submit", postTitleAndBody);