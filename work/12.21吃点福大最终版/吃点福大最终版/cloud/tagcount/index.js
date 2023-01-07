// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var tagscount=await db.collection('Tags').count();
  var counts=tagscount.total
  var tags=await db.collection('Tags')
    .get();

  var list=[];
  for(var i=1;i<=counts;i++)
  {     const per={};
        per.tagid=i;
        var x=tags.data[i-1].name
        per.tagname=x;
        var t1=await db.collection('TagFood')
        .where({tagid:i,
        foodid:event.foodid})
        .count();
        per.count=t1.total;
        if(per.count)
        {
          list.push(per)
        }
        
  }
  return list
  /* var tags= await db.collection('TagFood').add({
    data:{
       foodid: event.foodid,
    }
    })
    .count()*/
    
   
}