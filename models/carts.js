// const { array } = require('joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartsSchema = new mongoose.Schema({
  postId: String,
  title: String,
  price: String,
  quantity: Number,
  img: String,
});

module.exports = mongoose.model('Carts', cartsSchema);
