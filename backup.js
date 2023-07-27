import countriesData1 from "./countries.json" assert { type: "json" };

const layers = [];

Object.entries(countriesData1.features).forEach((element) => {
  var layer = L.geoJSON(element[1]);
  layer.setStyle({
    fillColor: "yellow", // Set the fill color to yellow (or any other color you like)
    weight: 1, // Set the border weight
    opacity: 1, // Set the opacity
    color: "black", // Set the border color
    fillOpacity: 0.5, // Set the fill opacity
  });
  layers.push(layer);
});

const base = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 8,
    minZoom: 3,
    noWrap: true,
    id: "osm",
    maxBoundsViscosity: 1,
  }
);
var cities = L.featureGroup(layers);
var map = L.map("map", {
  center: [39.73, -104.99],
  zoom: 8,
  maxZoom: 8,
  minZoom: 3,
  layers: [base, cities],
});
// Create a GeoJSON layer and add it to the map
var countriesLayer = L.geoJSON(countriesData1).addTo(map).setStyle({
  fillColor: "white", // Set the fill color to yellow (or any other color you like)
  weight: 1, // Set the border weight
  opacity: 1, // Set the opacity
  color: "black", // Set the border color
  fillOpacity: 0.5, // Set the fill opacity
});

// Function to highlight the clicked country
function highlightFeature(e) {
  console.log(e.target);
  var layer = e.target;
  layer.setStyle({
    fillColor: "red", // Set the fill color to yellow (or any other color you like)
    weight: 1, // Set the border weight
    opacity: 1, // Set the opacity
    color: "black", // Set the border color
    fillOpacity: 1, // Set the fill opacity
  });
}
// Add click events to the countries layer
/* cities.on({
  click: function () {
    console.log("test");
  },
});
 */

map.eachLayer(function (layer) {
  layer.on({
    click: function () {
      console.log(layer);
    },
  });
});
