import axios from "axios";
import { toast } from "react-toastify";

export const http = axios.create({
  // baseURL: "http://3.6.88.59:80/api",
	baseURL: "http://localhost:4001/api",
});

const errorHandler = (error) => {
	// Handle errors
	document.body.classList.remove("loading-indicator");
	toast.error(error.response.data.message, {
		position: toast.POSITION.BOTTOM_RIGHT,
		autoClose: 10000,
	});
	//return error.response.data;
	return Promise.reject(error.response.data);
};

const successHandler = (response) => {
	document.body.classList.remove("loading-indicator");
	if (response.data.message) {
		if (response.data.responseCode === 200) {
			toast.success(response.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 10000,
			});
		} else {
			toast.error(response.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 10000,
			});
		}
	}
	return response;
};
http.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem("token");
	document.body.classList.add("loading-indicator");
	return config;
});
http.interceptors.response.use(
	(response) => successHandler(response),
	(error) => errorHandler(error)
);
