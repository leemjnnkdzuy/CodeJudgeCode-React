const asyncHandle = require("express-async-handler");
const AppError = require("../utils/errors");
const {EditorSettings} = require("../models/editorSettingsModel");
const {User} = require("../models/userModel");

const getPersonalInfo = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const user = await User.findById(userId).select(
		"first_name last_name username avatar bio github_url linkedin_url website_url youtube_url facebook_url instagram_url"
	);
	if (!user) {
		throw new AppError("User not found", 404);
	}
	res.status(200).json({
		message: "Personal info retrieved successfully",
		personalInfo: user,
	});
});

const changePersonalInfo = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const updates = req.body;

	const allowedFields = [
		"first_name",
		"last_name",
		"username",
		"avatar",
		"bio",
		"github_url",
		"linkedin_url",
		"website_url",
		"youtube_url",
		"facebook_url",
		"instagram_url",
	];

	const filteredUpdates = {};
	for (const field of allowedFields) {
		if (updates[field] !== undefined) {
			filteredUpdates[field] = updates[field];
		}
	}

	if (Object.keys(filteredUpdates).length === 0) {
		throw new AppError("No valid fields to update", 400);
	}

	const user = await User.findByIdAndUpdate(userId, filteredUpdates, {
		new: true,
		runValidators: true,
	}).select(
		"first_name last_name username avatar bio github_url linkedin_url website_url youtube_url facebook_url instagram_url"
	);

	res.status(200).json({
		message: "Personal info updated successfully",
		personalInfo: user,
	});
});

const getInterfaceAndLanguage = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const user = await User.findById(userId).select("language theme");
	if (!user) {
		throw new AppError("User not found", 404);
	}
	res.status(200).json({
		message: "Interface and language settings retrieved successfully",
		settings: user,
	});
});

const changeInterfaceAndLanguage = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const updates = req.body;

	const allowedFields = ["language", "theme"];

	const filteredUpdates = {};
	for (const field of allowedFields) {
		if (updates[field] !== undefined) {
			filteredUpdates[field] = updates[field];
		}
	}

	if (Object.keys(filteredUpdates).length === 0) {
		throw new AppError("No valid fields to update", 400);
	}

	const user = await User.findByIdAndUpdate(userId, filteredUpdates, {
		new: true,
		runValidators: true,
	}).select("language theme");

	res.status(200).json({
		message: "Interface and language settings updated successfully",
		settings: user,
	});
});

const getEditorSettings = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const editorSettings = await EditorSettings.findOne({userId});
	if (!editorSettings) {
		// Return default settings if not found
		const defaultSettings = {
			autoCloseBrackets: true,
			fontFamily: "'Fira Code', monospace",
			fontSize: 14,
			formatOnPaste: true,
			lineNumbers: true,
			minimap: false,
			tabSize: 4,
			theme: "sync",
			wordWrap: true,
		};
		res.status(200).json({
			message: "Editor settings retrieved successfully",
			editorSettings: defaultSettings,
		});
	} else {
		res.status(200).json({
			message: "Editor settings retrieved successfully",
			editorSettings,
		});
	}
});

const changeEditorSettings = asyncHandle(async (req, res) => {
	const userId = req.user.id;
	const updates = req.body;

	const allowedFields = [
		"autoCloseBrackets",
		"fontFamily",
		"fontSize",
		"formatOnPaste",
		"lineNumbers",
		"minimap",
		"tabSize",
		"theme",
		"wordWrap",
	];

	const filteredUpdates = {};
	for (const field of allowedFields) {
		if (updates[field] !== undefined) {
			filteredUpdates[field] = updates[field];
		}
	}

	if (Object.keys(filteredUpdates).length === 0) {
		throw new AppError("No valid fields to update", 400);
	}

	const editorSetting = await EditorSettings.findOneAndUpdate(
		{userId},
		filteredUpdates,
		{new: true, upsert: true}
	);

	res.status(200).json({
		message: "Editor settings updated successfully",
		editorSettings: editorSetting,
	});
});

module.exports = {
	getPersonalInfo,
	changePersonalInfo,
	getInterfaceAndLanguage,
	changeInterfaceAndLanguage,
	getEditorSettings,
	changeEditorSettings,
};
