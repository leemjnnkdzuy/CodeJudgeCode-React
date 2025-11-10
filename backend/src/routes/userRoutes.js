const express = require("express");
const router = express.Router();
const {
	reloadUserProfile,
	homeData,
	register,
	verify,
	login,
	forgotPassword,
	verifyResetPin,
	resetPassword,
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
} = require("../controllers/userController");
const {authenticate} = require("../middlewares/authMiddleware");

router.get("/reloadUserProfile", authenticate, reloadUserProfile);
router.get("/homeData", authenticate, homeData);
router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-pin", verifyResetPin);
router.post("/reset-password", resetPassword);
router.post("/check-username-exist", checkUsernameExist);
router.get("/:idOrUserName", userData);
router.post("/change-password", authenticate, changePassword);
router.post("/confirm-change-password", authenticate, confirmChangePassword);

router.post("/change-email", authenticate, changeEmail);
router.post("/resend-change-email", authenticate, resendChangeEmail);
router.post("/confirm-change-email", authenticate, confirmChangeEmail);
router.post("/send-verification-email", authenticate, sendVerificationEmail);
router.post(
	"/resend-verification-email",
	authenticate,
	resendVerificationEmail
);
router.post("/confirm-new-email", authenticate, confirmNewEmail);

module.exports = router;
