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
	changePassword: async (passwordData, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/change-password",
				passwordData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	initiatePasswordChange: async (currentPassword, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/change-password",
				{password: currentPassword},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
	confirmPasswordChange: async (
		tempAuthHashCode,
		newPassword,
		confirmNewPassword,
		token
	) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/confirm-change-password",
				{
					tempAuthHashCode,
					newPassword,
					confirmNewPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
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
	getProblemsList: async ({begin = 1, end = 5, language, token} = {}) => {
		try {
			let lang = language;
			if (!lang) {
				if (typeof window !== "undefined" && window.localStorage) {
					lang = window.localStorage.getItem("language");
				} else {
					lang = "vi";
				}
			}
			const config = {};
			if (token) {
				config.headers = {
					Authorization: `Bearer ${token}`,
				};
			}
			const response = await axiosInstance.post(
				"/api/problems/get-problems-list",
				{begin, end, language: lang},
				config
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getProblemDetail: async (problemId, token) => {
		try {
			let lang = "vi";
			if (typeof window !== "undefined" && window.localStorage) {
				lang = window.localStorage.getItem("language") || "vi";
			}

			const config = {};
			if (token) {
				config.headers = {
					Authorization: `Bearer ${token}`,
				};
			}

			const response = await axiosInstance.get(
				`/api/problems/${problemId}`,
				{
					params: {language: lang},
					...config,
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getUserSubmissions: async (problemId, token) => {
		try {
			const response = await axiosInstance.get(
				`/api/submissions/${problemId}/`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getProblemSolution: async (problemId, token) => {
		try {
			let lang = "vi";
			if (typeof window !== "undefined" && window.localStorage) {
				lang = window.localStorage.getItem("language") || "vi";
			}

			const response = await axiosInstance.get(
				`/api/problems/${problemId}/solution`,
				{
					params: {language: lang},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getAllSubmissionsByProblem: async (problemId, token) => {
		try {
			const response = await axiosInstance.get(
				`/api/submissions/public/${problemId}/`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	userData: async (username) => {
		try {
			const response = await axiosInstance.get(`/api/user/${username}`);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	testCode: async ({language, code, problemId}) => {
		try {
			const response = await axiosInstance.post("/api/code/test", {
				problemId,
				code,
				language,
			});
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	submitCode: async ({problemId, language, code}, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/code/submit",
				{
					problemId,
					code,
					language,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	runCode: async ({language, code, problemId}) => {
		try {
			const response = await axiosInstance.post("/api/code/test", {
				problemId,
				code,
				language,
			});
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getPersonalInfo: async (token) => {
		try {
			const response = await axiosInstance.get(
				"/api/settings/personal-info",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	changePersonalInfo: async (info, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/settings/personal-info/change",
				info,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getInterfaceAndLanguage: async (token) => {
		try {
			const response = await axiosInstance.get(
				"/api/settings/interface-and-language",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	changeInterfaceAndLanguage: async (settings, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/settings/interface-and-language/change",
				settings,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getEditorSettings: async (token) => {
		try {
			const response = await axiosInstance.get(
				"/api/settings/editor-settings",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	changeEditorSettings: async (settings, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/settings/editor-settings/change",
				settings,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	checkUsernameExist: async (username) => {
		try {
			const response = await axiosInstance.post(
				`/api/user/check-username-exist`,
				{username}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	// Email Change APIs
	changeEmail: async (password, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/change-email",
				{password},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	confirmChangeEmail: async (pin, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/confirm-change-email",
				{pin},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	sendVerificationEmail: async (email, changeMailAuthHashCode, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/send-verification-email",
				{email, changeMailAuthHashCode},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	confirmNewEmail: async (pin, token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/confirm-new-email",
				{pin},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	resendChangeEmail: async (token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/resend-change-email",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	resendVerificationEmail: async (token) => {
		try {
			const response = await axiosInstance.post(
				"/api/user/resend-verification-email",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getStatusDisplayText: (status) => {
		const statusMap = {
			pending: "Đang chờ xử lý",
			running: "Đang chạy",
			accepted: "Đã chấp nhận",
			wrong_answer: "Sai kết quả",
			time_limit_exceeded: "Vượt quá thời gian",
			not_run: "Chưa chạy",
		};
		return statusMap[status] || status;
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
