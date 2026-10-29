// Helper function to render pagination page number and buttons

// Render pagination page number
function renderPaginationPageNumber(backButtonEl, nextButtonEl, pageNumber){
  backButtonEl.textContent = `<- Page ${pageNumber - 1}`;
  nextButtonEl.textContent = `Page ${pageNumber + 1} ->`;
}

// Render pagination button
function renderPaginationButton(backButtonEl, nextButtonEl, pageNumber, array, pageResultsNumber){

  if(pageNumber > 1){
    backButtonEl.hidden = false;
  }

  else if(pageNumber === 1){
    backButtonEl.hidden = true;
    nextButtonEl.disabled = false;
  }

  if( (array.length - (pageNumber * pageResultsNumber)) <= 0){
    nextButtonEl.hidden = true;
  }

  else{
    nextButtonEl.hidden = false;
  }
  
  backButtonEl.blur();
  nextButtonEl.blur();
}

function createRenderPaginationButtonAndPageNumber(backButtonEl, nextButtonEl, pageNumber, array, pageResultsNumber){
  renderPaginationPageNumber(backButtonEl, nextButtonEl, pageNumber);
  renderPaginationButton(backButtonEl, nextButtonEl, pageNumber, array, pageResultsNumber);
}

export default createRenderPaginationButtonAndPageNumber;