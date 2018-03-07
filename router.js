var express = require("express");
var router = express.Router();
var User = require("./model/cadastroMM.js");
var cadastroDiretores = require("./model/cadastroDiretoresMM.js");
var config = require("./config");

var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

var nat = require("./nacionalidadesId.json");

router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

router
  .route("/diretores")
  .get(function(req, res) {
    cadastroDiretores.find(function(err, pessoas) {
      if (err) {
        res.send(err);
      }
      res.json(pessoas);
    });
  })
  .post(function(req, res) {
    req.assert("diretorNome", "Nome obrigatório").notEmpty();
    req.assert("diretorDataNascimento", "Campo obrigatóri").notEmpty();
    req.assert("diretorNacionalidade", "Campo obrigatóri").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      res.format({
        json: function() {
          res.status(400).json(errors);
        }
      });
      return;
    }

    var temp = new cadastroDiretores();
    temp.diretorNome = req.body.diretorNome;
    temp.diretorDataNascimento = req.body.diretorDataNascimento;
    temp.diretorNacionalidade = req.body.diretorNacionalidade;

    temp.save(function(err) {
      if (err) {
        res.send(err);
      }
      cadastroDiretores.find(function(err, pessoas) {
        if (err) {
          res.send(err);
        }
        res.json(pessoas);
      });
    });
  });
router.route("/cadastro/nacionalidade").get(function(req, res) {
  res.json(nat);
});

router
  .route("/cadastro")
  .get(function(req, res) {
    user.find(function(err, pessoas) {
      if (err) {
        res.send(err);
      }
      res.json(pessoas.nome);
    });
  })
  .post(function(req, res) {
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
  });
router.route("/autentica").post(function(req, res) {
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
});
router.route("/cadastro/nacionalidade").get(function(req, res) {
  res.json(nat);
});
module.exports = router;
