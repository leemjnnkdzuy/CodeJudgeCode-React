const fs = require("fs").promises;
const path = require("path");
const {execSync} = require("child_process");

const runPythonCode = async (source, input, tempDir) => {
	const fileName = `temp_${Date.now()}_${Math.random()
		.toString(36)
		.substr(2, 9)}`;
	const pyFile = path.join(tempDir, `${fileName}.py`);
	const inputFile = path.join(tempDir, `${fileName}_input.txt`);

	try {
		await fs.writeFile(pyFile, source);
		await fs.writeFile(inputFile, input);

		// Run Python code
		const output = execSync(`python "${pyFile}" < "${inputFile}"`, {
			timeout: 5000,
			encoding: "utf8",
		});

		// Clean up files
		await Promise.all([
			fs.unlink(pyFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);

		return output;
	} catch (error) {
		// Clean up files in case of error
		await Promise.all([
			fs.unlink(pyFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);
		throw error;
	}
};

module.exports = {runPythonCode};
