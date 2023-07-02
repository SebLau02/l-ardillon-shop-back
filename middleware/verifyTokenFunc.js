const jwt = require("jsonwebtoken");
const tokenSecret = require("../utils/secretToken");

//********** middleware pour vérifier la validité du token de l'utilisateur **********

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && typeof req.headers.authorization === "string"
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).send(false);
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    return res.status(400).json({ err, message: "Non autorisé" });
  }
};
