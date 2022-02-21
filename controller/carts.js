const Cart = require('../models/carts');

const postCart = async (req, res) => {
    const userId = res.locals.user.userId;
    const { postId } = req.params;
    const { title, price, img, quantity } = req.body;

    // const exitCart = await Cart.findOne({ userId, postId });
    // if(exitCart){
    //   await Cart.updateOne({ userId, postId }, { $inc: { quantity: +1 }});
    //   res.status(200).json({
    //     ok: "false",
    //     msg: '장바구니에 상품을 담았습니다. 이미 담으신 상품이 있어 추가됩니다.'
    //   })
    // }
    try{
      await Cart.create({
        userId,
        postId,
        title,
        price,
        img,
        quantity,
      });
      const data = { userId, postId, title, price, img, quantity};
      res.status(200).json({ ok: 'true', data });
    } catch (error) {
      res.status(400).json({ ok: 'false' });
    }
};

const getCart = async (req, res) => {
  const userId = res.locals.user.userId;
 
  try{
    const getCarts = await Cart.find({ userId });
      return res.status(200).json({ 
        ok: 'true',
        carts: getCarts
       });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

const putCart = async (req, res) => {
  const userId = res.locals.user.userId;
  const { postId } = req.params;
  const { quantity } = req.body;

  // if(quantity == 0 ){
  //   await Cart.deleteOne({
  //     userId,
  //     postId,
  //   });
  //   res.status(200).json({
  //     ok: 'true',
  //     msg: '삭제되었습니다.'
  //   });
  // }

  try{
    await Cart.updateOne({ userId, postId }, { $set: { quantity }});
    const putCarts = await Cart.find({ userId, postId });
    res.status(200).send({ ok: 'true', message: '수정 성공', putCarts});
  } catch (error) {
    res.status(400).json({ ok: 'false', message: '수정 실패'});
  }
};

const deleteCart = async (req, res) => {
  const userId = res.locals.user.userId;
  const { postId } = req.params;
  try{
    const deleteCarts = await Cart.find({ userId, postId });
    if(deleteCarts.length) {
      await Cart.deleteOne({ userId, postId });
    }
    res.status(200).json({ ok: 'true', message: '삭제 성공' });
  } catch (error) {
    res.status(400).json({ ok: 'false', message: '삭제 실패' });
  }
};

module.exports = {
  postCart,
  getCart,
  putCart,
  deleteCart,
};