import {useCallback} from "react";
import {useGlobalNotificationPopup} from "./useGlobalNotificationPopup";

export const useSocialLogin = () => {
	const {showError, showInfo} = useGlobalNotificationPopup();

	const handleSocialLogin = useCallback(
		(provider) => {
			try {
				// Show info message for now
				showInfo(`Đăng nhập bằng ${provider} sẽ được triển khai sớm!`);

				// TODO: Implement actual social login logic
				// This is where you would integrate with OAuth providers
				// For example:
				// switch (provider) {
				//   case 'google':
				//     // Initialize Google OAuth
				//     break;
				//   case 'facebook':
				//     // Initialize Facebook OAuth
				//     break;
				//   case 'github':
				//     // Initialize GitHub OAuth
				//     break;
				//   case 'linkedin':
				//     // Initialize LinkedIn OAuth
				//     break;
				//   default:
				//     showError('Nhà cung cấp không được hỗ trợ');
				// }
			} catch (error) {
				showError("Đã xảy ra lỗi khi đăng nhập bằng mạng xã hội");
				console.error("Social login error:", error);
			}
		},
		[showError, showInfo]
	);

	return {
		handleSocialLogin,
	};
};
