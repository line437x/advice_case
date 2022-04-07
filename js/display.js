import { getIndustryList } from "./databse";

export async function displayFirstStep(dataObj, industryList) {
	console.log("Display data");

	//? Display loadtime
	const loadtime = document.querySelector("#loadtime span");

	loadtime.textContent = dataObj.load_size.toFixed(2);

	//? Display emission
	const emission = document.querySelector("#emission span");
	emission.textContent = dataObj.co2_emitted.toFixed(2);

	//? Display compare

	//? Display Rank
	const rank = document.querySelector("#specific_rank");
	const totalRank = document.querySelector("#total_rank");

	rank.textContent = await checkIfArrayContainsObject(dataObj, industryList);
	totalRank.textContent = industryList.length;

	//? Display Top Three
	const topThree = document.querySelectorAll(".top3_content figure");

	topThree.forEach((place, idx) => {
		const position = place.querySelector(`p`);
		position.textContent = industryList[idx].name;
	});
}

function checkIfArrayContainsObject(obj, objList) {
	if (objList.some((page) => page.url === obj.url)) {
		const indexOfObj = objList.findIndex((el) => el.url === obj.url) + 1;

		return indexOfObj;
	} else {
		console.log("objectet findes ikke!");
		//? Indsæt ikke eksisterende objekt i array og sorter
		objList.unshift(obj);

		objList.sort((a, b) => {
			return a.co2_emitted - b.co2_emitted;
		});
		const indexOfObj = objList.findIndex((el) => el.url === obj.url) + 1;
		console.log(indexOfObj);

		return indexOfObj;
	}
}
