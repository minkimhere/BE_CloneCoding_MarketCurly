const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

// Userschema get 요청으로 사용할 때 _id 값을 string으로 형변환 해주고 가상속성으로 사용하게 해줌.
UsersSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});
UsersSchema.set('toJSON', { // string -> Json으로 바꿔서 가상속성에 사용 가능.
  virtuals: true,
});

module.exports = mongoose.model('Users', UsersSchema);