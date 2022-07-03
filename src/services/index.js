import axios from 'axios';
import $router from '@/router';

// axios service for making requests to backend
let AxiosService = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 3000,
});

// save type and token to request headers (execute before every backend request)
AxiosService.interceptors.request.use((request) => {
	console.log(request.url);
	if (request.url !== "/user/auth" && request.url !== "/user") {
		// try {
			request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
			console.log("token:");
			console.log(request.headers.Authorization);
		// } catch (e) {
			// console.error(e);
		// }
		// return request;
		if (!request.headers.Authorization) {
			Auth.logout();
			$router.replace({ path: "/login" });
		}
	}
	return request;
});

// let through response or log out user (execute after every backend response)
AxiosService.interceptors.response.use(
	(response) => {
		console.log('Interceptor', response);
		return response;
	},
	(error) => {
		if (error.response.status == 401) {
			Auth.logout();
			$router.go();
		}
		// console.error('Interceptor', error.response);
	}
);


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
};

// authentication
let Auth = {
	// logs in user
	async login(email, password) {
		// sends user to backend for saving
		let response = await AxiosService.post("/user/auth", {
			email: email,
			password: password, // hash await bcrypt.hash(userData.password, 8)
		});
		// save user to localstorage
		let user = response.data;
		localStorage.setItem("user", JSON.stringify(user));
		return true;
	},
	// signs up user
	async signup(user) {
		// sends user to backend for saving
		let response = await AxiosService.post("/user", user);
		// let user = response.data;
		return true;
	},
	// logs out user by removing token from localstorage
	logout() {
		localStorage.removeItem("user");
	},
	// returns current saved user
	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	},
	// returns current saved user token
	getToken() {
		let user = Auth.getUser();
		if (user && user.token) {
			return user.token;
		} else {
			return false;
		}
	},
	// check if user is authenticated
	authenticated() {
		let user = Auth.getUser();
		if (user && user.token) {
			return true;
		}
		return false;
	},
	// state get functions, make variables available
	state: {
		get authenticated() {
			return Auth.authenticated();
		},
		get userEmail() {
			return Auth.getUser().email;
		},
		get userId() {
			return Auth.getUser()._id;
		},
		get userFirstName() {
			return Auth.getUser().firstName;
		},
		get userLastName() {
			return Auth.getUser().lastName;
		}
	},
};

export { AxiosService, convertDatetime, convertPeriod, convertDate, Auth };
