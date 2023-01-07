// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const  result= await cloud.database().collection('Tags').count();

  const countResult=result.total;

  for(var i=1;i<=countResult;i++){
    var data1=await cloud.database().collection("Tags")
    .where({
    id:i
    })
    .update({
      data: {
    checked:false
    },
  success: function(res) {
  console.log(res.data)
  }
  })
  }
  return data1

}

