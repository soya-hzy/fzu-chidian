// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  if(event.Cid=="0")
  {
    openid=9;
    var len = event.arraytags.length
    for(var i=0; i<len; ++i)
    {
      cloud.database().collection("LikeTag")
      .add({
      data: {
        tagid: event.arraytags[i].id,
        userid: openid
      }
      }).then( res => {
        console.log("上传成功",res)
        return res;
      }).catch(res => {
        console.log("上传失败",res)
        return res;
      })
    }
  }
  else {
    openid=4;
    var len = event.arraytags.length
    for(var i=0; i<len; ++i)
    {
      cloud.database().collection("DislikeTag")
      .add({
      data: {
        tagid: event.arraytags[i].id,
        userid: openid
      }
      }).then( res => {
        console.log("上传成功",res)
        return res;
      }).catch(res => {
        console.log("上传失败",res)
        return res;
      })
    }
  }
}