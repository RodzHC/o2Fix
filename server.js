//server.js
// ‘use strict’.
//Importando as dependências
var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var morgan = require("morgan");
var mongoose = require("mongoose");
// var session = require("express-session");
// var MongoStore = require("connect-mongo")(session);
//Configurações básicas de segredo + database
var config = require("./config");
//Criando instancias
var app = express();

//Seta a porta (ou deixa ela em 3001)
var port = process.env.API_PORT || 3001;
app.set("superSecret", config.secret);
mongoose.connect(config.database);
const db = mongoose.connection;

//
// app.use(
//   session({
//     secret: "work hard",
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongooseConnection: db
//     })
//   })
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(expressValidator());

//now we can set the route path & initialize the API
var router = require("./router");

//Use our router configuration when we call /api
app.use("/api", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`Rodando API na porta: ${port}`);
});
module.exports = app;
