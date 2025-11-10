const fs = require("fs").promises;
const path = require("path");
const {execSync} = require("child_process");

const runJavaScriptCode = async (source, input, tempDir) => {
	const fileName = `temp_${Date.now()}_${Math.random()
		.toString(36)
		.substr(2, 9)}`;
	const jsFile = path.join(tempDir, `${fileName}.js`);
	const inputFile = path.join(tempDir, `${fileName}_input.txt`);

	try {
		await fs.writeFile(jsFile, source);
		await fs.writeFile(inputFile, input);

		// Run JavaScript code
		const output = execSync(`node "${jsFile}" < "${inputFile}"`, {
			timeout: 5000,
			encoding: "utf8",
		});

		// Clean up files
		await Promise.all([
			fs.unlink(jsFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);

		return output;
	} catch (error) {
		// Clean up files in case of error
		await Promise.all([
			fs.unlink(jsFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);
		throw error;
	}
};

module.exports = {runJavaScriptCode};
