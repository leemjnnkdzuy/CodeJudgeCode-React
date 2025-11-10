const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./src/utils/connectDatabase");
const corsConfig = require("./src/configs/corsConfig");
const apiRoutes = require("./src/configs/apiConfig");
const errorHandler = require("./src/middlewares/errorHandlerMiddleware");

dotenv.config();
connectDatabase();

const app = express();
app.use(express.json({limit: "10mb"}));
app.use(corsConfig());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
	res.send("SERVER ON");
});

app.use(errorHandler);

const PORT = process.env.PORT;

try {
	console.log(`Server is running on port ${PORT}`);
	app.listen(PORT);
} catch (error) {
	console.error("Server startup error:", error);
	process.exit(1);
}
