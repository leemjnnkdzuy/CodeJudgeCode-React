import {useState, useEffect} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import GlobalStyles from "./globalStyle";
import {ThemeProvider} from "./hooks/useTheme";
import {AuthProvider, useAuth} from "./hooks/useAuth";
import {LanguagesProvider} from "./hooks/useLanguages";
import {
	GlobalNotificationProvider,
	useGlobalNotificationPopup,
} from "./hooks/useGlobalNotificationPopup";
import {publicRoutes, privateRoutes} from "./routes";
import AppLoader from "./components/AppLoader";
import GlobalNotificationPopup from "./components/GlobalNotificationPopup";
import request from "./utils/request";

const routerOptions = {
	future: {
		v7_startTransition: true,
		v7_relativeSplatPath: true,
	},
};

function AuthRedirect({showError}) {
	useEffect(() => {
		showError && showError("Bạn cần đăng nhập để truy cập trang này!");
	}, [showError]);
	return <Navigate to='/login' replace />;
}

function AppContent() {
	const {loading: authLoading, isAuthenticated} = useAuth();
	const {showError, notifications, removeNotification} =
		useGlobalNotificationPopup();
	const [appLoading, setAppLoading] = useState(true);

	useEffect(() => {
		const initializeApp = async () => {
			const storedToken = localStorage.getItem("userToken");
			if (storedToken) {
				const result = await request.reloadUserProfile(storedToken);
				if (result && !result.error && result.user) {
					const {theme, language, ...userInfo} = result.user;
					localStorage.setItem("userInfo", JSON.stringify(userInfo));
					if (theme) localStorage.setItem("theme", theme);
					if (language) localStorage.setItem("language", language);
				} else {
					localStorage.removeItem("userToken");
					localStorage.removeItem("userInfo");
					localStorage.removeItem("theme");
					localStorage.removeItem("language");
				}
				await new Promise((resolve) => setTimeout(resolve, 500));
			} else {
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
			setAppLoading(false);
		};
		initializeApp();
	}, []);

	if (appLoading || authLoading) {
		return <AppLoader />;
	}

	return (
		<GlobalStyles>
			<Routes>
				{publicRoutes.map((route, index) => {
					const Page = route.component;
					const Layout = route.layout;
					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
				{privateRoutes.map((route, index) => {
					const Page = route.component;
					const Layout = route.layout;
					return (
						<Route
							key={"private-" + index}
							path={route.path}
							element={
								isAuthenticated ? (
									<Layout>
										<Page />
									</Layout>
								) : (
									<AuthRedirect showError={showError} />
								)
							}
						/>
					);
				})}
			</Routes>

			{notifications.length > 0 && (
				<div
					style={{
						position: "fixed",
						top: "20px",
						right: "20px",
						zIndex: 1000,
						maxWidth: "400px",
						pointerEvents: "none",
					}}
				>
					{notifications.map((notification) => (
						<GlobalNotificationPopup
							key={notification.id}
							message={notification.message}
							type={notification.type}
							onClose={() => removeNotification(notification.id)}
							duration={0}
						/>
					))}
				</div>
			)}
		</GlobalStyles>
	);
}

function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<Router future={routerOptions.future}>
				<ThemeProvider>
					<LanguagesProvider>
						<GlobalNotificationProvider>
							<AuthProvider>
								<AppContent />
							</AuthProvider>
						</GlobalNotificationProvider>
					</LanguagesProvider>
				</ThemeProvider>
			</Router>
		</I18nextProvider>
	);
}

export default App;
