const mongoose = require("mongoose");

const editorSettingsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	autoCloseBrackets: {
		type: Boolean,
		default: true,
	},
	fontFamily: {
		type: String,
		enum: [
			"'Consolas', monospace",
			"'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
			"'Fira Code', monospace",
			"'Source Code Pro', monospace",
			"'JetBrains Mono', monospace",
			"'Roboto Mono', monospace",
			"'Courier New', monospace",
			"'Lucida Console', monospace",
		],
		default: "'Fira Code', monospace",
	},
	fontSize: {
		type: Number,
		enum: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		default: 14,
	},
	formatOnPaste: {
		type: Boolean,
		default: true,
	},
	lineNumbers: {
		type: Boolean,
		default: true,
	},
	minimap: {
		type: Boolean,
		default: false,
	},
	tabSize: {
		type: Number,
		enum: [2, 4, 8],
		default: 4,
	},
	theme: {
		type: String,
		enum: ["vs-light", "vs-dark", "hc-black", "sync"],
		default: "sync",
	},
	wordWrap: {
		type: Boolean,
		default: true,
	},
});

exports.EditorSettings = mongoose.model("EditorSettings", editorSettingsSchema);
