
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
//我的界面，喜欢的标签
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  //直接通过wxcontext获取该用户的openid
  var openid = wxContext.OPENID
  
  var like= await cloud.database().collection("LikeTag")
  .where({ userid:openid }).count()
  var likeres=like.total

  var likes=[]
  for(var i=0;i<likeres;i+=100)
  {     var data2= await cloud.database().collection("LikeTag")
        .where({ userid:openid })
        .skip(i)
        .get()
        likes=likes.concat(data2.data)
  }

  var lists=[]
  for(var i=0;i<likeres;i++)
  {       var data1 = await cloud.database().collection("Tags")
          .where({ id:likes[i].tagid})
          .field({
            _id: false,
            name: true,
            id:true
          })
          .get()
         // return data1.data[0]
          lists.push(data1.data[0])
  }
  return lists;
}