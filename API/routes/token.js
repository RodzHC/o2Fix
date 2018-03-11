var express = require("express");
var router = express.Router();
var User = require("../model/cadastroMM.js");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("../config");

var token = {
  post: function(req, res) {
    console.log("token:");
    console.log(req.body.token);
    var token =
      req.body.token || req.param("token") || req.headers["x-access-token"];

    // decode token
    if (token) {
      console.log("Tem um token !");
      // verifies secret and checks exp
      console.log(config.secret);
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // if everything is good, save to request for use in other routes

          console.log(decoded);
          return res.json({
            success: true,
            message: "Opa deu certo !",
            content: decoded
          });
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(400).send({
        success: false,
        message: "No token provided."
      });
    }
  }
};
module.exports = token;
