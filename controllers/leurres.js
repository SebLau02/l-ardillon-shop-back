const LeurreSouple = require("../models/Leurres").model("LeurreSouple");
const LeurreDur = require("../models/Leurres").model("LeurreDur");
const LeurreMetallique = require("../models/Leurres").model("LeurreMetallique");

exports.createLeurre = (req, res, next) => {
	const typeLeurre = req.query.typeLeurre;
	const price = parseFloat(req.body.price);

	delete req.body._id;

	if (typeLeurre == "leurre-souple") {
		const leurreSouple = new LeurreSouple({
			...req.body,
			price: price,
		});
		leurreSouple
			.save()
			.then(() =>
				res.status(201).json({
					message: "Nouveau leurre souple ajouté avec succès",
				}),
			)
			.catch((error) => res.status(400).json({ message: error.message }));
	} else if (typeLeurre == "leurre-dur") {
		const leurreDur = new LeurreDur({
			...req.body,
		});
		leurreDur
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: "Nouveau leurre dur ajouté avec succès" }),
			)
			.catch((error) => res.status(400).json({ message: error.message }));
	} else if (typeLeurre == "leurre-metallique") {
		const leurreMetallique = new LeurreMetallique({
			...req.body,
		});
		leurreMetallique
			.save()
			.then(() =>
				res.status(201).json({
					message: "Nouveau leurre metallique ajouté avec succès",
					leurreMetallique,
				}),
			)
			.catch((error) => res.status(400).json({ message: error.message }));
	}
};

exports.getOneLeurre = (req, res, next) => {
	const leurreId = req.params.leurreId;

	Promise.all([
		LeurreSouple.findOne({ _id: leurreId }),
		LeurreDur.findOne({ _id: leurreId }),
		LeurreMetallique.findOne({ _id: leurreId }),
	])
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.getAllLeurre = (req, res, next) => {
	const typeLeurre = req.query.typeLeurre;

	if (typeLeurre) {
		if (typeLeurre == "leurre-souple") {
			LeurreSouple.find()
				.then((leurresSouples) =>
					res.status(200).json({ leurresSouples }),
				)
				.catch((error) => res.status(404).json({ error }));
		} else if (typeLeurre == "leurre-dur") {
			LeurreDur.find()
				.then((leurresDurs) => res.status(200).json({ leurresDurs }))
				.catch((error) => res.status(404).json({ error }));
		} else if (typeLeurre == "leurre-metallique") {
			LeurreMetallique.find()
				.then((leurresMetalliques) =>
					res.status(200).json({ leurresMetalliques }),
				)
				.catch((error) => res.status(404).json({ error }));
		}
	} else {
		Promise.all([
			LeurreSouple.find(),
			LeurreDur.find(),
			LeurreMetallique.find(),
		])
			.then(([leurresSouples, leurresDurs, leurresMetalliques]) => {
				const leurres = [
					...leurresSouples,
					...leurresDurs,
					...leurresMetalliques,
				];
				res.json(leurres);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send(err);
			});
	}
};

exports.modifyOneLeurre = (req, res, next) => {
	const leurreId = req.params.leurreId;

	Promise.all([
		LeurreSouple.updateOne(
			{ _id: leurreId },
			{ ...req.body, _id: leurreId },
		),
		LeurreDur.updateOne({ _id: leurreId }, { ...req.body, _id: leurreId }),
		LeurreMetallique.updateOne(
			{ _id: leurreId },
			{ ...req.body, _id: leurreId },
		),
	])
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.addColorToLeurre = (req, res, next) => {
	const { leurreId } = req.params;
	const { colorName, image, price, inStock } = req.body;

	Promise.all([
		LeurreSouple.findOneAndUpdate(
			{ _id: leurreId },
			{ $push: { colors: { colorName, image, price, inStock } } },
			{ new: true },
		),
		LeurreDur.findOneAndUpdate(
			{ _id: leurreId },
			{ $push: { colors: { colorName, image, price, inStock } } },
			{ new: true },
		),
		LeurreMetallique.findOneAndUpdate(
			{ _id: leurreId },
			{ $push: { colors: { colorName, image, price, inStock } } },
			{ new: true },
		),
	])
		.then((updatedLeurre) => {
			res.status(200).json({
				message: "Déclinaison ajouté avec succès",
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.deleteOneLeurre = (req, res, next) => {
	const leurreId = req.params.leurreId;

	Promise.all([
		LeurreSouple.deleteOne({ _id: req.params.leurreId }),
		LeurreDur.deleteOne({ _id: req.params.leurreId }),
		LeurreMetallique.deleteOne({ _id: req.params.leurreId }),
	])
		.then((result) => {
			res.json({ result, message: "Leurre supprimé" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.deleteOneLureRef = (req, res, next) => {
	const { lureId } = req.params;
	const { colorId } = req.params;

	Promise.all([
		LeurreSouple.findOneAndUpdate(
			{ _id: lureId },
			{ $pull: { colors: { _id: colorId } } },
			{ new: true },
		),
		LeurreDur.findOneAndUpdate(
			{ _id: lureId },
			{ $pull: { colors: { _id: colorId } } },
			{ new: true },
		),
		LeurreMetallique.findOneAndUpdate(
			{ _id: lureId },
			{ $pull: { colors: { _id: colorId } } },
			{ new: true },
		),
	])
		.then((result) => {
			res.json({ result, message: "Couleur supprimé" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

exports.deleteAllLeurre = (req, res, next) => {
	const leurreId = req.params.leurreId;

	Promise.all([
		LeurreSouple.deleteMany(),
		LeurreDur.deleteMany(),
		LeurreMetallique.deleteMany(),
	])
		.then((result) => {
			res.json({ result, message: "Collection supprimé supprimé" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};

//********** gerer les stocks et prix  **********

exports.stockManagement = (req, res, next) => {
	const { leurreId, colorId, newPrice, newStock } = req.body;

	Promise.all([
		LeurreSouple.findOneAndUpdate(
			{ _id: leurreId, "colors._id": colorId },
			{
				$set: {
					"colors.$.price": newPrice,
					"colors.$.inStock": newStock,
				},
			},
			{ new: true },
		),
		LeurreDur.findOneAndUpdate(
			{ _id: leurreId, "colors._id": colorId },
			{
				$set: {
					"colors.$.price": newPrice,
					"colors.$.inStock": newStock,
				},
			},
			{ new: true },
		),
		LeurreMetallique.findOneAndUpdate(
			{ _id: leurreId, "colors._id": colorId },
			{
				$set: {
					"colors.$.price": newPrice,
					"colors.$.inStock": newStock,
				},
			},
			{ new: true },
		),
	])
		.then((result) => {
			res.json({ result, message: "Prix et/ou stock modifié" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
};
