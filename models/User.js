const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adresseSchema = mongoose.Schema({
	nomVoie: { type: String, required: true },
	numero: { type: Number, required: true },
	codePostale: { type: Number, required: true },
	ville: { type: String, required: true },
	complement: { type: String },
});

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	nom: { type: String, required: true },
	prenom: { type: String, required: true },
	role: { type: String, default: "client" },
	adresse: { type: [adresseSchema], default: [], required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
