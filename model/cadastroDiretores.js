var mongoose = require('mongoose');



var cadastroDiretoresSchema = mongoose.Schema({
  diretorNome: String ,
  diretorDataNascimento: Date,
  diretorNacionalidade:String,
  });

module.exports = mongoose.model('cadastroDiretores', cadastroDiretoresSchema);
