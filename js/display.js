import { getIndustryList } from "./databse";

export async function displayFirstStep(dataObj, industryList) {
	//? Display loadtime
	const loadtime = document.querySelector("#loadtime span");

	loadtime.textContent = dataObj.load_size.toFixed(2);

	//? Display emission
	const emission = document.querySelector("#emission span");
	emission.textContent = dataObj.co2_emitted.toFixed(2);

	//? Display compare

	//? Display Color Rank
	const colorRank = document.querySelector("#rank_color");
	const rankHNumber = Number(dataObj.cleaner_than);
	colorRank.style.background = `hsl(${rankHNumber},86%,52%)`;

	//? Display Rank
	const rank = document.querySelector("#specific_rank");
	const totalRank = document.querySelector("#total_rank");

	rank.textContent = await checkIfArrayContainsObject(dataObj, industryList);
	totalRank.textContent = industryList.length;

	//? Display Top Three
	const topThree = document.querySelectorAll(".top3_content figure");
	topThree.forEach((place, idx) => {
		const position = place.querySelector(`p`);
		if (industryList.length !== 0) {
			if (industryList[idx]) {
				position.textContent = industryList[idx].name;
			} else {
				position.textContent = "-";
			}
		}
	});
}

function checkIfArrayContainsObject(obj, objList) {
	if (objList.some((page) => page.url === obj.url)) {
		const indexOfObj = objList.findIndex((el) => el.url === obj.url) + 1;

		return indexOfObj;
	} else {
		//? Indsæt ikke eksisterende objekt i array og sorter
		objList.unshift(obj);

		objList.sort((a, b) => {
			return a.co2_emitted - b.co2_emitted;
		});
		const indexOfObj = objList.findIndex((el) => el.url === obj.url) + 1;

		return indexOfObj;
	}
}
