var map = L.map("map").setView([51.505, -0.09], 13).tile;

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 8,
    minZoom: 3,
    noWrap: true,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

const layers = [];
Object.entries(countriesData1.features).forEach((element) => {
  var layer = L.geoJSON(element[1].geometry);
  layer.setStyle({
    fillColor: "white", // Set the fill color to yellow (or any other color you like)
    weight: 1, // Set the border weight
    opacity: 1, // Set the opacity
    color: "black", // Set the border color
    fillOpacity: 0.1, // Set the fill opacity
  });
  layer.on({
    mouseover: function () {
      layer.setStyle({
        fillColor: "red",
      });
    },
    mouseout: function () {
      layer.setStyle({
        fillColor: "white",
      });
    },
    click: function () {
      layer.setStyle({
        fillColor: "red",
        fillOpacity: 0.5, // Set the fill opacity
      });
    },
  });
  layer.addTo(map);
});

/* polygon.on({
  click: function (e) {
    var layer = e.target;
    layer.setStyle({ fillColor: "#0000" });
  },
}); */

/* polygon.setStyle({ fillColor: "#0000" }); */
/* map.eachLayer(function (layer) {
  layer.setStyle({ fillColor: "#0000FF" });
});
 */
