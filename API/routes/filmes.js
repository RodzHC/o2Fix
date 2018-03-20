var express = require("express");
var router = express.Router();
var cadastroFilmes = require("../model/cadastroFilmesMM.js");
var cadastroDiretores = require("../model/cadastroDiretoresMM.js");

var filmes = {
  get: function(req, res) {
    cadastroFilmes.find(function(err, fi) {
      if (err) {
        return res.send(err);
      }

      try {
        console.log(Object.keys(fi));
      } catch (e) {
        console.log(e);
      }
      console.log(
        `Filme tem a propriedade teste ? ${fi[0].hasOwnProperty("teste")}`
      );
      console.log(`teste : ${fi[0].teste}`);

      console.log(
        `Filme tem a propriedade filmeDiretor ? ${fi[0].hasOwnProperty(
          "filmeDiretor"
        )}`
      );

      let temp = fi.map(async filme => {
        return new Promise(function(resolve, reject) {
          cadastroDiretores.find({ _id: filme.filmeDiretor }, function(
            err,
            diretor
          ) {
            if (err) {
              return reject(err);
            }

            try {
              console.log(`Keys do filme ?${Object.keys(filme)}`);
              filme.filmeDiretor = diretor;
            } catch (err) {
              console.log(err);
            }

            return resolve(filme);
          });
        });
      });

      console.log(temp);

      Promise.all(temp)
        .then(t => {
          console.log("respondendo json");
          return res.json(t);
        })
        .catch(err => {
          return res.status(500).json;
        });
    });
  },
  post: function(req, res) {
    if (!req.body.filmeTitulo) {
      return res.status(400).json({
        success: false,
        message: "Titulo Obrigatório.",
        code: "1"
      });
    } else if (!req.body.filmeDataLancamento) {
      return res
        .status(400)
        .send({ success: false, message: "Data de Lançamento Obrigatório." });
    } else if (!req.body.filmeDiretor) {
      return res
        .status(400)
        .send({ success: false, message: "Diretor Obrigatório." });
    }

    function transformaData(data) {
      console.log(data);
      const regex = /(\d{4})-(\d\d)-(\d\d)/g;

      const temp = regex.exec(data);
      var dataMod = [];
      dataMod.push(temp[3]);
      dataMod.push(temp[2]);
      dataMod.push(temp[1]);
      console.log(dataMod);
      var re = dataMod.join("-");

      return re;
    }

    var temp = new cadastroFilmes();
    temp.filmeTitulo = req.body.filmeTitulo;
    temp.filmeDataLancamento = transformaData(req.body.filmeDataLancamento);
    temp.filmeDiretor = req.body.filmeDiretor;
    temp.filmeSinopse = req.body.filmeSinopse;

    temp.save(function(err) {
      if (err) {
        return res.send(err);
      }
      cadastroFilmes.find(function(err, pessoas) {
        if (err) {
          return res.send(err);
        }
        return res.json({
          success: true,
          message: "Cadastro efetuado com sucesso !",
          content: pessoas
        });
      });
    });
  }
};

module.exports = filmes;
