const { array } = require('joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = new mongoose.Schema({
  title: String,
  price: String,
  img: String,
  discount: String,
  oldprice: String,
  order_count: Number,
  like_count: Number,
});

postsSchema.plugin(AutoIncrement, { inc_field: 'postId' });

module.exports = mongoose.model('Posts', postsSchema);