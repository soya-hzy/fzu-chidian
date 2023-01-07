// 店铺结果返回
// 返回使用res.result返回的数组集合食物集合
// 入口
// wx.cloud.callFunction({
//   name:'storess',
//   data:{
//     businessid:Number(options.storeid),//商家id
//     length: this.data.list.length//分段加载
//   }
// })
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

//筛选界面根据标签返回商家信息

// 云函数入口函数

const db = cloud.database()

const _ = db.command

exports.main = async (event, context) => {
  var FoodList = await db.collection('BusinessFood').aggregate()
    .lookup({
      from: "Foods",
      localField: "foodid", // 主表连接键，即 article.id
      foreignField: "id", // 子表连接键，即 tag.article_id
      as: "Foods", // 窗口介绍
    })
    .lookup({
      from: "Business",
      localField: "businessid", // 主表连接键，即 article.id
      foreignField: "id", // 子表连接键，即 tag.article_id
      as: "Business",
    })
    .match({
      businessid: event.businessid,//商家id
    })
    .skip(event.length)
    .limit(20)
    .end()
  //返回数组
  var result = []
  var obj = {}
  FoodList.list.forEach((element) => {
    obj = {
      BusinessName: element.Business[0].name,
      BusinessAddress: element.Business[0].address,
      BusinessPhoto: element.Business[0].photo,
      BusinessValue: element.Business[0].value,
      Foodid: element.foodid,
      FoodName: element.Foods[0].name,
      FoodValue: element.Foods[0].value,
      FoodPhoto: element.Foods[0].photo,
      FoodPrice: element.Foods[0].price,
    }
    //加入result
    result.push(obj);
    //清空对象
    obj = {}
  })
  return result;
}