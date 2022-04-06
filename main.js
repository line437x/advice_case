"use strict";

import { getPageInsight, getCarbonMetrics } from "./js/api";
import { postHandler, getDataDB, getRelevantData } from "./js/databse";
async function init() {
	//getDataDB(url, apiKey);

	// getPageInsight("designbymagnus.dk");

	// POST Metrics
	// const metrics = await getCarbonMetrics("designbymagnus.dk", "Porn");
	// postHandler(metrics);

	// getRelevantData("aaaaa.dk/");

	const url = "designbymagnus.dk";

	//? First step
	//todo Check for input

	//todo When generate is clicked, get input

	//todo Check if input exists in database
	const data = await getRelevantData(url);
	console.log("This is the returned data " + data);

	//todo If yes, show relevant data

	//todo If no, GET website carbon data and set flag to false
	//todo Show data

	//? Second step
	//todo Check if generate further is clicked

	//todo If flag false

	//todo Get page insight

	//todo merge carbon + page insight

	//todo POST All data

	//todo show LOADING SCREEN

	//todo show result

	//todo click share result
}

init();
