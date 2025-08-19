import axios from "axios";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const request = {
	get: async (url, config = {}) => {
		try {
			const response = await axiosInstance.get(url, config);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	post: async (url, body = {}, config = {}) => {
		try {
			const response = await axiosInstance.post(url, body, config);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	put: async (url, body = {}, config = {}) => {
		try {
			const response = await axiosInstance.put(url, body, config);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	delete: async (url, config = {}) => {
		try {
			const response = await axiosInstance.delete(url, config);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	healthCheck: async () => {
		try {
			const response = await axiosInstance.get("/");
			return response.status === 200;
		} catch (error) {
			console.error("Health check failed:", error);
			return false;
		}
	},
	login: async (username, password) => {
		try {
			const response = await axiosInstance.post("/api/user/login", {
				username,
				password,
			});
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	logout: async () => {
		try {
			const response = await axiosInstance.post("/api/user/logout");
			return response.status === 200;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	register: async (registerData) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/register",
				registerData
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	forgotPassword: async (forgotPasswordData) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/forgot-password",
				forgotPasswordData
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	resetPassword: async (resetPasswordData) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/reset-password",
				resetPasswordData
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	verify: async (verificationData) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/verify",
				verificationData
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
};

function handleAxiosError(error) {
	if (error.response) {
		const errMsg = error.response.data?.message || "Unknown error";
		throw new Error(errMsg);
	} else if (error.request) {
		throw new Error("No response from server");
	} else {
		throw new Error(error.message);
	}
}

export default request;
