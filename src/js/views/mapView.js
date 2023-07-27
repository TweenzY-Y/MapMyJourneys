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
    this.map = L.map("map", {
      minZoom: 3,
      maxZoom: 8,
    }).setView([51.505, -0.09], 3);
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
          layer.setStyle({
            fillColor: Settings.HOVER_COLOR,
          });
          regionNameEl.textContent = layer.region;
          regionNameEl.classList.add("active");
        },
        mouseout: function () {
          if (!layer.isSelected) {
            layer.setStyle({
              fillColor: Settings.DEFAULT_COLOR,
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
            controlRegionAdd(layer.region);
          } else {
            controlRegionRemove(layer.region);
          }
        },
      });
      layer.addTo(this.map);
    });
  }
}

export default new mapView();
