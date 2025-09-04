import request from "../utils/request";

const handleLogout = async ({
	setIsAuthenticated,
	setUser,
	setToken,
	navigate,
}) => {
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
	if (typeof setIsAuthenticated === "function") setIsAuthenticated(false);
	if (typeof setUser === "function") setUser(null);
	if (typeof setToken === "function") setToken(null);
	if (typeof navigate === "function") navigate("/");
};

export default handleLogout;
