import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import {FaArrowLeft} from "react-icons/fa";

import {Button} from "../../components/UI/";
import {useGlobalNotificationPopup} from "../../hooks/useGlobalNotificationPopup";
import {useSocialLogin} from "../../hooks/useSocialLogin";
import request from "../../utils/request";
import {useAuth} from "../../hooks/useAuth";
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
	const {login, isAuthenticated} = useAuth();
	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});
	const [registerData, setRegisterData] = useState({
		first_name: "",
		last_name: "",
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
	const [pinData, setPinData] = useState({code: ""});
	const [resetToken, setResetToken] = useState("");

	const [currentPhase, setCurrentPhase] = useState(() => {
		const path = location.pathname;
		if (path === "/register") return "register";
		if (path === "/forgot-password") return "forgotPassword";
		if (path === "/verification") return "verification";
		return "login";
	});

	useEffect(() => {
		const getCurrentPhase = () => {
			const path = location.pathname;
			if (path === "/register") return "register";
			if (path === "/forgot-password") return "forgotPassword";
			if (path === "/verification") return "verification";
			return "login";
		};

		const newPhase = getCurrentPhase();
		setCurrentPhase(newPhase);
		setIsActive(newPhase === "register");
	}, [location.pathname]);

	const handlePhaseChange = (phase) => {
		setCurrentPhase(phase);

		if (phase === "register") {
			setRegisterData({
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		}

		if (phase === "login") {
			setLoginData({
				username: "",
				password: "",
			});
		}

		if (phase === "forgotPassword") {
			setForgotPasswordData({email: ""});
			setPinData({code: ""});
		}

		const routes = {
			login: "/login",
			register: "/register",
			forgotPassword: "/forgot-password",
			verification: "/verification",
		};

		navigate(routes[phase]);
		setIsActive(phase === "register");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const result = await login(loginData.username, loginData.password);
			if (result && result.success) {
				showSuccess("Đăng nhập thành công!");
			} else {
				showError(result?.message || "Đăng nhập thất bại!");
			}
		} catch (error) {
			showError(error.message || "Đăng nhập thất bại!");
		} finally {
			setIsLoading(false);
		}
	};

	const validateRegister = (data) => {
		if (!data.last_name || data.last_name.trim().length < 2) {
			return "Họ phải có ít nhất 2 ký tự.";
		}
		if (!data.first_name || data.first_name.trim().length < 2) {
			return "Tên phải có ít nhất 2 ký tự.";
		}
		if (!data.username || data.username.length < 6) {
			return "Tên người dùng phải có ít nhất 6 ký tự.";
		}
		if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
			return "Email không hợp lệ.";
		}
		if (!data.password || data.password.length < 6) {
			return "Mật khẩu phải có ít nhất 6 ký tự.";
		}
		if (data.password !== data.confirmPassword) {
			return "Mật khẩu không khớp!";
		}
		return null;
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const errorMsg = validateRegister(registerData);
		if (errorMsg) {
			showError(errorMsg);
			return;
		}
		setIsLoading(true);
		try {
			await request.register(registerData);
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
			await request.forgotPassword(forgotPasswordData);
			showSuccess("Mã PIN đã được gửi về email!");
			setPinData({code: ""});
			handlePhaseChange("verification");
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
		if (!resetToken) {
			showError("Bạn cần xác thực mã PIN trước!");
			return;
		}
		setIsLoading(true);
		try {
			await request.resetPassword({
				password: resetPasswordData.password,
				confirmPassword: resetPasswordData.confirmPassword,
				resetToken,
			});
			showSuccess("Đặt lại mật khẩu thành công!");
			setResetToken("");
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
			const res = await request.verifyResetPin({
				email: forgotPasswordData.email,
				code: pinData.code,
			});
			if (res.resetToken) {
				setResetToken(res.resetToken);
				showSuccess("Xác thực thành công! Hãy đặt lại mật khẩu mới.");
				setResetPasswordData({password: "", confirmPassword: ""});
				setTimeout(() => handlePhaseChange("resetPassword"), 500);
			} else {
				showError(
					res.message || "Mã xác thực không hợp lệ hoặc đã hết hạn!"
				);
			}
		} catch (error) {
			showError(
				error.message || "Mã xác thực không hợp lệ hoặc đã hết hạn!"
			);
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
					{currentPhase === "verification" && (
						<VerificationForm
							verificationData={pinData}
							onDataChange={setPinData}
							onSubmit={handleVerification}
							onBackToLogin={() =>
								handlePhaseChange("forgotPassword")
							}
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
