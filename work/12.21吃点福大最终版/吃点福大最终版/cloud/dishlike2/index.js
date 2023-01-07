 //需要event.id,foodid,userid（UserFood库中的）
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV
 }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

//首页添加喜欢菜品或删除喜欢菜品，通过点击爱心
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  switch(event.id)  //根据是收藏还是取消收藏即event.id，添加数据或者删除数据
  {
    case 0: //未收藏时，往userfood中添加一条数据
      return await db.collection('UserFood')
      .add({
        data:{
            foodid: event.foodid,
            userid: event.userid
        }
      })
    case 1: //已收藏时，删除userfood中对应的这条数据
      return await db.collection('UserFood').where({
        foodid: event.foodid,
        userid: event.userid
      })
      .remove() 
  }
}