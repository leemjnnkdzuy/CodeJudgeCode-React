import React, {useState, useEffect, useCallback} from "react";
import classNames from "classnames/bind";
import {Button, Loading, Input} from "../../../../components/UI";
import {useAuth} from "../../../../hooks/useAuth";
import {base64ToImage} from "../../../../helper/avatarBase64Helper";
import {useGlobalNotificationPopup} from "../../../../hooks/useGlobalNotificationPopup";
import {useLanguages} from "../../../../hooks/useLanguages";
import useSettings from "../../../../hooks/useSettings";
import request from "../../../../utils/request";
import {useDropzone} from "react-dropzone";
import {BiImageAdd} from "react-icons/bi";
import {BiRefresh} from "react-icons/bi";
import {FaArrowRight} from "react-icons/fa";
import {
	FaGithub,
	FaLinkedin,
	FaGlobe,
	FaYoutube,
	FaFacebook,
	FaInstagram,
} from "react-icons/fa";
import {motion, AnimatePresence} from "framer-motion";
import style from "./PersonalInfoTab.module.scss";

const cx = classNames.bind(style);

const PersonalInfoTab = ({
	setLoading: propSetLoading,
	setHasChanges: propSetHasChanges,
	updateSubmitHandler: propUpdateSubmitHandler,
	resetChanges: propResetChanges,
}) => {
	const {token, updateUser} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();
	const {t} = useLanguages();
	const settingsHook = useSettings();
	const {setLoading, setHasChanges, updateSubmitHandler, resetChanges} =
		propSetLoading
			? {
					setLoading: propSetLoading,
					setHasChanges: propSetHasChanges,
					updateSubmitHandler: propUpdateSubmitHandler,
					resetChanges: propResetChanges,
			  }
			: settingsHook;
	const [isLoadingInitial, setIsLoadingInitial] = useState(true);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [currentAvatar, setCurrentAvatar] = useState("");
	const [initialFormData, setInitialFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		bio: "",
		avatar: "",
		githubUrl: "",
		linkedinUrl: "",
		websiteUrl: "",
		youtubeUrl: "",
		facebookUrl: "",
		instagramUrl: "",
	});
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		bio: "",
		avatar: "",
		githubUrl: "",
		linkedinUrl: "",
		websiteUrl: "",
		youtubeUrl: "",
		facebookUrl: "",
		instagramUrl: "",
	});
	const [isExpanded, setIsExpanded] = useState(false);
	const [errors, setErrors] = useState({});
	const [isCheckingUsername, setIsCheckingUsername] = useState(false);
	const [usernameAvailable, setUsernameAvailable] = useState(null);

	const containerVariants = {
		collapsed: {
			justifyContent: "center",
			padding: "1rem",
		},
		expanded: {
			justifyContent: "space-between",
			padding: "1rem 2rem",
		},
	};

	const itemVariants = {
		collapsed: {opacity: 0, scale: 0.8},
		expanded: {opacity: 1, scale: 1},
	};

	const convertFileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const onDrop = async (acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];
			try {
				const base64 = await convertFileToBase64(file);
				setUploadedImage(base64);
			} catch (error) {
				showNotification(
					t("settingsPage.personalInfoTab.imageProcessError"),
					"error"
				);
			}
		}
	};

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
		},
		multiple: false,
	});

	useEffect(() => {
		const fetchPersonalInfo = async () => {
			setIsLoadingInitial(true);
			setLoading(true);
			try {
				const response = await request.getPersonalInfo(token);
				if (response && response.personalInfo) {
					const info = response.personalInfo;
					const avatar = info.avatar || "";
					setCurrentAvatar(avatar);
					const newFormData = {
						firstName: info.first_name || "",
						lastName: info.last_name || "",
						username: info.username || "",
						bio: info.bio || "",
						avatar: avatar,
						githubUrl: info.github_url || "",
						linkedinUrl: info.linkedin_url || "",
						websiteUrl: info.website_url || "",
						youtubeUrl: info.youtube_url || "",
						facebookUrl: info.facebook_url || "",
						instagramUrl: info.instagram_url || "",
					};
					setFormData(newFormData);
					setInitialFormData(newFormData);
				}
			} catch (error) {
				showNotification(
					t("settingsPage.personalInfoTab.generalError"),
					"error"
				);
			} finally {
				setLoading(false);
				setIsLoadingInitial(false);
			}
		};

		if (token) {
			fetchPersonalInfo();
		}
	}, [token, showNotification, setLoading, t]);

	const validateForm = useCallback(() => {
		const newErrors = {};
		if (!formData.firstName.trim())
			newErrors.firstName = t(
				"settingsPage.personalInfoTab.firstNameRequired"
			);
		if (!formData.lastName.trim())
			newErrors.lastName = t(
				"settingsPage.personalInfoTab.lastNameRequired"
			);
		if (!formData.username.trim())
			newErrors.username = t(
				"settingsPage.personalInfoTab.usernameRequired"
			);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData.firstName, formData.lastName, formData.username, t]);

	const submitHandler = useCallback(
		async (e) => {
			if (e) e.preventDefault();
			if (!validateForm()) return;

			const finalAvatar = uploadedImage || formData.avatar;
			setFormData((prev) => ({...prev, avatar: finalAvatar}));

			setLoading(true);
			try {
				const dataToSend = {
					first_name: formData.firstName,
					last_name: formData.lastName,
					username: formData.username,
					bio: formData.bio,
					avatar: finalAvatar,
					github_url: formData.githubUrl,
					linkedin_url: formData.linkedinUrl,
					website_url: formData.websiteUrl,
					youtube_url: formData.youtubeUrl,
					facebook_url: formData.facebookUrl,
					instagram_url: formData.instagramUrl,
				};
				const response = await request.changePersonalInfo(
					dataToSend,
					token
				);
				if (!response) {
					showNotification(
						t("settingsPage.personalInfoTab.noServerResponse"),
						"error"
					);
					return;
				}
				if (response.error) {
					showNotification(
						t("settingsPage.personalInfoTab.updateError"),
						"error"
					);
				} else if (response.personalInfo) {
					const updatedUser = {
						...response.personalInfo,
						firstName: response.personalInfo.first_name,
						lastName: response.personalInfo.last_name,
						githubUrl: response.personalInfo.github_url,
						linkedinUrl: response.personalInfo.linkedin_url,
						websiteUrl: response.personalInfo.website_url,
						youtubeUrl: response.personalInfo.youtube_url,
						facebookUrl: response.personalInfo.facebook_url,
						instagramUrl: response.personalInfo.instagram_url,
					};
					updateUser(updatedUser);
					const newFormData = {
						firstName: response.personalInfo.first_name || "",
						lastName: response.personalInfo.last_name || "",
						username: response.personalInfo.username || "",
						bio: response.personalInfo.bio || "",
						avatar: response.personalInfo.avatar || "",
						githubUrl: response.personalInfo.github_url || "",
						linkedinUrl: response.personalInfo.linkedin_url || "",
						websiteUrl: response.personalInfo.website_url || "",
						youtubeUrl: response.personalInfo.youtube_url || "",
						facebookUrl: response.personalInfo.facebook_url || "",
						instagramUrl: response.personalInfo.instagram_url || "",
					};
					setFormData(newFormData);
					setInitialFormData(newFormData);
					setCurrentAvatar(response.personalInfo.avatar || "");
					setUploadedImage(null);
					resetChanges();
					showNotification(
						t("settingsPage.personalInfoTab.updateSuccess"),
						"success"
					);
				} else {
					showNotification(
						t("settingsPage.personalInfoTab.invalidResponse"),
						"error"
					);
				}
			} catch (error) {
				showNotification(
					t("settingsPage.personalInfoTab.generalError"),
					"error"
				);
			} finally {
				setLoading(false);
			}
		},
		[
			formData,
			uploadedImage,
			token,
			updateUser,
			showNotification,
			setLoading,
			resetChanges,
			validateForm,
			t,
		]
	);

	useEffect(() => {
		updateSubmitHandler(submitHandler);
	}, [updateSubmitHandler, submitHandler]);

	useEffect(() => {
		const hasChanges = () => {
			if (uploadedImage) return true;
			for (const key in formData) {
				if (formData[key] !== initialFormData[key]) {
					return true;
				}
			}
			return false;
		};
		setHasChanges(hasChanges());
	}, [formData, uploadedImage, initialFormData, setHasChanges]);

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) {
			setErrors((prev) => ({...prev, [name]: ""}));
		}
		if (name === "username") {
			setUsernameAvailable(null);
		}
	};

	const handleCheckUsername = async () => {
		if (!formData.username.trim()) return;
		setIsCheckingUsername(true);
		try {
			const response = await request.checkUsernameExist(
				formData.username
			);
			if (response && response.exist !== undefined) {
				setUsernameAvailable(!response.exist);
				if (response.exist) {
					showNotification(
						t("settingsPage.personalInfoTab.usernameExists"),
						"error"
					);
				} else {
					showNotification(
						t("settingsPage.personalInfoTab.usernameAvailable"),
						"success"
					);
				}
			} else {
				setUsernameAvailable(null);
			}
		} catch (error) {
			showNotification(
				t("settingsPage.personalInfoTab.checkUsernameError"),
				"error"
			);
			setUsernameAvailable(null);
		} finally {
			setIsCheckingUsername(false);
		}
	};

	if (isLoadingInitial) {
		return (
			<div className={cx("loading-container")}>
				<Loading size={50} />
			</div>
		);
	}

	return (
		<div className={cx("personal-info-tab")}>
			<div className={cx("title")}>
				{t("settingsPage.personalInfoTab.title")}
			</div>
			<form className={cx("form")}>
				<div className={cx("form-group")}>
					<label htmlFor='avatar'>
						{t("settingsPage.personalInfoTab.avatar")}
					</label>
					<AnimatePresence mode='wait'>
						<motion.div
							key={isExpanded ? "expanded" : "collapsed"}
							className={cx("avatar-wrapper")}
							variants={containerVariants}
							initial='collapsed'
							animate={isExpanded ? "expanded" : "collapsed"}
							transition={{duration: 0.5, ease: "easeInOut"}}
						>
							{!isExpanded ? (
								<motion.div
									className={cx("avatar-section")}
									variants={itemVariants}
									initial='collapsed'
									animate='expanded'
									exit='collapsed'
									transition={{duration: 0.3}}
								>
									<div className={cx("avatar-container")}>
										<img
											src={base64ToImage(currentAvatar)}
											alt='Current Avatar'
											className={cx("avatar-preview")}
										/>
									</div>
									<Button
										type='button'
										onClick={() => setIsExpanded(true)}
									>
										{t(
											"settingsPage.personalInfoTab.changeAvatar"
										)}
									</Button>
								</motion.div>
							) : (
								<>
									<motion.div
										className={cx("avatar-container")}
										variants={itemVariants}
										initial='collapsed'
										animate='expanded'
										transition={{duration: 0.3, delay: 0.1}}
									>
										<img
											src={base64ToImage(currentAvatar)}
											alt='Current Avatar'
											className={cx("avatar-preview")}
										/>
									</motion.div>
									<motion.div
										className={cx("arrow-icon")}
										variants={itemVariants}
										initial='collapsed'
										animate='expanded'
										transition={{duration: 0.3, delay: 0.2}}
									>
										<FaArrowRight size={32} />
									</motion.div>
									<motion.div
										className={cx("dropzone", {
											active: isDragActive,
										})}
										variants={itemVariants}
										initial='collapsed'
										animate='expanded'
										transition={{duration: 0.3, delay: 0.3}}
										{...getRootProps()}
									>
										<input {...getInputProps()} />

										<div
											className={cx(
												"dropzone-placeholder"
											)}
										>
											{uploadedImage ? (
												<img
													src={uploadedImage}
													alt='New avatar'
													className={cx(
														"uploaded-image-preview"
													)}
												/>
											) : (
												<>
													<BiImageAdd size={48} />
													<p>
														{t(
															"settingsPage.personalInfoTab.dragDropImage"
														)}
													</p>
												</>
											)}
										</div>
									</motion.div>
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
				<div className={cx("row-form-group")}>
					<div className={cx("form-group")}>
						<label htmlFor='firstName'>
							{t("settingsPage.personalInfoTab.firstName")}
						</label>
						<Input
							type='text'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleInputChange}
							className={cx({error: errors.firstName})}
						/>
						{errors.firstName && (
							<span className={cx("error-text")}>
								{errors.firstName}
							</span>
						)}
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='lastName'>
							{t("settingsPage.personalInfoTab.lastName")}
						</label>
						<Input
							type='text'
							id='lastName'
							name='lastName'
							value={formData.lastName}
							onChange={handleInputChange}
							className={cx({error: errors.lastName})}
						/>
						{errors.lastName && (
							<span className={cx("error-text")}>
								{errors.lastName}
							</span>
						)}
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='username'>
							{t("settingsPage.personalInfoTab.username")}
						</label>
						<div className={cx("input-with-icon")}>
							<Input
								type='text'
								id='username'
								name='username'
								value={formData.username}
								onChange={handleInputChange}
								className={cx({
									error: errors.username,
									"username-available":
										usernameAvailable === true,
									"username-not-available":
										usernameAvailable === false,
								})}
							/>
							{formData.username !== initialFormData.username &&
								formData.username.trim() && (
									<button
										type='button'
										className={cx("check-icon", {
											checking: isCheckingUsername,
										})}
										onClick={handleCheckUsername}
										disabled={isCheckingUsername}
									>
										<BiRefresh />
									</button>
								)}
						</div>
						{errors.username && (
							<span className={cx("error-text")}>
								{errors.username}
							</span>
						)}
					</div>
				</div>
				<div className={cx("form-group")}>
					<label htmlFor='bio'>
						{t("settingsPage.personalInfoTab.bio")}
					</label>
					<Input
						type='textarea'
						id='bio'
						name='bio'
						value={formData.bio}
						onChange={handleInputChange}
						className={cx("textarea")}
						rows='4'
					/>
				</div>
				<div className={cx("additional-info")}>
					<div className={cx("form-group")}>
						<label htmlFor='githubUrl'>
							<FaGithub />{" "}
							{t("settingsPage.personalInfoTab.github")}
						</label>
						<Input
							type='url'
							id='githubUrl'
							name='githubUrl'
							value={formData.githubUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='linkedinUrl'>
							<FaLinkedin />{" "}
							{t("settingsPage.personalInfoTab.linkedin")}
						</label>
						<Input
							type='url'
							id='linkedinUrl'
							name='linkedinUrl'
							value={formData.linkedinUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='websiteUrl'>
							<FaGlobe />{" "}
							{t("settingsPage.personalInfoTab.website")}
						</label>
						<Input
							type='url'
							id='websiteUrl'
							name='websiteUrl'
							value={formData.websiteUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='youtubeUrl'>
							<FaYoutube />{" "}
							{t("settingsPage.personalInfoTab.youtube")}
						</label>
						<Input
							type='url'
							id='youtubeUrl'
							name='youtubeUrl'
							value={formData.youtubeUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='facebookUrl'>
							<FaFacebook />{" "}
							{t("settingsPage.personalInfoTab.facebook")}
						</label>
						<Input
							type='url'
							id='facebookUrl'
							name='facebookUrl'
							value={formData.facebookUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
					<div className={cx("form-group")}>
						<label htmlFor='instagramUrl'>
							<FaInstagram />{" "}
							{t("settingsPage.personalInfoTab.instagram")}
						</label>
						<Input
							type='url'
							id='instagramUrl'
							name='instagramUrl'
							value={formData.instagramUrl}
							onChange={handleInputChange}
							className={cx("input")}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PersonalInfoTab;
