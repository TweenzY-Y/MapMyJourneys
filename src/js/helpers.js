import { appState } from "./model.js";
import { REGIONS_NUM } from "./config.js";
const calcPercentage = function () {
  return ((appState.selectedRegions.length / REGIONS_NUM) * 100).toFixed(2);
};

export default calcPercentage;
