// Imports

import mapView from "./views/mapView.js";
import summaryView from "./views/summaryView.js";
import searchResultsView from "./views/searchResultsView.js";
import calcPercentage from "./helpers.js";
import * as model from "./model.js";

// Elements

const searchBarEl = document.querySelector("#region-search");
const resultList = document.querySelector("ul");
const mainAppEl = document.querySelector("main");

// Functions

//// Add and select region
const controlRegionAdd = function (regionName) {
  model.addRegion(regionName);
  model.saveUserSelectedRegions();
  mapView.selectRegion(regionName);
  summaryView.renderSummary(
    model.appState.selectedRegions.length,
    calcPercentage()
  );
};

//// Remove and unselect region
const controlRegionRemove = function (regionName) {
  model.removeRegion(regionName);
  model.saveUserSelectedRegions();
  mapView.unselectRegion(regionName);
  summaryView.renderSummary(
    model.appState.selectedRegions.length,
    calcPercentage()
  );
};

// Event listeners

searchBarEl.addEventListener("input", (e) => {
  searchResultsView.displayQueryResults(e.target.value);
});

searchBarEl.addEventListener("focus", () => {
  if (searchBarEl.value !== "") {
    searchResultsView.showResultsView();
  }
});

resultList.addEventListener("click", (e) => {
  if (model.appState.selectedRegions.includes(e.target.innerText)) {
    controlRegionRemove(e.target.innerText);
  } else {
    controlRegionAdd(e.target.innerText);
  }
  searchBarEl.value = "";
  resultList.style.display = "none";
});
mainAppEl.addEventListener("click", searchResultsView.hideResultsView);

// App logic

//// Render map
mapView.renderBaseMap();
mapView.renderRegionLayers();
model.getUserSelectedRegions();
if (model.appState.selectedRegions.length > 0) {
  model.appState.selectedRegions.forEach((region) => {
    mapView.selectRegion(region);
  });
}
//// Render summary
summaryView.renderSummary(
  model.appState.selectedRegions.length,
  calcPercentage()
);

export { controlRegionAdd, controlRegionRemove };
