// Render map
function renderMap() {
  const ACCESS_TOKEN = "pk.eyJ1Ijoid2FuZGVyZXJmIiwiYSI6ImNrdGNvdWh2YTBsMnUydm1vbW1yeGJsMXIifQ.nbREI0wZb52GY0BTQ9CsqQ";

  const center = [88.36, 22.56];

  // creates the map, setting the container, initial center, and zoom level
  const map = new mapboxgl.Map({
    accessToken: ACCESS_TOKEN,
    container: "map", // container ID
    center: center, // starting position [lng, lat]
    zoom: 7, // starting zoom
  });

  addNavigationsControl(map);
  addDirectionsControl(map, ACCESS_TOKEN);
}

// Add navigation controls
function addNavigationsControl(map) {
  const navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, "top-right");
}

// Add directions
function addDirectionsControl(map, accessToken) {
  const customDetails = { accessToken: accessToken, unit: "metric" };
  const directionControl = new MapboxDirections(customDetails);
  map.addControl(directionControl, "top-left");
}

renderMap();
