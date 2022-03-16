const mongoose = require("mongoose");

// EC2 서버용
// const connect = () => {
//   mongoose //
//     .connect(process.env.MONGO_URL)
//     .catch((err) => console.log(err));
// };

// 로컬용
const connect = () => {
  mongoose //
    .connect('mongodb://localhost:27017/market-curly')
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
