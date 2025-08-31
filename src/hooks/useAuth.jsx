import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import request from "../utils/request";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = useCallback(async () => {
		try {
			await request.logout();
		} catch (error) {
			console.error("Logout API error:", error);
		}
		localStorage.removeItem("userToken");
		localStorage.removeItem("userInfo");
		localStorage.removeItem("theme");
		localStorage.removeItem("language");
		document.cookie =
			"YIF+pxrGp0isUkYUsAWxn3rQH6pBrNY_=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		setIsAuthenticated(false);
		setUser(null);
		setToken(null);
		navigate("/");
	}, [navigate]);

	useEffect(() => {
		const checkAuth = () => {
			const storedToken = localStorage.getItem("userToken");
			const storedUser = localStorage.getItem("userInfo");

			if (storedToken) {
				try {
					const tokenData = JSON.parse(
						atob(storedToken.split(".")[1])
					);
					if (tokenData.exp * 1000 > Date.now()) {
						setIsAuthenticated(true);
						setToken(storedToken);
						if (storedUser) {
							setUser(JSON.parse(storedUser));
						} else {
							setUser({
								id: tokenData.id,
								fullName: tokenData.fullName || tokenData.name,
								role: tokenData.role,
								email: tokenData.email,
							});
						}
						if (
							!document.cookie.includes(
								"YIF+pxrGp0isUkYUsAWxn3rQH6pBrNY_"
							)
						) {
							const expiryDate = new Date(tokenData.exp * 1000);
							document.cookie = `YIF+pxrGp0isUkYUsAWxn3rQH6pBrNY_=true; expires=${expiryDate.toUTCString()}; path=/`;
						}
					} else {
						handleLogout();
					}
				} catch (error) {
					handleLogout();
				}
			} else {
				setIsAuthenticated(false);
				setUser(null);
				setToken(null);
			}
			setLoading(false);
		};

		window.addEventListener("storage", checkAuth);
		checkAuth();
		return () => {
			window.removeEventListener("storage", checkAuth);
		};
	}, [handleLogout]);

	useEffect(() => {
		if (!loading) {
			if (isAuthenticated) {
				if (
					location.pathname === "/login" ||
					location.pathname === "/register" ||
					location.pathname === "/forgot-password" ||
					location.pathname === "/verification"
				) {
					navigate("/home");
				}
			} else {
				if (location.pathname === "/home") {
					navigate("/");
				}
			}
		}
	}, [isAuthenticated, loading, location.pathname, navigate]);
	const login = async (username, password) => {
		try {
			const response = await request.login(username, password);
			if (response && response.token && response.user) {
				const token = response.token;
				const userData = response.user;
				const {theme, language, ...userInfo} = userData;
				localStorage.setItem("userToken", token);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				if (theme) localStorage.setItem("theme", theme);
				if (language) localStorage.setItem("language", language);
				try {
					const tokenData = JSON.parse(atob(token.split(".")[1]));
					const expiryDate = new Date(tokenData.exp * 1000);
					document.cookie = `YIF+pxrGp0isUkYUsAWxn3rQH6pBrNY_=true; expires=${expiryDate.toUTCString()}; path=/`;
				} catch {}
				setToken(token);
				setIsAuthenticated(true);
				setUser(userInfo);
				return {success: true};
			}
			return {
				success: false,
				message:
					response.message ||
					"Tên đăng nhập hoặc mật khẩu không đúng",
			};
		} catch (error) {
			return {
				success: false,
				message: "Có lỗi xảy ra, vui lòng thử lại",
			};
		}
	};

	const value = {
		isAuthenticated,
		user,
		token,
		loading,
		login,
		logout: handleLogout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
