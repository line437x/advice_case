//* ******************************************** DATABASE METHODS ********************************************

export function postHandler(payload) {
	const url = "https://advice-95b4.restdb.io/rest/url-db";
	const apiKey = "624bef0c67937c128d7c94e3";

	console.log(payload);
	POST(payload, url, apiKey);

	async function POST(payload, url, apikey) {
		const JSONData = await fetch(url, {
			async: true,
			crossDomain: true,
			url: url,
			method: "post",
			body: JSON.stringify(payload),
			headers: {
				"content-type": "application/json",
				"x-apikey": apikey,
				"cache-control": "no-cache",
			},
		});

		// const test = await JSONData.json();
		// console.log(test);
	}
}

//* GET DATABASE
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
}

export async function getRelevantData(queryUrl) {
	const url = `https://advice-95b4.restdb.io/rest/url-db?q={"url":"https://${queryUrl}/"}`;
	const apiKey = "624bef0c67937c128d7c94e3";

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
	console.log(url);
	console.log(json);
	if (json.length !== 0) {
		console.log("Den her URL findes!");
		const data = { ...json[0] };
		return data;
	} else {
		console.log("Den her url eksisterer ikke");

		return {};
	}
}

export async function getIndustryList(industry) {
	const industryQuery = `https://advice-95b4.restdb.io/rest/url-db?q={"industry":"${industry}"}&sort=co2_emitted`;
	const apiKey = "624bef0c67937c128d7c94e3";

	const fetchedData = await fetch(industryQuery, {
		async: true,
		crossDomain: true,
		url: industryQuery,
		method: "get",
		headers: {
			"content-type": "application/json",
			"x-apikey": apiKey,
			"cache-control": "no-cache",
		},
	});

	const data = await fetchedData.json();
	console.log("The industry list is: ", data);

	return data;
}
