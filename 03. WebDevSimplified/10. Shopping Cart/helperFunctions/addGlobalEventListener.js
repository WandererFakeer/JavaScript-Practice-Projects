// Global helper function to register one listener to the document by checking selector and run callback
function addGlobalEventListener(eventType, selector, callback){
  document.addEventListener(eventType, (e) => {
    
    if(e.target && e.target.closest(selector)){
      callback(e);
    }

  })

}

export default addGlobalEventListener;