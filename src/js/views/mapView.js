import regionsData from "../../data/countries.json" assert { type: "json" };
import { controlRegionAdd, controlRegionRemove } from "../controller.js";
import * as Settings from "../config.js";

const regionNameEl = document.querySelector(".region-name");

class mapView {
  map;

  selectRegion(regionName) {
    this.map.eachLayer(function (layer) {
      if (layer.region === regionName) {
        layer.setStyle({
          fillColor: Settings.SELECTED_REGION_COLOR,
          fillOpacity: 1,
        });
        layer.isSelected = true;
      }
    });
  }
  unselectRegion(regionName) {
    this.map.eachLayer(function (layer) {
      if (layer.region === regionName) {
        layer.setStyle({
          fillColor: Settings.DEFAULT_COLOR,
          fillOpacity: 1,
        });
        layer.isSelected = false;
      }
    });
  }

  renderBaseMap() {
    this.map = L.map("map").setView([51.505, -0.09], 3);

    /*     L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 8,
        minZoom: 3,
        noWrap: true,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ); */
  }

  renderRegionLayers() {
    Object.entries(regionsData.features).forEach((element) => {
      const layer = L.geoJSON(element[1].geometry);
      layer.region = element[1].properties.ADMIN;
      layer.setStyle({
        fillColor: Settings.DEFAULT_COLOR,
        weight: 1,
        opacity: 1,
        color: "black",
        fillOpacity: 1,
      });
      layer.on({
        mouseover: function () {
          if (!layer.isSelected) {
            layer.setStyle({
              fillColor: Settings.HOVER_COLOR,
            });
          } else {
            layer.setStyle({
              fillColor: Settings.HOVER_COLOR,
            });
          }
          regionNameEl.textContent = layer.region;
          regionNameEl.classList.add("active");
        },
        mouseout: function () {
          if (!layer.isSelected) {
            layer.setStyle({
              fillColor: Settings.DEFAULT_COLOR,
              fillOpacity: 1,
            });
          } else {
            layer.setStyle({
              fillColor: Settings.SELECTED_REGION_COLOR,
            });
          }
          regionNameEl.classList.remove("active");
        },
        click: function () {
          if (!layer.isSelected) {
            layer.setStyle({
              fillColor: "#ffbea1",
              fillOpacity: 0.5, // Set the fill opacity
            });
            controlRegionAdd(layer.region);
            layer.isSelected = true;
          } else {
            layer.setStyle({
              fillColor: "#ffbea1",
              fillOpacity: 0.75, // Set the fill opacity
            });
            layer.isSelected = false;
            controlRegionRemove(layer.region);
          }
        },
      });
      layer.addTo(this.map);
    });
  }
}

export default new mapView();
