const Posts = require('../models');


// 메인페이지로 줄 정보 
exports.mainitems = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const sortByNew = await paginatedResults(page, limit, Posts)
    
    res.json({ ok:'true', sortByNew });
    
  } catch (error) {
    res.status(400).json({ ok: 'false'})
  } 
};
// 베스트 페이지로 줄 정보 (랜덤 정렬)
exports.bestitems = async (req, res) => {
  try {
    const Allposts = await Posts.find().exec();
    
    //가격 낮은순
    // sortByBest.sort((a,b) => Number(a.price.replace(/,|원/gi,'')) - Number(b.price.replace(/,|원/gi,'')))

    Allposts.sort(()=> Math.random() - 0.5);

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page -1) * limit
    const endIndex = page * limit

    const sortByBest = {};
    if (endIndex < Allposts.length) {
          sortByBest.next = {
              page: page +1,
              limit: limit
          }
      }
      if (startIndex > 0) {
          sortByBest.previous = {
              page: page -1,
              limit: limit
          }
      }
      sortByBest.results = Allposts.splice(startIndex, limit)

    res.json({ ok:'true', sortByBest });
  } catch (error) {
    res.status(400).json({ ok: 'false'})
  }  
};
// 알뜰쇼핑 페이지로 줄 정보 (할인율 정렬)  
exports.discountitems = async (req, res) => {
  try {
    const sortByDis = await Posts.find().exec();
    sortByDis.sort((a,b) => Number(b.discount.replace('%','')) - Number(a.discount.replace('%','')))
    res.json({ ok:'true', sortByDis });
  } catch (error) {
    res.status(400).json({ ok: 'false'})
  }  
};


async function paginatedResults(page, limit, model) {

  const startIndex = (page -1) * limit
  const endIndex = page * limit
  
  const results = {}
  
  if (endIndex < await model.countDocuments().exec()) {
      results.next = {
          page: page +1,
          limit: limit
      }
  }
  if (startIndex > 0) {
      results.previous = {
          page: page -1,
          limit: limit
      }
  }
  
  results.results = await model.find().limit(limit).skip(startIndex).exec() 
  return results 
      
}