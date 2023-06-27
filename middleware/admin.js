const jwt = require("jsonwebtoken");
const InactiveToken = require("../models/Deconnexion").model("InactiveToken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const adminId = decodedToken.id;
		const role = decodedToken.role;

		if (role !== "admin") {
			throw "Vous n'êtes pas autorisé à accéder à cette ressource.";
		} else {
			req.auth = {
				adminId: adminId,
			};
			next();
		}
	} catch (error) {
		res.status(401).json({
			message: "Vous n'êtes pas autorisé à accéder à cette page",
			error,
		});
	}
};
