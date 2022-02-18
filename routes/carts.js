const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// const { postCart, getCart, putCart, deleteCart } = require("../controller/pages");

// 장바구니 추가
// router.post("/main/new", postCart);

// 장바구니 조회
// router.post("/sub/best", getCart);

// 장바구니 수정
// router.post("/sub/discount", putCart);

// 장바구니 삭제
// router.post("/sub/discount", deleteCart);

module.exports = router;
