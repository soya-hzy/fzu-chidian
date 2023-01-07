// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var openid = wxContext.OPENID

    return await db.collection('TagFood').add({
      data:{
         tagid: event.tagid,
         foodid: event.foodid,
         //userid: event.userid
      }
       })
       .then(res =>{
         console.log('添加成功',res)
       })
       .catch(res =>{
         console.log('添加失败',res)
       })
}

