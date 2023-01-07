
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //get 该菜品价格，评价，价格标签，是否收藏
  var openid = wxContext.OPENID

  var fprice = await db.collection('Foods').where({//查询价格，fprice.data.price
    id: event.foodid
  }).get()   //获取菜品价格  

  var ftag = await db.collection('FoodTag').where({
    foodid: event.foodid,
  }).get()  //获取该食物有的tag
   


  var fovalue = await db.collection('Foods').where({//查询评分，fovalue.data.value
    id: event.foodid
  }).get()


  var score = await db.collection('ValueFood').where({//查询总评分人数
    foodid: event.foodid
  }).get()

  var length = score.data[0].value1 + score.data[0].value2 + score.data[0].value3 + score.data[0].value4 + score.data[0].value5

  var length1 = score.data[0].value1
  var length2 = score.data[0].value2
  var length3 = score.data[0].value3
  var length4 = score.data[0].value4
  var length5 = score.data[0].value5

  var flike = false
  var like = await db.collection('UserFood').where({
    userid: openid,
    foodid: event.foodid
  }).count()   //获取用户收藏数据，若成功则展现已收藏，若失败则展现未收藏

  if (like.total) {
    flike = true;
  }

  const per = {};
  per.fprice = fprice;
  per.fovalue = fovalue;
  per.length = length;
  per.length1 = length1;
  per.length2 = length2;
  per.length3 = length3;
  per.length4 = length4;
  per.length5 = length5;
  per.ftag = ftag;
  per.flike = flike;
  return per
  // return fprice,fovalue,fovalue,length1,length2,length3,length4,length5,ftag,flike
}

