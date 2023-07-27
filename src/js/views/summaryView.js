const summaryEl = document.querySelector("p");
import { REGIONS_NUM } from "../config.js";

class summaryView {
  renderSummary(visitedRegions, percentage) {
    summaryEl.innerText = `You have visited ${visitedRegions} of ${REGIONS_NUM} regions. (${percentage}%)`;
  }
}

export default new summaryView();
