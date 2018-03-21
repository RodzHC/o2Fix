var express = require("express");
var router = express.Router();

var User = require("../model/cadastroMM.js");

var users = {
  get: function(req, res) {
    User.find({})
      .select("nome email admin")
      .exec(function(err, users) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, error: "Problema interno" });
        }

        return res.json(users);
      });
  }
};

module.exports = users;
