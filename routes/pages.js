const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/pages");

// 메인페이지 신상품
router.get("/main/new", controller.mainitems);

// 서브페이지 베스트
router.get("/sub/best", controller.bestitems);

// 서브페이지 알뜰상품
router.get("/sub/discount", controller.discountitems);

module.exports = router;
