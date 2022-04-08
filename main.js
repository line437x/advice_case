"use strict";
import "./sass/main.scss";

import { getPageInsight, getCarbonMetrics } from "./js/api";
import { postHandler, getDataDB, getRelevantData, getIndustryList } from "./js/databse";
import { displayFirstStep } from "./js/display";
async function init() {
	//? TEST

	let dataExistsFlag;
	let industry;
	let url;
	let collectedData;

	// Get input, URL and Industry
	const form = document.querySelector("form.url-input");
	// console.log(form.elements.submit);

	//? INITIAL SUBMIT
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		// Get input
		url = "www." + form.elements.url.value;
		industry = form.elements.industry.value;

		// Remove hidden from section 2
		document.querySelector("#section2").classList.remove("hidden");
		await checkDataBaseForExistance();

		const industryList = await getIndustryList(industry);
		await displayFirstStep(collectedData, industryList);
	});

	//? GENERATE FULL REPORT
	const generateFullBtn = document.querySelector("[data-generateFull]");
	generateFullBtn.addEventListener("click", () => {
		generateFullRapport();
		// Remove hidden from section 3
		document.querySelector("#section3").classList.remove("hidden");
	});

	//? First step
	//todo Check for input

	//todo When generate is clicked, get input

	//? Check if input exists in database
	async function checkDataBaseForExistance() {
		const initialData = await getRelevantData(url);
		// console.log("This is the returned data ", initialData);

		//? If yes, show relevant data
		if (Object.keys(initialData).length !== 0) {
			dataExistsFlag = true;
			// console.log("Data exists");
			collectedData = initialData;

			// console.log("The object exists: ", collectedData);
		} else {
			//? If no, GET website carbon data and set flag to false
			dataExistsFlag = false;
			collectedData = await getCarbonMetrics(url, industry);

			// console.log("Fetching Carbon data");
			// console.log("Collected Data: ", collectedData);
		}
	}

	//? Second step
	//todo Check if generate further is clicked

	async function generateFullRapport() {
		//todo show LOADING SCREEN
		//? If flag false
		if (!dataExistsFlag) {
			//? Get page insight
			const pageInsightData = await getPageInsight(url);

			// console.log("Full report collected data: ", collectedData);
			// console.log("Full report page insight data: ", pageInsightData);

			//? merge carbon + page insight
			const finalData = {
				...collectedData,
				...pageInsightData,
			};
			//? POST All data
			// console.log("This is the final data: ", finalData);
			await postHandler(finalData);
		} else {
			// console.log("Setting full report data with: ", collectedData);
		}
	}
	//todo show result

	//todo click share result
}

init();
