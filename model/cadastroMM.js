var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var CadastroSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  nome: {
    type: String,
    required: true,
    trim: true
  },
  senha: {
    type: String,
    required: true
  },
  senhaConf: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean
  }
});

//authenticate input against database
CadastroSchema.statics.authenticate = function(email, senha, callback) {
  cadastro.findOne({ email: email }).exec(function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(senha, user.senha, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};
//hashing a password before saving it to the database
CadastroSchema.pre("save", function(next) {
  console.log("Hashiando Senha");
  const user = this;
  console.log(this);
  bcrypt.hash(user.senha, 10, function(err, hash) {
    if (err) {
      console.log("Erro de hash");
      return next(err);
    }
    user.senha = hash;
    next();
  });
});

module.exports = mongoose.model("cadastro", CadastroSchema);
