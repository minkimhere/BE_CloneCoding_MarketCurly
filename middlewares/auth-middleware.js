const jwt = require("jsonwebtoken");
const Users = require("../models/users");

module.exports = (req, res, next) => {
  // authoriztion 참조
  const { authorization } = req.headers; // 프론트에서 대문자로 보내도 여기서는 소문자로 변환됨
  const [tokenType, tokenValue] = authorization.split(" "); // 공백을 기준으로 배열을 반환 // Bearer랑 외계어 사이에 공백있음.

  if (!tokenValue) {
    res.locals.users = null;
    next();
    return;
  }

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
  try {
    const { userId } = jwt.verify(tokenValue, process.env.TOKENKEY); // 시크릿키로 검증해서 유효하다면 디코딩 값 넣어주기.(users.js에서 userId로 인코딩했으므로 여기서도 userId로 디코딩)
    Users.findById(userId)
      .exec()
      .then((user) => {
        res.locals.user = user; //locals에 유저 정보 저장
        next(); // 다음 미들웨어 실행하기 // next 안하면 미들웨어에서 에러처리에 걸림
      });
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};
