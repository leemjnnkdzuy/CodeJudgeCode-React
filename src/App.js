import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import {publicRoutes} from "./routes";
import AppLoader from "./components/AppLoader";
import GlobalNotificationPopup from "./components/GlobalNotificationPopup";
import request from "./utils/request";

const routerOptions = {
	future: {
		v7_startTransition: true,
		v7_relativeSplatPath: true,
	},
};

function NotificationRenderer() {
	const {notifications, removeNotification} = useGlobalNotificationPopup();

	return (
		<>
			{notifications.map((notification) => (
				<GlobalNotificationPopup
					key={notification.id}
					message={notification.message}
					type={notification.type}
					onClose={() => removeNotification(notification.id)}
					duration={0}
				/>
			))}
		</>
	);
}

function AppContent() {
	const {loading: authLoading} = useAuth();
	const [appLoading, setAppLoading] = useState(true);

	useEffect(() => {
		const initializeApp = async () => {
			try {
				await request.healthCheck();
				await new Promise((resolve) => setTimeout(resolve, 1000));
			} catch (error) {
				console.log("Health check failed, continuing anyway:", error);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			} finally {
				setAppLoading(false);
			}
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
			</Routes>
			<NotificationRenderer />
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
