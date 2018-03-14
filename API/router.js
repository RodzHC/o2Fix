var express = require("express");
var router = express.Router();

var nat = require("./nacionalidadesId.json");

router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

router.route("/cadastro/nacionalidade").get(function(req, res) {
  res.json(nat);
});

var diretores = require("./routes/diretores");
router
  .route("/diretores")
  .get(diretores.get)
  .post(diretores.post);

var cadastro = require("./routes/cadastro");
router
  .route("/cadastro")
  .get(cadastro.get)
  .post(cadastro.post);

var filmes = require("./routes/filmes");
router
  .route("/filmes")
  .get(filmes.get)
  .post(filmes.post);

var autentica = require("./routes/autentica");

router.route("/autentica").post(autentica.post);

var token = require("./routes/token");

router.route("/autentica/token").post(token.post);

module.exports = router;
