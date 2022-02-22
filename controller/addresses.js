const Users = require("../models/users"); // 유저 스키마

// 주소 설정
const putAddress = async (req, res) => {
  try {
    const { address } = req.body; // 주소
    const { userId } = req.params; // params userId
    const loginUserId = res.locals.user.userId; // 로그인 정보에 담아놓은 userId
    const findUser = await Users.findById(userId); // 디비에 있는 현재 user

    if (!address) {
      // 주소 미입력시
      return res.json({ ok: false, message: "주소 설정을 실패하였습니다." });
    }

    if (findUser.userId === loginUserId) {
      await Users.updateOne({ _id: userId }, { $set: { address } });
      res.json({ ok: true, message: "주소 설정이 완료되었습니다." });
    } else {
      res.json({ ok: false, message: "주소 설정을 실패하였습니다." });
    }
  } catch (error) {
    res.status(400).json({ ok: false, message: "주소 설정을 실패하였습니다." });
    console.error(`주소 설정에서 ${error}에러가 발생하였습니다.`);
  }
};

// 주소 수정
const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);

    if (!user) {
      return res.json({ ok: false, message: "주소 조회를 실패하였습니다." });
    }

    res.json({
      ok: true,
      message: "주소 조회가 완료되었습니다.",
      address: user.address,
    });
  } catch (error) {
    res.json({ ok: false, message: "주소 조회를 실패하였습니다." });
    console.error(`주소 조회에서 ${error}에러가 발생하였습니다.`);
  }
};

module.exports = {
  putAddress,
  getAddress,
};
