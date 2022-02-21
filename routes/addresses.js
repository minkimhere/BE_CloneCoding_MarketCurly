const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const { postAddress, getAddress} = require('../controller/addresses'); 

// 주소 추가
router.post('/:userId', authMiddleware, postAddress);

// 주소 조회
router.get('/:userId', authMiddleware, getAddress);

module.exports = router;