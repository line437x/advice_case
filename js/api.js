"use strict";
export async function getDataDB(url, apiKey) {
	const fetchedData = await fetch(url, {
		async: true,
		crossDomain: true,
		url: url,
		method: "get",
		headers: {
			"content-type": "application/json",
			"x-apikey": apiKey,
			"cache-control": "no-cache",
		},
	});
	const json = await fetchedData.json();

	console.log(json);
}

export async function getPageInsight(url) {
	const pageInsightApiKey = "AIzaSyB5TMLidzXZG4KFFbQjWVmGv1bfUYPrDGg";
	const pageInsightUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${url}&key=${pageInsightApiKey}`;
	const fetchedData = await fetch(pageInsightUrl);
	const json = await fetchedData.json();

	console.log(json);
}

//* GET CARBON METRICS
export async function getCarbonMetrics(url) {
	const carbonApi = `https://kea-alt-del.dk/websitecarbon/site/?url=https://${url}`;
	const fetchedData = await fetch(carbonApi);
	const json = await fetchedData.json();

	console.log(json);
}
