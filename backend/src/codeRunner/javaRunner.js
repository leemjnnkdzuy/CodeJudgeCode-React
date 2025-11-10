const fs = require("fs").promises;
const path = require("path");
const {execSync} = require("child_process");

const runJavaCode = async (source, input, tempDir) => {
	const fileName = `temp_${Date.now()}_${Math.random()
		.toString(36)
		.substr(2, 9)}`;
	const javaFile = path.join(tempDir, `${fileName}.java`);
	const inputFile = path.join(tempDir, `${fileName}_input.txt`);

	try {
		// Extract class name from source
		const classMatch = source.match(/public\s+class\s+(\w+)/);
		const className = classMatch ? classMatch[1] : "Solution";

		// Replace the class name in source if needed
		const modifiedSource = source.replace(
			/public\s+class\s+\w+/,
			`public class ${className}`
		);

		await fs.writeFile(javaFile, modifiedSource);
		await fs.writeFile(inputFile, input);

		// Compile Java code
		execSync(`javac "${javaFile}"`, {timeout: 10000});

		// Run Java code
		const output = execSync(
			`java -cp "${tempDir}" ${className} < "${inputFile}"`,
			{
				timeout: 5000,
				encoding: "utf8",
			}
		);

		// Clean up files
		await Promise.all([
			fs.unlink(javaFile).catch(() => {}),
			fs.unlink(path.join(tempDir, `${className}.class`)).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);

		return output;
	} catch (error) {
		// Clean up files in case of error
		const classMatch = source.match(/public\s+class\s+(\w+)/);
		const className = classMatch ? classMatch[1] : "Solution";

		await Promise.all([
			fs.unlink(javaFile).catch(() => {}),
			fs.unlink(path.join(tempDir, `${className}.class`)).catch(() => {}),
			fs.unlink(inputFile).catch(() => {}),
		]);
		throw error;
	}
};

module.exports = {runJavaCode};
