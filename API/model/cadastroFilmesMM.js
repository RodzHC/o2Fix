var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cadastroFilmesSchema = mongoose.Schema({
  filmeTitulo: {
    type: String,
    trim: true,
    unique: true
  },
  filmeDataLancamento: String,
  filmeDiretor: { type: Schema.Types.ObjectId, ref: "cadastroDiretores" },
  filmeSinopse: String
});

module.exports = mongoose.model("cadastroFilmes", cadastroFilmesSchema);
