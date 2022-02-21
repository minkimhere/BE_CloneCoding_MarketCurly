const Users = require("../models/users"); // 유저 스키마
const jwt = require("jsonwebtoken"); // jwt 토큰 사용
const Joi = require("joi"); // 유효성 검증 라이브러리
const bcrypt = require("bcrypt");

// 이메일 중복확인 validate 할 스키마
const emailCheckSchema = Joi.object({
  email: Joi.string().required(),
});

// 이메일 중복확인
const joinCheck = async (req, res) => {
  try {
    const { email } = await emailCheckSchema.validateAsync(req.body); // Joi 유효성 검사
    const existEmail = await Users.findOne({ email }); // User document 안에서 email 있는지 찾음.

    if (!existEmail) {
      return res.json({ ok: true, message: "사용가능한 이메일입니다." });
    }

    res.json({ ok: false, message: "이미 사용중인 이메일입니다." });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: `이메일 중복확인을 실패하였습니다`, // Joi 유효성 탈락, 오타 등
    });
    console.error(`이메일 중복확인에서 ${error}에러가 발생하였습니다.`);
  }
};

// 회원가입 validate할 스키마
const joinSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string(). required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string().required(),
});

// 회원가입
const join = async (req, res) => {
  try {
    const { email, name, password, confirmpassword } = await joinSchema.validateAsync(
      // Joi 유효성 검사
      req.body
    );
    const existEmail = await Users.findOne({ email }); // User document 안에서 email 있는지 찾음.

    if (password !== confirmpassword) {
      return res.json({
        ok: false,
        message: "비밀번호가 비민번호 확인란과 일치하지 않습니다.",
      });
    }

    if (existEmail) {
      return res.json({ ok: true, message: "이메일 중복체크를 해주세요." });
    }

    const encodedPassword = bcrypt.hashSync(password, 10);
    await Users.create({ email, name, password: encodedPassword });
    res.json({ ok: true, message: "회원가입이 성공적으로 완료되었습니다." });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "회원가입을 실패하였습니다.", // Joi 유효성 탈락, 오타 등
    });
    console.error(`회원가입에서 ${error}에러가 발생하였습니다.`);
  }
};

// 로그인 validate할 스키마
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  try {
    const { email } = await loginSchema.validateAsync(req.body);
    const { password } = await loginSchema.validateAsync(req.body);
    const user = await Users.findOne({ email }); // db에 저장된 user 회원 가입 정보 있는지 찾음

    if (!user) {
      // 이메일 검사
      return res.json({
        ok: false,
        message: "이메일 또는 패스워드가 잘못되었습니다.", // 보안을 위해 메시지를 명시적으로 보내지 않음
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      // 비밀번호 검사 (입력받은 비밀번호, 디비에 있는 암호화된 비밀번호 비교해줌)
      return res.json({
        ok: false,
        message: "이메일 또는 패스워드가 잘못되었습니다.",
      });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.TOKENKEY); // 사용자를 구분하기 위해서 userId를 JWT에 저장해주고 토큰 생성
    res.json({
      ok: true,
      message: "로그인이 성공적으로 완료되었습니다.",
      token,
    });
  } catch (error) {
    res.json({ ok: false, message: `로그인을 실패하였습니다.` });
    console.error(`로그인에서  ${error}가 발생했습니다.`);
  }
};

// 로그인 정보 불러오기 (auth-middleware에서 locals에 저장해놓은 거 가져오기)
const auth = async (req, res) => {
  try {
    const user = res.locals.user;
    res.json({
      ok: true,
      message: "로그인 정보 불러오기 성공",
      userId: user.userId,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: `로그인 정보 불러오기 실패`,
    });
    console.error(`로그인 정보 불러오기에서 ${error}가 발생했습니다.`);
  }
};

module.exports = {
  joinCheck, // 회원가입에서 이메일 중복검사
  join, // 회원가입
  login, // 로그인
  auth, // 로그인 정보 불러오기 (auth-middleware에 저장된 거)
};