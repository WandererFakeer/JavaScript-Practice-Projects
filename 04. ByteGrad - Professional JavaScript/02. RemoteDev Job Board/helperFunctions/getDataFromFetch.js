// Helper function to get data from fetch request
async function getDataFromFetch(fullURL){
  
  try{
    const response = await fetch (fullURL);
    const data = await response.json();

    if(!response.ok){
      throw new Error(data);
    }
  
    return data;
  }

  catch(error){
    console.error(error);
  }
}

export default getDataFromFetch;