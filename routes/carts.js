const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const controller = require('../controller/carts');

// 장바구니 추가
router.post("/:postId", authMiddleware, controller.postCart);

// 장바구니 조회
router.get("/", authMiddleware, controller.getCart);

// 장바구니 수정
router.put("/:postId", authMiddleware, controller.putCart);

// 장바구니 수량 증가 +1
router.put("/inc/:postId", authMiddleware, controller.putCartInc);

// 장바구니 수량 감소 -1
router.put("/dec/:postId", authMiddleware, controller.putCartDec);

// 장바구니 삭제
router.delete("/:postId", authMiddleware, controller.deleteCart);

module.exports = router;
