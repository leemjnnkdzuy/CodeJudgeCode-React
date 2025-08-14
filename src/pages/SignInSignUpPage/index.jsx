import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import {FaArrowLeft} from "react-icons/fa";

import Button from "../../components/UI/Button";
import {useGlobalNotificationPopup} from "../../hooks/useGlobalNotificationPopup";
import {useSocialLogin} from "../../hooks/useSocialLogin";
import request from "../../utils/request";
import {
	LoginForm,
	RegisterForm,
	ForgotPasswordForm,
	ResetPasswordForm,
	VerificationForm,
	TogglePanel,
} from "./components";

import styles from "./SignInSignUpPage.module.scss";

const cx = classNames.bind(styles);

function SignInSignUpPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const {handleSocialLogin} = useSocialLogin();
	const {showError, showSuccess} = useGlobalNotificationPopup();
	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [loginData, setLoginData] = useState({username: "", password: ""});
	const [registerData, setRegisterData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [forgotPasswordData, setForgotPasswordData] = useState({email: ""});
	const [resetPasswordData, setResetPasswordData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [verificationData, setVerificationData] = useState({code: ""});

	const [currentPhase, setCurrentPhase] = useState(() => {
		const path = location.pathname;
		if (path === "/register") return "register";
		if (path === "/forgot-password") return "forgotPassword";
		if (path === "/reset-password") return "resetPassword";
		if (path === "/verification") return "verification";
		return "login";
	});

	useEffect(() => {
		const getCurrentPhase = () => {
			const path = location.pathname;
			if (path === "/register") return "register";
			if (path === "/forgot-password") return "forgotPassword";
			if (path === "/reset-password") return "resetPassword";
			if (path === "/verification") return "verification";
			return "login";
		};

		const newPhase = getCurrentPhase();
		setCurrentPhase(newPhase);
		setIsActive(newPhase === "register");
	}, [location.pathname]);

	const handlePhaseChange = (phase) => {
		setCurrentPhase(phase);

		const routes = {
			login: "/login",
			register: "/register",
			forgotPassword: "/forgot-password",
			resetPassword: "/reset-password",
			verification: "/verification",
		};

		navigate(routes[phase]);

		setIsActive(phase === "register");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await request.post("/auth/login", loginData);
			showSuccess("Đăng nhập thành công!");
		} catch (error) {
			showError(error.message || "Đăng nhập thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if (registerData.password !== registerData.confirmPassword) {
			showError("Mật khẩu không khớp!");
			return;
		}

		setIsLoading(true);
		try {
			await request.post("/auth/register", registerData);
			showSuccess("Đăng ký thành công!");
			handlePhaseChange("verification");
		} catch (error) {
			showError(error.message || "Đăng ký thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await request.post("/auth/forgot-password", forgotPasswordData);
			showSuccess("Email khôi phục đã được gửi!");
			handlePhaseChange("resetPassword");
		} catch (error) {
			showError(error.message || "Gửi email thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
			showError("Mật khẩu không khớp!");
			return;
		}

		setIsLoading(true);
		try {
			await request.post("/auth/reset-password", resetPasswordData);
			showSuccess("Đặt lại mật khẩu thành công!");
			handlePhaseChange("login");
		} catch (error) {
			showError(error.message || "Đặt lại mật khẩu thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerification = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await request.post("/auth/verify", verificationData);
			showSuccess("Xác minh thành công!");
			handlePhaseChange("login");
		} catch (error) {
			showError(error.message || "Xác minh thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cx("wrapper")}>
			<Button
				size='sm'
				icon={<FaArrowLeft />}
				className={cx("back-button")}
				onClick={() => navigate("/")}
				variant='outline'
			>
				Trở về trang chủ
			</Button>
			<div className={cx("container", {active: isActive})}>
				<div className={cx("form-container", "sign-up")}>
					{currentPhase === "register" && (
						<RegisterForm
							registerData={registerData}
							onDataChange={setRegisterData}
							onSubmit={handleRegister}
							onSocialLogin={handleSocialLogin}
							isLoading={isLoading}
						/>
					)}
				</div>

				<div className={cx("form-container", "sign-in")}>
					{currentPhase === "login" && (
						<LoginForm
							loginData={loginData}
							onDataChange={setLoginData}
							onSubmit={handleLogin}
							onForgotPassword={() =>
								handlePhaseChange("forgotPassword")
							}
							onSocialLogin={handleSocialLogin}
							isLoading={isLoading}
						/>
					)}

					{currentPhase === "forgotPassword" && (
						<ForgotPasswordForm
							forgotPasswordData={forgotPasswordData}
							onDataChange={setForgotPasswordData}
							onSubmit={handleForgotPassword}
							onBackToLogin={() => handlePhaseChange("login")}
							isLoading={isLoading}
						/>
					)}

					{currentPhase === "resetPassword" && (
						<ResetPasswordForm
							resetPasswordData={resetPasswordData}
							onDataChange={setResetPasswordData}
							onSubmit={handleResetPassword}
							onBackToLogin={() => handlePhaseChange("login")}
							isLoading={isLoading}
						/>
					)}

					{currentPhase === "verification" && (
						<VerificationForm
							verificationData={verificationData}
							onDataChange={setVerificationData}
							onSubmit={handleVerification}
							onBackToLogin={() => handlePhaseChange("login")}
							isLoading={isLoading}
						/>
					)}
				</div>

				<TogglePanel
					onPhaseChange={handlePhaseChange}
					isActive={isActive}
				/>
			</div>
		</div>
	);
}

export default SignInSignUpPage;
