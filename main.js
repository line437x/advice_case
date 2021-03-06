"use strict";
import "./sass/main.scss";

import { getPageInsight, getCarbonMetrics } from "./js/api";
import { postHandler, getDataDB, getRelevantData, getIndustryList } from "./js/databse";
import { displayFirstStep, displaySecond } from "./js/display";
import { imgSlider } from "./js/optimizeInputs";
async function init() {
	// Add a listener for when the window resizes
	window.addEventListener("resize", checkMediaQuery);

	// set alert
	function checkMediaQuery() {
		if (window.innerWidth < 830) {
			alert("This page can only be displayed on a screen bigger than 830px.");
			document.querySelector("main").style.display = "none";
		} else {
			document.querySelector("main").style.display = "inline";
		}
	}

	//? TEST
	//   let objTest = {
	//     url: "https://lineberner.com/",
	//     name: "Lineberner",
	//     industry: "agriculture",
	//     is_green: true,
	//     load_size: 7.513340950012207,
	//     cleaner_than: 8,
	//     co2_emitted: 9.499065969233634,
	//     load_time: 0.73,
	//     images_sum: 3,
	//     sum_images_bytes: 7.45,
	//     js_minified: 0,
	//     css_minified: 0,
	//     not_webp: 3,
	//     webp_opti: [
	//       {
	//         totalBytes: 3825763,
	//         wastedWebpType: 1903605,
	//       },
	//       {
	//         totalBytes: 1764495,
	//         wastedWebpType: 1380007,
	//       },
	//       {
	//         totalBytes: 2222575,
	//         wastedWebpType: 300417,
	//       },
	//     ],
	//     video_sum: 0,
	//   };
	//   await displaySecond(objTest);

	let dataExistsFlag;
	let industry;
	let url;
	let collectedData;
	let finalData;

	// Get input, URL and Industry
	const form = document.querySelector("form.url-input");
	// console.log(form.elements.submit);

	//? INITIAL SUBMIT
	form.addEventListener("submit", async (e) => {
		document.querySelector("#spinner").classList.remove("hide");
		e.preventDefault();
		// Get input
		url = form.elements.url.value;
		industry = form.elements.industry.value;

		await checkDataBaseForExistance();

		const industryList = await getIndustryList(industry);
		await displayFirstStep(collectedData, industryList);

		// Remove hidden from section 2
		document.querySelector("#section2").classList.remove("hidden");

		scrollToSection2();
	});

	function scrollToSection2() {
		document.querySelector("#section2").scrollIntoView({ behavior: "smooth" });
		document.querySelector("#spinner").classList.add("hide");
	}

	// document.querySelector("#spinner").classList.add("hide");

	//? GENERATE FULL REPORT
	const generateFullBtn = document.querySelector("[data-generateFull]");
	generateFullBtn.addEventListener("click", async () => {
		document.querySelector("#spinner2").classList.remove("hide");

		await generateFullRapport();
		// Remove hidden from section 3
		document.querySelector("#section3").classList.remove("hidden");

		scrollToSection3();
	});

	function scrollToSection3() {
		document.querySelector("#section3").scrollIntoView({ behavior: "smooth" });

		document.querySelector("#spinner2").classList.add("hide");
	}

	//? Check if input exists in database
	async function checkDataBaseForExistance() {
		const initialData = await getRelevantData(url);

		//? If yes, show relevant data
		if (Object.keys(initialData).length !== 0) {
			dataExistsFlag = true;
			collectedData = initialData;
		} else {
			//? If no, GET website carbon data and set flag to false
			dataExistsFlag = false;
			collectedData = await getCarbonMetrics(url, industry);
		}
	}

	//? Second step
	//todo Check if generate further is clicked

	async function generateFullRapport() {
		//todo show LOADING SCREEN
		//? If flag false
		if (!dataExistsFlag) {
			//? Get page insight
			const pageInsightData = await getPageInsight(url);

			//? merge carbon + page insight
			finalData = {
				...collectedData,
				...pageInsightData,
			};
			console.log(finalData);
			//? POST All data
			await postHandler(finalData);
		} else {
			finalData = await getRelevantData(url);
			await displaySecond(finalData);
		}
	}
	//todo show result

	//todo click share result
}

init();
