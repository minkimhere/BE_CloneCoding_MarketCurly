require('dotenv').config(); // 환경변수

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

const connect = require('./models');
connect(); // 스키마 연결

const cors = require('cors');
app.use(cors()); // 빈칸으로 두면 모든 요청 허용

//Request 로그 남기는 미들웨어
const requestMiddleware = (req, res, next) => {
  console.log(
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "")
  );
  next();
};

app.use(requestMiddleware); // request log
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // form body parser

const usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');
const cartsRouter = require('./routes/carts');

app.use('/user', [usersRouter]);
app.use('/page', [pagesRouter]);
app.use('/cart', [cartsRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌습니다.');
});