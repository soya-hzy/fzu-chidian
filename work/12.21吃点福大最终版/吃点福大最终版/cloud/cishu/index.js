//无需传参，调用后如果未达评论次数上限返'true'，更新数据库，达评论次数上限返'false'，不更新数据库

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID

  var result = 'false'
    var comments = await db.collection('**').where({//获取已评论次数
        id: event.userid
      }).get()
       .then(res =>{
         console.log('查询成功',res)
       })
       .catch(res =>{
         console.log('查询失败',res)
       })
    var num = comments.data[0].num
    
    if (num < 5){//如未达上限
        await db.collection('**').where({//更新已评论次数
            id: event.userid
          }).update({
            data: {
              num: '$num' + 1
            }
          })
            .then(res => {
              console.log('更新成功', res)
            })
            .catch(res => {
              console.log('更新失败', res)
            })
    result = 'true'//为true时，还未到达评分次数上限，可以评分
    }

    return result
}

