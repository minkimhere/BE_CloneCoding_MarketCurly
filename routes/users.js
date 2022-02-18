const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const { join, joinCheck, login, auth } = require('../controller/users');

// 회원가입
router.post('/join', join);

// 회원가입 이메일 중복검사
router.post('/join/check', joinCheck);

// 로그인
router.post('/login', login);

// 로그인 정보 불러오기
router.get('/auth', authMiddleware, auth);

module.exports = router;