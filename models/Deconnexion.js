const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const inactiveTokenSchema = mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
});

// inactiveTokenSchema.plugin(uniqueValidator);

module.exports = mongoose.model("InactiveToken", inactiveTokenSchema);
