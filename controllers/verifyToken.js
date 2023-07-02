const express = require("express");

//********** fonction qui permet d'envoyer le token, l'id, et son status de connexion à l'utilisateur **********

exports.verifyToken = (req, res, next) => {
	const token = req.token;
	const user = req.user;
	const id = user.id;

	res.send({ isconnected: true, token: token, id });
};
