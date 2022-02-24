const Posts = require('../models/pages');

// 메인페이지로 줄 정보 
exports.mainitems = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    
    // const sortByNew = await Posts.find().exec();
    const sortByNew = paginatedResults(page, limit, Posts)

    res.json({ ok:'true', sortByNew });
    
  } catch (error) {
    res.status(400).json({ ok: 'false'})
  } 
};
// 베스트 페이지로 줄 정보 (랜덤 정렬)
exports.bestitems = async (req, res) => {
  try {
    const sortByBest = await Posts.find().exec();
    //가격 낮은순
    // sortByBest.sort((a,b) => Number(a.price.replace(/,|원/gi,'')) - Number(b.price.replace(/,|원/gi,'')))
    sortByBest.sort(()=> Math.random() - 0.5);
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

function paginatedResults(page, limit, model) {
  return async (req, res) => {
  
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
      try {
          results.results = await model.find().limit(limit).skip(startIndex).exec()  
          res.paginatedResults = results 
      } catch (e) {
          res.status(500).json({ok: 'false2'})
      }
  }
}