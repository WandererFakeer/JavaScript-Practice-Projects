import postData from "./data.js";

/* Popularity Contest 

Iggy the Influencer and Toby the Tiktoker are dying to know
who's more popular on social media. 

Toby's TikToks get an average of 400 likes. On average, how many
likes do Iggy's Instagram posts get? 

In data.js you'll find a list of Iggy's recent posts. 
Use reduce() to write a function that returns the average number of likes.
*/

const contentEl = document.querySelector("h1");

function calcAverageLikes(data) {
  const avgLikes =
    data.reduce((sum, currentValue) => sum + currentValue.likes, 0) /
    data.length;

  return avgLikes.toFixed(2);
}

contentEl.textContent = calcAverageLikes(postData);
