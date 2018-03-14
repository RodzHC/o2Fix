var express = require("express");
var router = express.Router();

var cadastroDiretores = require("../model/cadastroDiretoresMM.js");
var nat = require("../nacionalidadesId.json");

diretores = {
  get: function(req, res) {
    cadastroDiretores.find(function(err, pessoas) {
      if (err) {
        res.send(err);
      }
      res.json(pessoas);
    });
  },
  post: function(req, res) {
    if (!req.body.diretorNome) {
      return res.status(400).json({
        success: false,
        message: "Nome Obrigatório.",
        code: "1"
      });
    } else if (!req.body.diretorDataNascimento) {
      return res
        .status(400)
        .send({ success: false, message: "Data de Nascimento Obrigatório." });
    } else if (!req.body.diretorNacionalidade) {
      return res
        .status(400)
        .send({ success: false, message: "Nacionalidade Obrigatória." });
    }

    if (!req.body.diretorDataNascimento) {
      return res
        .status(400)
        .send({ success: false, message: "E-mail Obrigatório." });
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

    var temp = new cadastroDiretores();
    temp.diretorNome = req.body.diretorNome;
    temp.diretorDataNascimento = transformaData(req.body.diretorDataNascimento);
    temp.diretorNacionalidade = req.body.diretorNacionalidade;

    temp.save(function(err) {
      if (err) {
        return res.send(err);
      }
      cadastroDiretores.find(function(err, pessoas) {
        if (err) {
          return res.send(err);
        }
        return res.json(pessoas);
      });
    });
  }
};

module.exports = diretores;
