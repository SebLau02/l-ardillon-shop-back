const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const admin = new Admin({
				email: req.body.email,
				nom: req.body.nom,
				prenom: req.body.prenom,
				password: hash,
			});
			admin
				.save()
				.then((data) =>
					res
						.status(201)
						.json({ data, message: "Un nouvel admimn a été créé" })
				)
				.catch((error) =>
					res.status(400).json({ message: "Email invalide", error })
				);
		})
		.catch((err) => res.status(500).json({ err }));
};
