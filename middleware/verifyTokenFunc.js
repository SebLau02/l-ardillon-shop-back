const jwt = require("jsonwebtoken");
const secret = "RANDOM_TOKEN_SECRET";

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
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).send(false);
  }
};
