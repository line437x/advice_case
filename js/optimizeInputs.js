export function imgSlider(imgAmount, imgSizeSum, siteSize, co2, originalImgAmount) {
	const averageImgSize = imgSizeSum / originalImgAmount;
	let sliderResult;
	if (averageImgSize === Infinity) {
		sliderResult = siteSize - imgSizeSum;
	} else {
		sliderResult = averageImgSize * imgAmount;
	}

	const imgResult = ((sliderResult / siteSize) * 100 * co2) / 100;

	const result = co2 - imgResult + imgResult;
	console.log(imgResult, result);

	if (imgResult === 0) {
		return (siteSize - imgSizeSum).toFixed(2);
	}
	return imgResult.toFixed(2);
}
