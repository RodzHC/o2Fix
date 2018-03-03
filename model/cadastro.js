var mongoose = require("mongoose");

var cadastroSchema = mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

module.exports = mongoose.model("cadastro", cadastroSchema);
