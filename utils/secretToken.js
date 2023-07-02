const crypto = require("crypto");
const tokenSecret = crypto.randomBytes(32).toString("hex");

module.exports = tokenSecret;
