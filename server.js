//server.js
// ‘use strict’.
//Importando as dependências
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cadastro = require("./model/cadastro.js");
var cadastroDiretores = require("./model/cadastroDiretores.js");
var expressValidator = require("express-validator");
var nat = require("./nacionalidadesId.json");
//Criando instancias
var app = express();
var router = express.Router();
//Seta a porta (ou deixa ela em 3001)
var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use(expressValidator());

var port = process.env.API_PORT || 3001;
mongoose.connect("mongodb://localhost/dev");

//now we can set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});
//Use our router configuration when we call /api
app.use("/api", router);
//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
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
    // temp.nome = "Rodrigo";
    // temp.email = "rodrigo.marzullo@gmail.com";
    // temp.senha = "senha";
    temp.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Cadastro efetuado com sucesso !" });
    });
  });
router.route("/cadastro/nacionalidade").get(function(req, res) {
  res.json(nat);
});
router
  .route("/cadastro")
  .get(function(req, res) {
    cadastro.find(function(err, pessoas) {
      if (err) {
        res.send(err);
      }
      res.json(pessoas);
    });
  })
  .post(function(req, res) {
    req.assert("nome", "Nome Obrigatório").notEmpty();
    req.assert("email", "E-mail Obrigatório").notEmpty();
    req.assert("senha", "Senha Obrigatória").notEmpty();
    req.assert("senhaCheck", "Preenchimento obrigatório").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      res.format({
        json: function() {
          res.status(400).json(errors);
        }
      });
      return;
    }

    var temp = new cadastro();
    temp.nome = req.body.nome;
    temp.email = req.body.email;
    temp.senha = req.body.senha;
    // temp.nome = "Rodrigo";
    // temp.email = "rodrigo.marzullo@gmail.com";
    // temp.senha = "senha";
    temp.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Cadastro efetuado com sucesso !" });
    });
  });
