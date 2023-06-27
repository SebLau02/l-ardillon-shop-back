const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				nom: req.body.nom,
				prenom: req.body.prenom,
				password: hash,
			});
			user.save()
				.then(() =>
					res.status(201).json({
						message: "Utilisateur créé",
						acountCreated: true,
					})
				)
				.catch((error) =>
					res.status(400).json({
						message: "Email invalide",
						error,
						acountCreated: false,
					})
				);
		})
		.catch((err) => res.status(500).json({ err, acountCreated: false }));
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	Promise.all([
		User.findOne({ email: email }),
		Admin.findOne({ email: email }),
	])
		.then((data) => {
			const user = data[0];
			const admin = data[1];

			if (user === null && admin === null) {
				res.status(401).json({
					message: "Paire d'identifiant incorrect",
					isConnected: false,
				});
			} else if (admin === null) {
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							res.status(401).json({
								message:
									"Paire identifiant/mot de passe incorrect",
								isConnected: false,
							});
						} else {
							res.status(200).json({
								message: "Vous êtes connecté !",
								isConnected: true,
								id: user.id,
								role: user.role,
								token: jwt.sign(
									{ id: user._id, role: user.role },
									"RANDOM_TOKEN_SECRET",
									{ expiresIn: "24h" }
								),
							});
						}
					})
					.catch((error) =>
						res.status(500).json({ error, isConnected: false })
					);
			} else {
				bcrypt
					.compare(req.body.password, admin.password)
					.then((valid) => {
						if (!valid) {
							res.status(401).json({
								message:
									"Paire identifiant/mot de passe incorrect",
								isConnected: false,
							});
						} else {
							res.status(200).json({
								message:
									"Vous êtes connecté en tant qu'administrateur!",
								isConnected: true,
								id: admin.id,
								role: admin.role,
								token: jwt.sign(
									{
										id: admin._id,
										role: admin.role,
									},
									"RANDOM_TOKEN_SECRET",
									{ expiresIn: "24h" }
								),
							});
						}
					})
					.catch((error) =>
						res.status(500).json({ error, isConnected: false })
					);
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.getAllUsers = (req, res, next) => {
	Promise.all([User.find(), Admin.find()])
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.getOneUser = (req, res, next) => {
	const userId = req.params.userId;
	Promise.all([User.findOne({ _id: userId }), Admin.findOne({ _id: userId })])
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.addAdresse = (req, res, next) => {
	const { userId } = req.params;
	const { nomVoie, numero, codePostale, ville, complement } = req.body;

	Promise.all([
		User.findOneAndUpdate(
			{ _id: userId },
			{
				$push: {
					adresse: {
						nomVoie,
						numero,
						codePostale,
						ville,
						complement,
					},
				},
			},
			{ new: true }
		),
		Admin.findOneAndUpdate(
			{ _id: userId },
			{
				$push: {
					adresse: {
						nomVoie,
						numero,
						codePostale,
						ville,
						complement,
					},
				},
			},
			{ new: true }
		),
	])
		.then((updatedInfos) => {
			res.status(200).json({
				message: "Adresse ajouté avec succès",
				updatedInfos,
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

//********** a utiliser avec parcimonie **********

exports.deleteAllUsers = (req, res, next) => {
	Promise.all([User.deleteMany(), Admin.deleteMany()])
		.then((result) => {
			res.json({
				result,
				message: "Tout les utilisateurs ont été supprimé",
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.deleteOneUsers = (req, res, next) => {
	const { userId } = req.params;

	Promise.all([
		User.deleteOne({ _id: userId }),
		Admin.deleteOne({ _id: userId }),
	])
		.then((result) => {
			res.json({
				result,
				message: "L'utilisateurs a été supprimé",
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};
