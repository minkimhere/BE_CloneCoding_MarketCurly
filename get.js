const webdriver = require('selenium-webdriver'); 
const { By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
  // DB연결
const connect = require('./models');
connect();
const Posts = require('./models/pages') 

const run = async () => { 
  // 1. chromedriver 경로 설정 
  // chromedriver가 있는 경로를 입력 
  const service = new chrome.ServiceBuilder().build(); 
  chrome.setDefaultService(service); 
  
  // 2. chrome 브라우저 빌드 
  const driver = await new webdriver.Builder() 
  .forBrowser('chrome') 
  .build(); 
  
  // 3. google 사이트 열기 
   
  await page()
  // 3.1 css로 값 가져오기
  
  
  async function page() {
    //페이지에 대한 콘솔

    await driver.get('https://www.kurly.com/shop/goods/goods_list.php?category=038');
    let pagenum = 1;

    await inner_page();

    async function inner_page() {

    const cards = await driver.findElements(By.css('#goodsList > div.list_goods > div > ul > li'))
    console.log(`========= 이거슨 <${pagenum}>페이지============`)
    
    for (let i=1; i<=cards.length; i++) {
      let titles = await driver.findElement(By.css(`#goodsList > div.list_goods > div > ul > li:nth-child(${i}) > div > a > span.name`))
      let imgUrls = await driver.findElement(By.css(`#goodsList > div.list_goods > div > ul > li:nth-child(${i}) > div > div > a > img`))
      let prices = await driver.findElement(By.css(`#goodsList > div.list_goods > div > ul > li:nth-child(${i}) > div > a > span.cost `))
      // let discounts = await driver.findElement(By.css(`#goodsList > div.list_goods > div > ul > li:nth-child(${i}) > div > a > span.cost > span.dc`))

      let title = await titles.getText();
      let imgUrl = await imgUrls.getAttribute("src");
      let a_cost = await prices.getText();
      let [discount, price] = a_cost.split(" ");
      

      if (price !== undefined) {
        let [newprice, oldprice] = price.split("\n");
        console.log(`${i}`, {title, imgUrl, discount, price : newprice, oldprice})
        await Posts.create({
          title,
          price: newprice,
          img: imgUrl,
          discount,
          oldprice,
          order_count: 0,
          like_count: 0,
        });
      } else {
        console.log(`${i}`, {title, imgUrl, price : discount})
        await Posts.create({
          title,
          price: discount,
          img: imgUrl,
          discount : '0%',
          oldprice : null,
          order_count: 0,
          like_count: 0,
        })
      }

    }
    
    let pageButton = await driver.findElement(By.css('#goodsList > div.layout-pagination > div > a.layout-pagination-button.layout-pagination-next-page'))
    await pageButton.click();
    pagenum++
    if (pagenum < 2) {
      return await inner_page(pagenum);
    } else {
      return
    }
  
  } // inner_page 

} // page 

  // 4. 10초 후에 브라우저 종료 
  setTimeout(async () => { 
    await driver.quit(); 
    process.exit(0); 
  }, 10000); 
} 
    run();

  