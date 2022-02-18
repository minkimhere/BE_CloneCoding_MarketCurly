const { array } = require('joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

postsSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('Posts', postsSchema);