const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel");
const AppError = require("../utils/errors");
const asyncHandle = require("express-async-handler");

const authenticate = asyncHandle(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		throw new AppError("No authentication token, access denied", 401);
	}

	if (token.split(".").length !== 3) {
		throw new AppError("Invalid token format, access denied", 401);
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET);

	if (!verified) {
		throw new AppError("Token verification failed, access denied", 401);
	}

	const user = await User.findById(verified.id);
	if (!user) {
		throw new AppError("User not found, access denied", 401);
	}

	req.user = {
		id: user._id.toString(),
		_id: user._id,
		email: user.email,
		name: user.name,
	};

	next();
});

const requireAdmin = asyncHandle(async (req, res, next) => {
	if (!req.user) {
		throw new AppError("Authentication required", 401);
	}

	const user = await User.findById(req.user.id);
	if (!user || user.role !== "admin") {
		throw new AppError("Admin access required", 403);
	}

	next();
});

module.exports = {authenticate, requireAdmin};
