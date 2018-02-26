var mongoose = require('mongoose');


function createDBConnection(){
if (!process.env.NODE_ENV || process.env.node === 'dev'){
  return mongoose.connect('mongodb://localhost/dev');}

if(process.env.NODE_ENV == 'test'){
  return mongoose.connect('mongodb://localhost/test');

}

module.exports = function(){

  return createDBConnection;

}
