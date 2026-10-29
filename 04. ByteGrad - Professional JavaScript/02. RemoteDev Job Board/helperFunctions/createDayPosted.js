// Helper function to get which day the job was posted

const dateToday = Temporal.Now.plainDateISO();

const dayFormatter = new Intl.DateTimeFormat("en-Us", {
  weekday: "short", 
});

function createDayPosted(data){
  const postedDaysAgoFromToday = dateToday.subtract({ days: data });

  return dayFormatter.format(postedDaysAgoFromToday);
  
}

export default createDayPosted;