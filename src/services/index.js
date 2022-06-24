import axios from 'axios';

// axios service for making requests to backend
let AxiosService = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 3000,
});

// function for datetime conversion, returns date(time) in Day(sufix: e.g. th) Month Year Hours:Minutes format
function convertDatetime(datetime) {
	let dateAndTime = datetime.split(" ");
	if (dateAndTime[1]) {
		return `${convertDate(dateAndTime[0])} ${dateAndTime[1]}h`;
	} else {
		return `${convertDate(dateAndTime[0])}`;
	}
}

// function for period conversion, supprots date and datetime parameters
function convertPeriod(dateStart, dateEnd) {
	let datetimeStartParts = dateStart.split(" ");
	let datetimeEndParts = dateEnd.split(" ");
	let dateStartParts = convertDate(datetimeStartParts[0]).split(" ");
	let dateEndParts = convertDate(datetimeEndParts[0]).split(" ");
	if (dateStartParts[2] !== dateEndParts[2]) {
		return convertDate(datetimeStartParts[0]) + " - " + convertDate(datetimeEndParts[0]);
	} else {
		if (dateStartParts[1] !== dateEndParts[1]) {
			return `${dateStartParts[0]} ${dateStartParts[1]} - ${dateEndParts[0]} ${dateEndParts[1]} ${dateEndParts[2]}`;
		} else {
			return `${dateStartParts[0]} - ${dateEndParts[0]} ${dateStartParts[1]} ${dateEndParts[2]}`;
		}
	}
}

// function for date conversion, returns date in Day(sufix: e.g. th) Month Year format
function convertDate(date) {
	let dateParts = date.split("-");
	let daySufix = "";
	switch (dateParts[2]) {
		case "01": daySufix = "st"; break;
		case "02": daySufix = "nd"; break;
		case "03": daySufix = "rd"; break;
		default: daySufix = "th";
	}
	if (dateParts[2][0] === "0") dateParts[2] = dateParts[2].slice(1);
	return `${dateParts[2]}${daySufix} ${monthNumberToName[dateParts[1]]} ${dateParts[0]}`;
}

// mapping month in MM format to month name
const monthNumberToName = {
	"01": "January",
	"02": "Febuary",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "Novempber",
	"12": "December"
}

export { AxiosService, convertDatetime, convertPeriod, convertDate };
