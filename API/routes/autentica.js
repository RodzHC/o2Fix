var express = require("express");
var router = express.Router();
var User = require("../model/cadastroMM.js");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("../config");

var autentica = {
  post: function(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        success: false,
        message: "E-mail Obrigatório.",
        code: "1"
      });
    } else if (!req.body.senha) {
      return res
        .status(400)
        .json({ success: false, message: "Senha Obrigatória." });
    } else {
      console.log("Vou tentar iniciar o User");

      User.authenticate(req.body.email, req.body.senha, function(error, user) {
        console.log("entrei na callback do authenticate");
        if (error || !user) {
          return res
            .status(400)
            .json({ success: false, message: "Email ou Senha Inválido(s)!" });
        } else {
          // if user is found and password is right
          // create a token
          var payload = {
            admin: user.admin
          };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          return res.json({
            success: true,
            message: "Enjoy your token!",
            token: token
          });
        }
      });
    }
  }
};

module.exports = autentica;
