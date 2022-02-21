const mongoose = require('mongoose');

const connect = () => {
  mongoose 
    .connect('mongodb://localhost:27017/market-curly'|| process.env.MONGO_URL)
    .catch((err) => console.log(err));
};

module.exports = connect;