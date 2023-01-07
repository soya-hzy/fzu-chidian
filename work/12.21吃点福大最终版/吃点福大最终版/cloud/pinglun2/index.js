//需要event.length（标签数）,tagid[]（标签数组）,foodid[]（食物id数组）

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //一次添加一条，多次添加（可能存在问题，后续修改）

  for(var i=0;i<event.length/*这里是有关tag数组的长度*/;i++){
    return await db.collection('TagFood').add({
      data:{
         tagid: tagid[i],
         foodid: foodid[i]
      }
       })
       .then(res =>{
         console.log('添加成功',res)
       })
       .catch(res =>{
         console.log('添加失败',res)
       })
  }
  //需要return1次还是i次呢，可能需要修改
}

