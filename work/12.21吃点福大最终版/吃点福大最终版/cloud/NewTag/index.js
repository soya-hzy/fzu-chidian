// 云函数入口文件
//传入参数foodid，tagid，tagname
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //一次添加一条，多次添加（可能存在问题，后续修改）
  var openid = wxContext.OPENID

    var tagnum = await db.collection('TagFood').where({
      tagid: event.tagid,
      foodid: foodid
    }).count()//获取该tag总评论次数

    if (tagnum >= 10){
      await db.collection('FoodTag').add({//大于10则添加进展示tag中
        data:{
           foodid: foodid,
           tagid: tagid,
           tagname: tagname
        }
         })
         .then(res =>{
           console.log('添加成功',res)
         })
         .catch(res =>{
           console.log('添加失败',res)
         })
      return true
    }
    else{
      return false
    }
}

