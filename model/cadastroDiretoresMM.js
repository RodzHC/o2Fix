var mongoose = require("mongoose");

var cadastroDiretoresSchema = mongoose.Schema({
  diretorNome: {
    type: String,
    trim: true,
    unique: true
  },
  diretorDataNascimento: String,
  diretorNacionalidade: String
});

module.exports = mongoose.model("cadastroDiretores", cadastroDiretoresSchema);
