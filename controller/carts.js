const Cart = require('../models/carts');
const Posts = require('../models/pages');

const postCart = async (req, res) => {
    const userEmail = res.locals.user.email;
    // console.log(userEmail)
    const { postId, quantity } = req.body;
    const thePost = await Posts.findOne({postId});

    const exitCart = await Cart.findOne({ userId: userEmail, postId });
    console.log(exitCart)
    if(exitCart){
      await Cart.updateOne({ userId : userEmail, postId }, { $inc: { quantity:+quantity }});
      return res.status(200).json({ ok: 'true22' })
    } 
    try{
      await Cart.create({
        userEmail,
        postId,
        title: thePost.title,
        price: thePost.price,
        img : thePost.img,
        quantity,
      });
      const data = { userId : userEmail, postId, title: thePost.title, price: thePost.price, img : thePost.img, quantity};
      // console.log(data)
      res.status(200).json({ ok: 'true', data });
    } catch (error) {
      res.status(400).json({ ok: 'false' });
    }
};

const getCart = async (req, res) => {
  const userId = res.locals.user.userId;
  console.log(userId, '유저, 포스트 아이디 확인용');
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