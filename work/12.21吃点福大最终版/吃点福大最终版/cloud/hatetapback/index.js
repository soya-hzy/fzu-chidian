// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const _ = cloud.database().command
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
  var like=[]
  for(var i=0;i<likeres;i++)
  {
      like.push(likes[i].tagid)
  }

  var dlike= await cloud.database().collection("DislikeTag")
  .where({ userid:openid }).count()
  var dlikeres=dlike.total
  var dlikes=[]
  for(var i=0;i<dlikeres;i+=100)
  {     var data2= await cloud.database().collection("DislikeTag")
        .where({ userid:openid })
        .skip(i)
        .get()
        dlikes=dlikes.concat(data2.data)
  }
  
  for(var i=0;i<dlikeres;i++)
  {
      like.push(dlikes[i].tagid)
  }

  var tag= await cloud.database().collection("Tags").count()
  var len=tag.total
  var lists=[]
/*
  for(var i=0;i<tag;i++)
  {       
          lists.push(data1.data[0])
  }
  return lists;*/

  var data1 = await cloud.database().collection("Tags")
          .where({ id:_.not(_.in(like))})
          .get()
  return data1
}