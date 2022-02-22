const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')
const { putAddress, getAddress } = require('../controller/addresses')

// 주소 추가는 기본적으로 회원가입 할 때 빈 값으로 들어감

// 주소 설정(수정) (User 스키마의 address 수정)
router.put('/:userId', authMiddleware, putAddress);

// 주소 조회
router.get('/:userId', authMiddleware, getAddress);

module.exports = router;