"use strict";

import { getPageInsight, getCarbonMetrics } from "./js/api";
import { postHandler, getDataDB } from "./js/postDB";
async function init() {
	//getDataDB(url, apiKey);

	// getPageInsight("designbymagnus.dk");

	// POST Metrics
	const metrics = await getCarbonMetrics("designbymagnus.dk", "Porn");
	postHandler(metrics);
}

init();
