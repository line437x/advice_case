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

	if (json.length !== 0) {
		console.log("DEn her URL findes!");
		console.log(json);
		const data = { ...json[0] };
		console.log(data);
		return data;
	} else {
		console.log("Den her url eksisterer ikke");

		return {};
	}
}
