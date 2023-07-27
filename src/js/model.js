import { REGIONS_NUM } from "./config.js";

const appState = {
  selectedRegions: [],
};

const getUserSelectedRegions = function () {
  appState.selectedRegions =
    JSON.parse(localStorage.getItem("user-selected-regions")) || [];
};

const addRegion = function (regionName) {
  appState.selectedRegions.push(regionName);
};

const removeRegion = function (regionName) {
  appState.selectedRegions = appState.selectedRegions.filter(
    (region) => region !== regionName
  );
};

const saveUserSelectedRegions = function () {
  localStorage.setItem(
    "user-selected-regions",
    JSON.stringify(appState.selectedRegions)
  );
};

export {
  appState,
  getUserSelectedRegions,
  addRegion,
  removeRegion,
  saveUserSelectedRegions,
};
