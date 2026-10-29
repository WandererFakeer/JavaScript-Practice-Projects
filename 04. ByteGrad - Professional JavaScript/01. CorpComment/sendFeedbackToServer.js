// SEND LIVE FEEDBACK DATA TO SERVER

import {BASE_URL, state} from "./globalReferencesAndState.js";

// Send feedback to server
async function sendFeedbackToServer(){
  const request = await fetch(`${BASE_URL}/feedbacks`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(state.userEnteredData), 
  });

  try{
    if(!request.ok){
      console.log("Something went wrong");
      return;
    }

    console.log("Successfully sent data")
  }

  catch(error){
    console.log(error);
  }
}

export default sendFeedbackToServer;