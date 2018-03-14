var mongoose = require("mongoose");

var cadastroFilmesSchema = mongoose.Schema({
  filmeTitulo: {
    type: String,
    trim: true,
    unique: true
  },
  filmeDataLancamento: String,
  filmeDiretor: String,
  filmeSinopse: String
});

module.exports = mongoose.model("cadastroFilmes", cadastroFilmesSchema);
