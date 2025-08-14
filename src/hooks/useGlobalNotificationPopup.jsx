import React, {createContext, useContext, useState, useCallback} from "react";

const GlobalNotificationContext = createContext();

export const GlobalNotificationProvider = ({children}) => {
	const [notifications, setNotifications] = useState([]);

	const showNotification = useCallback(
		(message, type = "error", duration = 3000) => {
			const id = Date.now() + Math.random();
			const notification = {
				id,
				message,
				type,
				duration,
			};

			setNotifications((prev) => [...prev, notification]);

			if (duration > 0) {
				setTimeout(() => {
					setNotifications((prev) =>
						prev.filter((notification) => notification.id !== id)
					);
				}, duration);
			}

			return id;
		},
		[]
	);

	const removeNotification = useCallback((id) => {
		setNotifications((prev) =>
			prev.filter((notification) => notification.id !== id)
		);
	}, []);

	const showSuccess = useCallback(
		(message, duration = 3000) => {
			return showNotification(message, "success", duration);
		},
		[showNotification]
	);

	const showError = useCallback(
		(message, duration = 3000) => {
			return showNotification(message, "error", duration);
		},
		[showNotification]
	);

	const showWarning = useCallback(
		(message, duration = 3000) => {
			return showNotification(message, "warning", duration);
		},
		[showNotification]
	);

	const value = {
		notifications,
		showNotification,
		showSuccess,
		showError,
		showWarning,
		removeNotification,
	};

	return (
		<GlobalNotificationContext.Provider value={value}>
			{children}
		</GlobalNotificationContext.Provider>
	);
};

export const useGlobalNotificationPopup = () => {
	const context = useContext(GlobalNotificationContext);
	if (!context) {
		throw new Error(
			"useGlobalNotificationPopup must be used within a GlobalNotificationProvider"
		);
	}
	return context;
};
