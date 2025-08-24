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
	healthCheck: async () => {
		try {
			const response = await axiosInstance.get("/");
			return response.status === 200;
		} catch (error) {
			console.error("Health check failed:", error);
			return false;
		}
	},

	reloadUserProfile: async (token) => {
		try {
			const response = await axiosInstance.get(
				"/api/user/reloadUserProfile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error.response) {
				return {
					error: true,
					status: error.response.status,
					data: error.response.data,
				};
			}
			return {error: true, status: 0, data: null};
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
			if (error.response && error.response.status === 401) {
				return {
					success: false,
					message: "Sai tài khoản hoặc mật khẩu!",
				};
			}
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
	verify: async (code) => {
		try {
			const response = await axiosInstance.post("/api/user/verify", {
				code,
			});
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
	verifyResetPin: async ({email, code}) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/verify-reset-pin",
				{email, code}
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
	homeData: async (token) => {
		try {
			const response = await axiosInstance.get("/api/user/homeData", {
				headers: token
					? {
							Authorization: `Bearer ${token}`,
					  }
					: {},
			});
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
