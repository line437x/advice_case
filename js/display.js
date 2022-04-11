import { getIndustryList } from "./databse";
import { imgSlider } from "./optimizeInputs";

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

export function displaySecond(dataObj) {
	//? Slider Stuffz
	const slider = document.querySelector("#percentage");
	const sliderNr = document.querySelector(".amount");
	const newNumber = document.querySelector(".newNumber");
	const co2Emitted = document.querySelector("#co2_1");
	sliderNr.textContent = dataObj.images_sum;
	slider.max = dataObj.images_sum;
	slider.step = 1;
	slider.value = dataObj.images_sum;
	co2Emitted.textContent = dataObj.co2_emitted.toFixed(2);
	newNumber.textContent = imgSlider(dataObj.images_sum, dataObj.sum_images_bytes, dataObj.load_size, dataObj.co2_emitted, dataObj.images_sum);

	slider.addEventListener("input", () => {
		const imgAmount = imgSlider(slider.value, dataObj.sum_images_bytes, dataObj.load_size, dataObj.co2_emitted, dataObj.images_sum);

		sliderNr.textContent = slider.value;
		newNumber.textContent = imgAmount;
	});
	console.log(slider);
}
