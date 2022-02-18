const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/market-curly')
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connect;