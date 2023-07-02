const jwt = require("jsonwebtoken");
const tokenSecret = require("../utils/secretToken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, tokenSecret);
		const userId = decodedToken.userId;
		const role = decodedToken.userRole;

		req.auth = {
			userId: userId,
		};
		next();
	} catch (error) {
		res.status(401).json({ error });
	}
};
