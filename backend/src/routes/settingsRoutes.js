const express = require("express");
const router = express.Router();
const {
	getPersonalInfo,
	changePersonalInfo,
	getInterfaceAndLanguage,
	changeInterfaceAndLanguage,
	getEditorSettings,
	changeEditorSettings,
} = require("../controllers/settingsController");
const {authenticate} = require("../middlewares/authMiddleware");

router.get("/personal-info", authenticate, getPersonalInfo);
router.post("/personal-info/change", authenticate, changePersonalInfo);

router.get("/interface-and-language", authenticate, getInterfaceAndLanguage);
router.post(
	"/interface-and-language/change",
	authenticate,
	changeInterfaceAndLanguage
);

router.get("/editor-settings", authenticate, getEditorSettings);
router.post("/editor-settings/change", authenticate, changeEditorSettings);

module.exports = router;
