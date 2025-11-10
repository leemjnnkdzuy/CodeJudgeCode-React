const express = require("express");
const {
	testRun,
	submitSolution,
} = require("../controllers/codeRunnerController");
const {authenticate} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/test", testRun);

router.post("/submit", authenticate, submitSolution);

module.exports = router;
