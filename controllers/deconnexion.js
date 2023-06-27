const express = require("express");
const jwt = require("jsonwebtoken");
const InactiveToken = require("../models/Deconnexion").model("InactiveToken");

exports.deconnexion = (req, res, next) => {
  const token = req.body.token;

  const newInactiveToken = new InactiveToken({
    token: token,
  });

  newInactiveToken
    .save()
    .then(() =>
      res.status(200).json({
        message: "Token ajouté à la collection inactiveToken !",
      })
    )
    .catch((err) => res.status(400).json("Erreur : " + err));
};
