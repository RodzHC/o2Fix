var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cadastroDiretoresSchema = mongoose.Schema({
  diretorNome: {
    type: String,
    trim: true,
    unique: true
  },
  diretorDataNascimento: String,
  diretorNacionalidade: String,

  diretorFilmes: [{ type: Schema.Types.ObjectId, ref: "cadastroFilmes" }]
});

module.exports = mongoose.model("cadastroDiretores", cadastroDiretoresSchema);
