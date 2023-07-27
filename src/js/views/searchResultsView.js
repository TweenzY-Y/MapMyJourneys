const resultList = document.querySelector("ul");
import regionsData from "../../data/countries.json" assert { type: "json" };
import { MAXIMUM_QUERY_RESULTS } from "../config.js";

class searchResultsView {
  displayQueryResults(query) {
    resultList.innerHTML = "";
    let results = 0;
    const matchedRegions = regionsData.features.filter((element) => {
      if (query !== "") {
        return element.properties.ADMIN.toLowerCase().includes(
          query.toLowerCase()
        );
      }
    });
    resultList.style.display = "block";
    matchedRegions.forEach((region) => {
      if (results < MAXIMUM_QUERY_RESULTS)
        resultList.insertAdjacentHTML(
          "beforeend",
          `<li>${region.properties.ADMIN}</li>`
        );
      results++;
    });
  }
  showResultsView() {
    resultList.style.display = "block";
  }
  hideResultsView() {
    resultList.style.display = "none";
  }
}

export default new searchResultsView();
