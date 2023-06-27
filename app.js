const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const LeurreSouple = require("./models/Leurres").model("LeurreSouple");
const LeurreDur = require("./models/Leurres").model("LeurreDur");
const LeurreMetallique = require("./models/Leurres").model("LeurreMetallique");

const leurresRoutes = require("./routes/leurres");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
const verifyTokenRoutes = require("./routes/verifyToken");
const deconnexionRoutes = require("./routes/deconnexion");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect(
		"mongodb+srv://lausebastien:4PlLxpyQYnpeBrKW@cluster0.kmwbybb.mongodb.net/",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/api/leurres", leurresRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", verifyTokenRoutes);
app.use("/api", deconnexionRoutes);

module.exports = app;
