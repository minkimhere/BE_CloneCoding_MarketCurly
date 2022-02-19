const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/market-curly', {
      dbName: 'market-curly',
      ignoreUndefined: true,
    })
    .catch((error) => {
      console.error(error);
    });
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;