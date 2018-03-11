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
  console.log(email);
  console.log(senha);

  User.findOne({ email: email }, function(err, user) {
    console.log("entrei no findone");
    console.log(user);
    if (err) {
      console.log("dando erro aqui !");
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    } else {
      console.log("Achei e-mail ! Inicializando bcrypt...");
      bcrypt.compare(senha, user.senha, function(err, result) {
        console.log("Entrein o bcrypt !");
        if (result === true) {
          console.log("Senha compativel");
          return callback(null, user);
        } else {
          console.log("Senha errada!");
          var err = new Error("Senha errada!");
          err.status = 401;
          return callback(err);
        }
      });
    }
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
var User = mongoose.model("User", CadastroSchema);
module.exports = User;
