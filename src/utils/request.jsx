const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Create axios-like interface
const request = {
	async get(url, config = {}) {
		try {
			const response = await fetch(`${API_BASE_URL}/${url}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					...config.headers,
				},
			});

			const data = await response.json();

			if (!response.ok) {
				const error = new Error(`HTTP ${response.status}`);
				error.response = {
					data,
					status: response.status,
				};
				throw error;
			}

			return {data};
		} catch (error) {
			console.error("GET request failed:", error);
			throw error;
		}
	},

	async post(url, body = {}, config = {}) {
		try {
			const response = await fetch(`${API_BASE_URL}/${url}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...config.headers,
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				const error = new Error(`HTTP ${response.status}`);
				error.response = {
					data,
					status: response.status,
				};
				throw error;
			}

			return {data};
		} catch (error) {
			console.error("POST request failed:", error);
			throw error;
		}
	},

	async put(url, body = {}, config = {}) {
		try {
			const response = await fetch(`${API_BASE_URL}/${url}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...config.headers,
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				const error = new Error(`HTTP ${response.status}`);
				error.response = {
					data,
					status: response.status,
				};
				throw error;
			}

			return {data};
		} catch (error) {
			console.error("PUT request failed:", error);
			throw error;
		}
	},

	async delete(url, config = {}) {
		try {
			const response = await fetch(`${API_BASE_URL}/${url}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					...config.headers,
				},
			});

			const data = await response.json();

			if (!response.ok) {
				const error = new Error(`HTTP ${response.status}`);
				error.response = {
					data,
					status: response.status,
				};
				throw error;
			}

			return {data};
		} catch (error) {
			console.error("DELETE request failed:", error);
			throw error;
		}
	},
};

export const healthCheck = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/health`);
		return response.ok;
	} catch (error) {
		console.error("Health check failed:", error);
		throw error;
	}
};

export const login = async (emailOrUsername, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({emailOrUsername, password}),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
};

export const logout = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.ok;
	} catch (error) {
		console.error("Logout failed:", error);
		throw error;
	}
};

// Default export
export default request;
