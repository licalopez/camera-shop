export const numberWithCommas = number => {
	// return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}