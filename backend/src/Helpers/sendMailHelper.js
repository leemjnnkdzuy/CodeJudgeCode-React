const nodemailer = require("nodemailer");

const sendMailHelper = async (options) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.MAILUSERTOSEND,
				pass: process.env.MAILPASSWORDTOSEND,
			},
		});

		const mailOptions = {
			from: `"CodeJudge Account Verification" <${process.env.MAILUSERTOSEND}>`,
			to: options.email,
			subject: options.subject,
			html: options.html,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return true;
	} catch (error) {
		console.error("Error sending email:", error);
		return false;
	}
};

module.exports = sendMailHelper;
