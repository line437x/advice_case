"use strict";

//* ******************************************** DATABASE METHODS ********************************************

//* ******************************************** EXTERNAL API'S ********************************************
//* GET PAGEINSIGHTS
// export async function getPageInsight(url) {
// 	const pageInsightApiKey = "AIzaSyB5TMLidzXZG4KFFbQjWVmGv1bfUYPrDGg";
// 	const pageInsightUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${url}&key=${pageInsightApiKey}`;
// 	const fetchedData = await fetch("../test.json");
// 	const json = await fetchedData.json();

// 	console.log(json);
// }

export async function getPageInsight(url) {
	const pageInsightApiKey = "AIzaSyB5TMLidzXZG4KFFbQjWVmGv1bfUYPrDGg";
	const pageInsightUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${url}&key=${pageInsightApiKey}`;

	const fetchedData = await fetch(pageInsightUrl);
	const json = await fetchedData.json();

	const cleanData = {
		// Loadtime in seconds and 2 decimals
		load_time: Number((json.lighthouseResult.audits["speed-index"].numericValue / 1000).toFixed(2)),

		// Amount of images
		images_sum: json.lighthouseResult.audits["resource-summary"].details.items[1].requestCount,

		// Image sum to MB and to 2 decimals
		sum_images_size: Number((json.lighthouseResult.audits["resource-summary"].details.items[1].transferSize / Math.pow(1024, 2)).toFixed(2)),

		// Minified JS
		js_minified: json.lighthouseResult.audits["unminified-javascript"].numericValue,

		// Minified CSS
		css_minified: json.lighthouseResult.audits["unminified-css"].numericValue,

		// Amount of images not optimized
		not_webp: json.lighthouseResult.audits["modern-image-formats"].details.items.length,

		// Array of images with totalt bytes and bytes wasted by not being webp
		webp_opti: json.lighthouseResult.audits["modern-image-formats"].details.items.map((el) => {
			const container = {};

			container.totalBytes = el.totalBytes;
			container.wastedWebpType = el.wastedWebpBytes;

			return container;
		}),

		//Video
		video_sum: json.lighthouseResult.audits["efficient-animated-content"].numericValue,
	};

	console.table(cleanData);
	console.log(json);
}

//* GET CARBON METRICS
export async function getCarbonMetrics(url, industry) {
	const carbonApi = `https://kea-alt-del.dk/websitecarbon/site/?url=https://${url}`;
	const fetchedData = await fetch(carbonApi);
	const json = await fetchedData.json();

	const cleanData = {
		url: json.url,
		industry: industry,
		is_green: json.green,
		//Size in MB
		load_size: json.bytes / Math.pow(1024, 2),
		//In %
		cleaner_than: json.cleanerThan * 100,
		//CO2 emitted, renewable and grid combined in g
		co2_emitted: json.statistics.co2.grid.grams + json.statistics.co2.grid.grams,
	};
	console.log(json);
	console.log(cleanData);

	return cleanData;
}
// https://api.websitecarbon.com/
