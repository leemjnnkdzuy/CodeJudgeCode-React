import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import request from "../utils/request";
import handleLogout from "../handlers/handleLogout";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const hasInitializedRef = useRef(false);
	const navigate = useNavigate();
	const location = useLocation();

	const logout = useCallback(
		() =>
			handleLogout({
				setIsAuthenticated,
				setUser,
				setToken,
				navigate,
			}),
		[navigate]
	);

	useEffect(() => {
		if (hasInitializedRef.current) return;

		const checkAuth = async () => {
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

						try {
							const response = await request.reloadUserProfile(
								storedToken
							);
							if (response && response.user) {
								const userData = response.user;
								const {theme, language, ...userInfo} = userData;
								localStorage.setItem(
									"userInfo",
									JSON.stringify(userInfo)
								);
								if (theme) localStorage.setItem("theme", theme);
								if (language)
									localStorage.setItem("language", language);
								setUser(userInfo);
								if (response.editorSettings) {
									localStorage.setItem(
										"editorSettings",
										JSON.stringify(response.editorSettings)
									);
									window.dispatchEvent(
										new CustomEvent(
											"editorSettingsUpdated",
											{
												detail: response.editorSettings,
											}
										)
									);
								}
							}
						} catch (err) {
							console.warn(
								"Could not reload user profile from API:",
								err
							);
						}
					} else {
						handleLogout({
							setIsAuthenticated,
							setUser,
							setToken,
							navigate,
						});
					}
				} catch (error) {
					handleLogout({
						setIsAuthenticated,
						setUser,
						setToken,
						navigate,
					});
				}
			} else {
				setIsAuthenticated(false);
				setUser(null);
				setToken(null);
			}
			setLoading(false);
			hasInitializedRef.current = true;
		};

		checkAuth();
	}, [navigate]);

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
				if (response.editorSettings) {
					localStorage.setItem(
						"editorSettings",
						JSON.stringify(response.editorSettings)
					);
					window.dispatchEvent(
						new CustomEvent("editorSettingsUpdated", {
							detail: response.editorSettings,
						})
					);
				}
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

	const reloadUserProfile = useCallback(async () => {
		if (!token) return null;
		try {
			const response = await request.reloadUserProfile(token);
			if (response && response.user) {
				const userData = response.user;
				const {theme, language, ...userInfo} = userData;
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				if (theme) localStorage.setItem("theme", theme);
				if (language) localStorage.setItem("language", language);
				if (response.editorSettings) {
					localStorage.setItem(
						"editorSettings",
						JSON.stringify(response.editorSettings)
					);
					window.dispatchEvent(
						new CustomEvent("editorSettingsUpdated", {
							detail: response.editorSettings,
						})
					);
				}
				setUser(userInfo);
				return response;
			}
		} catch (error) {
			console.error("Reload user profile failed:", error);
			return null;
		}
	}, [token]);

	const updateUser = useCallback((newUserData) => {
		setUser(newUserData);
		const currentUserInfo = JSON.parse(
			localStorage.getItem("userInfo") || "{}"
		);
		const updatedUserInfo = {
			...currentUserInfo,
			avatar: newUserData.avatar || currentUserInfo.avatar,
			email: newUserData.email || currentUserInfo.email,
			first_name: newUserData.first_name || currentUserInfo.first_name,
			last_name: newUserData.last_name || currentUserInfo.last_name,
			id: newUserData.id || newUserData._id || currentUserInfo.id,
			username: newUserData.username || currentUserInfo.username,
			role: newUserData.role || currentUserInfo.role,
		};
		localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
	}, []);

	const value = {
		isAuthenticated,
		user,
		token,
		loading,
		login,
		logout,
		reloadUserProfile,
		updateUser,
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
