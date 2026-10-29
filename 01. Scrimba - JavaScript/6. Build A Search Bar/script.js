// DOM reference
const searchBar = document.querySelector("#search");
const namesList = document.querySelectorAll(".name");

const state = {
  string: ""
};

// Function to render
function render(){
  namesList.forEach( (name) => {
    const match = name.textContent.toLowerCase().includes(state.string);
    
    // add "no-match" only when there is a non-empty query AND it doesn't match
    name.classList.toggle("no-match", state.string !== "" && !match);
  })
}

// Function to handle search result
function handleSearch(){
  state.string = searchBar.value.toLowerCase(); 
  render();  
}

// Initialize
render();

// Event listener
searchBar.addEventListener("keyup", handleSearch);