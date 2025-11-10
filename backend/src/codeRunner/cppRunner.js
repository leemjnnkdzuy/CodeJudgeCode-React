const fs = require("fs").promises;
const path = require("path");
const {execSync} = require("child_process");

const runCppCode = async (source, input, tempDir) => {
	const fileName = `temp_${Date.now()}_${Math.random()
		.toString(36)
		.substr(2, 9)}`;
	const cppFile = path.join(tempDir, `${fileName}.cpp`);
	const exeFile = path.join(tempDir, `${fileName}.exe`);
	const inputFile = path.join(tempDir, `${fileName}_input.txt`);

	try {
		await fs.writeFile(cppFile, source);
		await fs.writeFile(inputFile, input);

		// Compile C++ code
		execSync(`g++ -o "${exeFile}" "${cppFile}"`, {timeout: 10000});

		// Run the executable
		const output = execSync(`"${exeFile}" < "${inputFile}"`, {
			timeout: 5000,
			encoding: "utf8",
		});

		// Clean up files
		await Promise.all([
			fs.unlink(cppFile).catch(() => {}),
			fs.unlink(exeFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);

		return output;
	} catch (error) {
		// Clean up files in case of error
		await Promise.all([
			fs.unlink(cppFile).catch(() => {}),
			fs.unlink(exeFile).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);
		throw error;
	}
};

module.exports = {runCppCode};
