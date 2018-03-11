var express = require("express");
var router = express.Router();

var User = require("../model/cadastroMM.js");

cadastro = {
  get: function(req, res) {
    user.find(function(err, pessoas) {
      if (err) {
        res.send(err);
      }
      res.json(pessoas.nome);
    });
  },
  post: function(req, res) {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome Obrigatório.",
        code: "1"
      });
    } else if (!req.body.email) {
      return res
        .status(400)
        .send({ success: false, message: "E-mail Obrigatório." });
    } else if (!req.body.senha) {
      return res
        .status(400)
        .json({ success: false, message: "Senha Obrigatório.", code: "3" });
    } else if (!req.body.senhaConf) {
      return res
        .status(400)
        .json({ success: false, message: "Confirme a Senha.", code: "4" });
    } else if (req.body.senhaConf != req.body.senha) {
      return res
        .status(400)
        .json({ success: false, message: "Senhas Diferentes !", code: "5" });
    }

    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        console.log("Checando se já existe e-mail cadastrado ...");
        if (err) throw err;

        if (user) {
          return res.json({
            success: false,
            message: "E-mail Já Cadastrado",
            code: "6"
          });
        }

        const userData = {
          email: req.body.email,
          nome: req.body.nome,
          senha: req.body.senha,
          senhaConf: req.body.senhaConf,
          admin: false
        };

        User.create(userData, function(err, user) {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else {
            console.log(req.body.nome + " cadastrado com sucesso ");

            return res.json({
              success: true,
              message: "Cadastro efetuado com sucesso !"
            });
          }
        });
      }
    );
  }
};

module.exports = cadastro;
