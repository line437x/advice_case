"use strict";
import "./sass/main.scss";

import { getPageInsight, getCarbonMetrics } from "./js/api";
import { postHandler, getDataDB, getRelevantData } from "./js/databse";
async function init() {
	const test = document.querySelector("body");
	test.addEventListener("click", () => {
		generateFullRapport();
	});

	let dataExistsFlag;

	const industry = "Porn";
	const url = "malteskjoldager.dk";
	let collectedData;
	// const url = "designbymagnus.dk";

	//? First step
	//todo Check for input

	//todo When generate is clicked, get input

	//? Check if input exists in database
	async function checkDataBaseForExistance() {
		const initialData = await getRelevantData(url);
		console.log("This is the returned data ", initialData);

		//? If yes, show relevant data
		if (Object.keys(initialData).length !== 0) {
			dataExistsFlag = true;
			// console.log("Data exists");
			collectedData = initialData;

			console.log("The object exists: ", collectedData);
		} else {
			//? If no, GET website carbon data and set flag to false
			dataExistsFlag = false;
			collectedData = await getCarbonMetrics(url, industry);

			// console.log("Fetching Carbon data");
			// console.log("Collected Data: ", collectedData);
		}
		await showDataFirstStep(collectedData);
	}

	function showDataFirstStep(dataObj) {
		//todo Show data first step
		console.log("Showind data, first step", dataObj);
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
			console.log("Setting full report data with: ", collectedData);
		}
	}
	//todo show result

	//todo click share result

	checkDataBaseForExistance();
}

init();
