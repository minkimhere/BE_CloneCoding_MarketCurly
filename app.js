const express = require('express');
const connect = require('./models');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
connect(); // 스키마 연결

const usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');
const cartsRouter = require('./routes/carts');

const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // 빈칸으로 두면 모든 요청 허용
app.use(requestMiddleware);

app.use('/user', [usersRouter]);
app.use('/page', [pagesRouter]);
app.use('/cart', [cartsRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌습니다.');
});