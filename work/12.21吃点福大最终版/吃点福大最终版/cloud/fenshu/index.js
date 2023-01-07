//需要event.id,foodid（UserFood库中的）

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID

  switch (event.id)  //根据用户选择的分数即event.id，更新对应菜名的数据中的评分
  {
    case "1":
      await db.collection('ValueFood').where({
        foodid: event.foodid
      }).update({
        data: {
          value1: '$value1' + 1
        }
      })
        .then(res => {
          console.log('添加成功', res)
        })
        .catch(res => {
          console.log('添加失败', res)
        })

    case "2":
      await db.collection('ValueFood').where({
        foodid: event.foodid
      }).update({
        data: {
          value2: '$value2' + 1
        }
      })
        .then(res => {
          console.log('添加成功', res)
        })
        .catch(res => {
          console.log('添加失败', res)
        })

    case "3":
      await db.collection('ValueFood').where({
        foodid: event.foodid
      }).update({
        data: {
          value3: '$value3' + 1
        }
      })
        .then(res => {
          console.log('添加成功', res)
        })
        .catch(res => {
          console.log('添加失败', res)
        })

    case "4":
      await db.collection('ValueFood').where({
        foodid: event.foodid
      }).update({
        data: {
          value4: '$value4' + 1
        }
      })
        .then(res => {
          console.log('添加成功', res)
        })
        .catch(res => {
          console.log('添加失败', res)
        })

    case "5":
      await db.collection('ValueFood').where({
        foodid: event.foodid
      })
        .update({
          data: {
            value5: '$value5' + 1
          }
        })
        .then(res => {
          console.log('添加成功', res)
        })
        .catch(res => {
          console.log('添加失败', res)
        })

  }

  var list = db.collection('ValueFood').where({
    foodid: event.foodid
  }).get()
  var value = (list.data[0].value1 + list.data[0].value2 * 2 + list.data[0].value3 * 3 + list.data[0].value4 * 4 + list.data[0].value5 * 5) / (list.data[0].value1 + list.data[0].value2 + list.data[0].value3 + list.data[0].value4 + list.data[0].value5);
  return await db.collection('Foods').where({
    foodid: event.foodid
  })
    .update({
      data: {
        value: value
      }
    })

}

