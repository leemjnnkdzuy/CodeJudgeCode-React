const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMailHelper = require("../Helpers/sendMailHelper");
const crypto = require("crypto");
const AppError = require("../utils/errors");
const asyncHandle = require("express-async-handler");
const {User} = require("../models/userModel");
const {Submission} = require("../models/submissionModel");
const {EditorSettings} = require("../models/editorSettingsModel");

const register = asyncHandle(async (req, res) => {
	const {username, email, password, confirmPassword, first_name, last_name} =
		req.body;
	if (
		!username ||
		!email ||
		!password ||
		!confirmPassword ||
		!first_name ||
		!last_name
	) {
		throw new AppError("Vui lòng nhập đầy đủ thông tin!", 400);
	}
	if (password !== confirmPassword) {
		throw new AppError("Mật khẩu không khớp!", 400);
	}
	const existingEmail = await User.findOne({email});
	if (existingEmail) {
		throw new AppError("Email đã tồn tại!", 400);
	}
	const existingUsername = await User.findOne({username});
	if (existingUsername) {
		throw new AppError("Tên người dùng đã tồn tại!", 400);
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const verificationCode = Math.floor(
		100000 + Math.random() * 900000
	).toString();
	const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
	const user = new User({
		username,
		email,
		password: hashedPassword,
		first_name,
		last_name,
		isVerified: false,
		verificationCode,
		verificationCodeExpires,
	});
	await user.save();
	const editorSettings = new EditorSettings({userId: user._id});
	await editorSettings.save();
	user.editSettings = editorSettings._id;
	await user.save();
	await sendMailHelper({
		email,
		subject: "Xác minh tài khoản XCode",
		html: `<p>Mã xác minh của bạn là: <b>${verificationCode}</b></p>`,
	});
	return res.status(201).json({message: "Đăng ký thành công!"});
});

const verify = asyncHandle(async (req, res) => {
	const {code} = req.body;
	if (!code) throw new AppError("Thiếu mã xác minh!", 400);
	const user = await User.findOne({
		verificationCode: code,
		verificationCodeExpires: {$gt: new Date()},
	});
	if (!user) throw new AppError("Mã xác minh không hợp lệ!", 400);
	user.isVerified = true;
	user.verificationCode = undefined;
	user.verificationCodeExpires = undefined;
	await user.save();
	return res.status(200).json({message: "Xác minh thành công!"});
});

const login = asyncHandle(async (req, res) => {
	const {username, email, password} = req.body;
	if ((!username && !email) || !password) {
		throw new AppError("Vui lòng nhập đầy đủ thông tin!", 400);
	}
	let user = null;
	if (username && email) {
		user = await User.findOne({$or: [{username}, {email}]});
	} else if (username) {
		user = await User.findOne({username});
	} else if (email) {
		user = await User.findOne({email});
	}
	if (!user) {
		throw new AppError("Sai tài khoản hoặc mật khẩu!", 401);
	}
	if (!user.isVerified) {
		throw new AppError("Tài khoản chưa xác minh!", 401);
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new AppError("Sai tài khoản hoặc mật khẩu!", 401);
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	let loginStreak = user.login_streak || 0;
	let lastLoginDate = user.last_login_date
		? new Date(user.last_login_date)
		: null;
	let updated = false;
	if (!lastLoginDate) {
		loginStreak = 1;
		updated = true;
	} else {
		lastLoginDate.setHours(0, 0, 0, 0);
		const diffDays = Math.floor(
			(today - lastLoginDate) / (1000 * 60 * 60 * 24)
		);
		if (diffDays === 1) {
			loginStreak += 1;
			updated = true;
		} else if (diffDays > 1) {
			loginStreak = 1;
			updated = true;
		}
	}
	user.last_login_date = today;
	user.last_login = new Date();
	user.login_streak = loginStreak;
	if (updated) {
		if (loginStreak === 7 && !user.badges.includes("7_Day_Login_Streak"))
			user.badges.push("7_Day_Login_Streak");
		if (loginStreak === 30 && !user.badges.includes("30_Day_Login_Streak"))
			user.badges.push("30_Day_Login_Streak");
		if (
			loginStreak === 100 &&
			!user.badges.includes("100_Day_Login_Streak")
		)
			user.badges.push("100_Day_Login_Streak");
		if (
			loginStreak === 365 &&
			!user.badges.includes("Year_Long_Login_Streak")
		)
			user.badges.push("Year_Long_Login_Streak");
	}
	await user.save();

	const editorSettings = await EditorSettings.findOne({userId: user._id});

	const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	return res.status(200).json({
		token,
		user: {
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
			first_name: user.first_name,
			last_name: user.last_name,
			avatar: user.avatar,
			theme: user.theme,
			language: user.language,
		},
		editorSettings: {
			autoCloseBrackets: editorSettings?.autoCloseBrackets ?? true,
			fontFamily: editorSettings?.fontFamily ?? "'Fira Code', monospace",
			fontSize: editorSettings?.fontSize ?? 14,
			formatOnPaste: editorSettings?.formatOnPaste ?? true,
			lineNumbers: editorSettings?.lineNumbers ?? true,
			minimap: editorSettings?.minimap ?? false,
			tabSize: editorSettings?.tabSize ?? 4,
			theme: editorSettings?.theme ?? "sync",
			wordWrap: editorSettings?.wordWrap ?? true,
		},
	});
});

const forgotPassword = asyncHandle(async (req, res) => {
	const {email} = req.body;
	if (!email) throw new AppError("Vui lòng nhập email!", 400);
	const user = await User.findOne({email});
	if (!user) throw new AppError("Email không tồn tại!", 400);
	const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
	const resetPinExpires = new Date(Date.now() + 10 * 60 * 1000);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	user.resetPin = resetPin;
	user.resetPinExpires = resetPinExpires;
	await user.save();
	await sendMailHelper({
		email,
		subject: "Khôi phục mật khẩu XCode",
		html: `<p>Mã xác thực đặt lại mật khẩu của bạn là: <b>${resetPin}</b></p>`,
	});
	return res.status(200).json({message: "Mã xác thực đã được gửi về email!"});
});

const verifyResetPin = asyncHandle(async (req, res) => {
	const {email, code} = req.body;
	if (!email || !code)
		throw new AppError("Thiếu email hoặc mã xác thực!", 400);
	const user = await User.findOne({
		email,
		resetPin: code,
		resetPinExpires: {$gt: new Date()},
	});
	if (!user)
		throw new AppError("Mã xác thực không hợp lệ hoặc đã hết hạn!", 400);
	const resetToken = jwt.sign(
		{id: user._id, type: "reset"},
		process.env.JWT_SECRET,
		{expiresIn: "15m"}
	);
	user.resetPin = undefined;
	user.resetPinExpires = undefined;
	await user.save();
	return res.status(200).json({message: "Xác thực thành công!", resetToken});
});

const resetPassword = asyncHandle(async (req, res) => {
	const {password, confirmPassword, resetToken} = req.body;
	if (!password || !confirmPassword || !resetToken) {
		throw new AppError("Vui lòng nhập đầy đủ thông tin!", 400);
	}
	if (password !== confirmPassword) {
		throw new AppError("Mật khẩu không khớp!", 400);
	}
	let payload;
	try {
		payload = jwt.verify(resetToken, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 400);
	}
	if (!payload || !payload.id || payload.type !== "reset") {
		throw new AppError("Token không hợp lệ!", 400);
	}
	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Token không hợp lệ!", 400);
	}
	user.password = await bcrypt.hash(password, 10);
	await user.save();
	return res.status(200).json({message: "Đặt lại mật khẩu thành công!"});
});

const reloadUserProfile = asyncHandle(async (req, res) => {
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}
	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}
	const editorSettings = await EditorSettings.findOne({userId: user._id});
	return res.status(200).json({
		user: {
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
			first_name: user.first_name,
			last_name: user.last_name,
			avatar: user.avatar,
			theme: user.theme,
			language: user.language,
		},
		editorSettings: {
			autoCloseBrackets: editorSettings?.autoCloseBrackets ?? true,
			fontFamily: editorSettings?.fontFamily ?? "'Fira Code', monospace",
			fontSize: editorSettings?.fontSize ?? 14,
			formatOnPaste: editorSettings?.formatOnPaste ?? true,
			lineNumbers: editorSettings?.lineNumbers ?? true,
			minimap: editorSettings?.minimap ?? false,
			tabSize: editorSettings?.tabSize ?? 4,
			theme: editorSettings?.theme ?? "sync",
			wordWrap: editorSettings?.wordWrap ?? true,
		},
	});
});

const homeData = asyncHandle(async (req, res) => {
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}
	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}
	const total_problems_solved = user.problems_solved
		? user.problems_solved.length
		: 0;
	const total_submissions = user.submissions ? user.submissions.length : 0;
	const total_contests_accepted = user.contests_accepted
		? user.contests_accepted.length
		: 0;
	const total_post = user.post ? user.post.length : 0;
	return res.status(200).json({
		login_streak: user.login_streak,
		rating: user.rating,
		total_problems_solved,
		total_submissions,
		total_contests_accepted,
		total_post,
		badges: user.badges,
	});
});

const userData = asyncHandle(async (req, res) => {
	const {idOrUserName} = req.params;

	let user;
	if (isNaN(idOrUserName)) {
		user = await User.findOne({username: idOrUserName});
	} else {
		user = await User.findById(idOrUserName);
	}

	if (!user) {
		throw new AppError("User not found", 404);
	}

	const submissions = await Submission.find({
		userId: user._id,
	})
		.sort({createdAt: -1})
		.populate("problemId", "questionId titleSlug difficulty details")
		.select("-code");

	const formattedSubmissions = submissions.map((submission) => ({
		id: submission._id,
		problemId: submission.problemId._id,
		problemTitle:
			submission.problemId.details.en?.title ||
			submission.problemId.titleSlug,
		problemSlug: submission.problemId.titleSlug,
		problemDifficulty: submission.problemId.difficulty,
		language: submission.language,
		status: submission.status,
		submittedAt: submission.createdAt,
	}));

	return res.status(200).json({
		success: true,
		data: {
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			avatar: user.avatar,
			bio: user.bio,
			github_url: user.github_url,
			linkedin_url: user.linkedin_url,
			website_url: user.website_url,
			youtube_url: user.youtube_url,
			facebook_url: user.facebook_url,
			instagram_url: user.instagram_url,
			badges: user.badges,
			submissions: formattedSubmissions,
			rating: user.rating,
			created_at: user.createdAt,
		},
	});
});

const checkUsernameExist = asyncHandle(async (req, res) => {
	const {username} = req.body;
	if (!username) {
		throw new AppError("Username is required", 400);
	}
	const user = await User.findOne({username});
	return res.status(200).json({
		exist: !!user,
	});
});

const changePassword = asyncHandle(async (req, res) => {
	const {password} = req.body;
	if (!password) {
		throw new AppError("Vui lòng nhập mật khẩu hiện tại!", 400);
	}
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}
	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new AppError("Mật khẩu hiện tại không đúng!", 400);
	}
	const tempAuthHashCode = crypto.randomBytes(128).toString("hex");
	user.tempAuthHashCode = tempAuthHashCode;
	user.tempAuthHashCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
	await user.save();
	return res.status(200).json({
		success: true,
		tempAuthHashCode,
	});
});

const confirmChangePassword = asyncHandle(async (req, res) => {
	const {tempAuthHashCode, newPassword, confirmNewPassword} = req.body;
	if (!tempAuthHashCode || !newPassword || !confirmNewPassword) {
		throw new AppError("Vui lòng nhập đầy đủ thông tin!", 400);
	}
	if (newPassword !== confirmNewPassword) {
		throw new AppError("Mật khẩu mới không khớp!", 400);
	}
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}
	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}
	if (
		!user.tempAuthHashCode ||
		user.tempAuthHashCode !== tempAuthHashCode.trim() ||
		!user.tempAuthHashCodeExpires ||
		user.tempAuthHashCodeExpires < new Date()
	) {
		throw new AppError("Mã xác thực không hợp lệ hoặc đã hết hạn!", 400);
	}
	user.password = await bcrypt.hash(newPassword, 10);
	user.tempAuthHashCode = null;
	user.tempAuthHashCodeExpires = null;
	await user.save();
	const newToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	return res.status(200).json({
		success: true,
		token: newToken,
	});
});

// Email change flow implementation
const changeEmail = asyncHandle(async (req, res) => {
	const {password} = req.body;
	if (!password) {
		throw new AppError("Vui lòng nhập mật khẩu hiện tại!", 400);
	}

	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new AppError("Mật khẩu hiện tại không đúng!", 400);
	}

	// Generate PIN for current email verification
	const changeEmailPin = Math.floor(
		100000 + Math.random() * 900000
	).toString();
	const changeEmailPinExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	user.changeEmailPin = changeEmailPin;
	user.changeEmailPinExpires = changeEmailPinExpires;
	await user.save();

	await sendMailHelper({
		email: user.email,
		subject: "Xác thực thay đổi email XCode",
		html: `<p>Mã xác thực thay đổi email của bạn là: <b>${changeEmailPin}</b></p>
			   <p>Mã này có hiệu lực trong 10 phút.</p>`,
	});

	return res.status(200).json({
		success: true,
		sendMail: true,
	});
});

const confirmChangeEmail = asyncHandle(async (req, res) => {
	const {pin} = req.body;
	if (!pin) {
		throw new AppError("Vui lòng nhập mã PIN!", 400);
	}

	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	if (
		!user.changeEmailPin ||
		user.changeEmailPin !== pin.trim() ||
		!user.changeEmailPinExpires ||
		user.changeEmailPinExpires < new Date()
	) {
		throw new AppError("Mã PIN không hợp lệ hoặc đã hết hạn!", 400);
	}

	// Generate change email auth hash code
	const changeMailAuthHashCode = crypto.randomBytes(128).toString("hex");
	user.changeMailAuthHashCode = changeMailAuthHashCode;
	user.changeMailAuthHashCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
	user.changeEmailPin = undefined;
	user.changeEmailPinExpires = undefined;
	await user.save();

	return res.status(200).json({
		success: true,
		changeMailAuthHashCode,
	});
});

const sendVerificationEmail = asyncHandle(async (req, res) => {
	const {email, changeMailAuthHashCode} = req.body;
	if (!email || !changeMailAuthHashCode) {
		throw new AppError("Vui lòng nhập email mới và mã xác thực!", 400);
	}

	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	if (
		!user.changeMailAuthHashCode ||
		user.changeMailAuthHashCode !== changeMailAuthHashCode.trim() ||
		!user.changeMailAuthHashCodeExpires ||
		user.changeMailAuthHashCodeExpires < new Date()
	) {
		throw new AppError("Mã xác thực không hợp lệ hoặc đã hết hạn!", 400);
	}

	// Check if new email already exists
	const existingUser = await User.findOne({email});
	if (existingUser && existingUser._id.toString() !== user._id.toString()) {
		throw new AppError(
			"Email này đã được sử dụng bởi tài khoản khác!",
			400
		);
	}

	// Generate PIN for new email verification
	const newEmailPin = Math.floor(100000 + Math.random() * 900000).toString();
	const newEmailPinExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	user.newEmail = email;
	user.newEmailPin = newEmailPin;
	user.newEmailPinExpires = newEmailPinExpires;
	await user.save();

	await sendMailHelper({
		email,
		subject: "Xác minh email mới XCode",
		html: `<p>Mã xác minh email mới của bạn là: <b>${newEmailPin}</b></p>
			   <p>Mã này có hiệu lực trong 10 phút.</p>`,
	});

	return res.status(200).json({
		success: true,
		sendMail: true,
	});
});

const confirmNewEmail = asyncHandle(async (req, res) => {
	const {pin} = req.body;
	if (!pin) {
		throw new AppError("Vui lòng nhập mã PIN!", 400);
	}

	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	if (
		!user.newEmailPin ||
		user.newEmailPin !== pin.trim() ||
		!user.newEmailPinExpires ||
		user.newEmailPinExpires < new Date() ||
		!user.newEmail
	) {
		throw new AppError("Mã PIN không hợp lệ hoặc đã hết hạn!", 400);
	}

	// Update user email
	const newEmail = user.newEmail;
	user.email = newEmail;
	user.newEmail = undefined;
	user.newEmailPin = undefined;
	user.newEmailPinExpires = undefined;
	user.changeMailAuthHashCode = undefined;
	user.changeMailAuthHashCodeExpires = undefined;
	await user.save();

	return res.status(200).json({
		success: true,
		newMail: newEmail,
	});
});

const resendChangeEmail = asyncHandle(async (req, res) => {
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	if (!user.changeEmailPin || !user.changeEmailPinExpires) {
		throw new AppError(
			"Không có yêu cầu thay đổi email nào đang chờ xử lý!",
			400
		);
	}

	const changeEmailPin = Math.floor(
		100000 + Math.random() * 900000
	).toString();
	const changeEmailPinExpires = new Date(Date.now() + 10 * 60 * 1000);

	user.changeEmailPin = changeEmailPin;
	user.changeEmailPinExpires = changeEmailPinExpires;
	await user.save();

	await sendMailHelper({
		email: user.email,
		subject: "Xác thực thay đổi email XCode",
		html: `<p>Mã xác thực thay đổi email của bạn là: <b>${changeEmailPin}</b></p>
			   <p>Mã này có hiệu lực trong 10 phút.</p>`,
	});

	return res.status(200).json({
		success: true,
		sendMail: true,
	});
});

const resendVerificationEmail = asyncHandle(async (req, res) => {
	const authHeader = req.headers.authorization || req.header("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Không có token!", 401);
	}
	const token = authHeader.split(" ")[1];
	let payload;
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 401);
	}

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("Không tìm thấy user!", 404);
	}

	if (!user.newEmail || !user.newEmailPin || !user.newEmailPinExpires) {
		throw new AppError(
			"Không có yêu cầu xác minh email mới nào đang chờ xử lý!",
			400
		);
	}

	// Generate new PIN for new email verification
	const newEmailPin = Math.floor(100000 + Math.random() * 900000).toString();
	const newEmailPinExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	user.newEmailPin = newEmailPin;
	user.newEmailPinExpires = newEmailPinExpires;
	await user.save();

	await sendMailHelper({
		email: user.newEmail,
		subject: "Xác minh email mới XCode",
		html: `<p>Mã xác minh email mới của bạn là: <b>${newEmailPin}</b></p>
			   <p>Mã này có hiệu lực trong 10 phút.</p>`,
	});

	return res.status(200).json({
		success: true,
		sendMail: true,
	});
});

module.exports = {
	register,
	verify,
	login,
	forgotPassword,
	verifyResetPin,
	resetPassword,
	reloadUserProfile,
	homeData,
	userData,
	checkUsernameExist,
	changePassword,
	confirmChangePassword,
	changeEmail,
	resendChangeEmail,
	confirmChangeEmail,
	sendVerificationEmail,
	resendVerificationEmail,
	confirmNewEmail,
};
