const cors = require("cors");

const setupcorsConfig = () => {
	const corsOptions = {
		origin: function (origin, callback) {
			const allowedOrigins = [
				"http://localhost:3000",
				"https://codejudge.leemjnnkdzuy.live/",
				"*",
			].filter(Boolean);

			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(
					new Error(`CORS policy: Origin ${origin} not allowed`)
				);
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
		preflightContinue: false,
		optionsSuccessStatus: 204,
	};

	return cors(corsOptions);
};

module.exports = setupcorsConfig;
