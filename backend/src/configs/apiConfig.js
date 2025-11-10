const express = require("express");
const userRoutes = require("../routes/userRoutes");
const problemRoutes = require("../routes/problemRoutes");
const submissionRoutes = require("../routes/submissionRoutes");
const codeRunnerRoutes = require("../routes/codeRunnerRoutes");
const settingsRoutes = require("../routes/SettingsRoutes");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/problems", problemRoutes);
router.use("/submissions", submissionRoutes);
router.use("/code", codeRunnerRoutes);
router.use("/settings", settingsRoutes);

module.exports = router;
