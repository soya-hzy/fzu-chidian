const app = getApp()
Page({
  data: {
    value: 2,
    flag: true, //false
    foodname: "1",
    foodid: 1
  },
  onLoad: function(options) {
    this.setData({
      currentFood: app.globalData.currentFood,
      foodname: options.foodname,
      foodid: parseInt(options.foodid),
    })
  },
  onChange(e) {
    console.log("onChange", e)
    this.setData({
      value: e.detail
    })
  },
  submit: function (e) {
    // 评分次数验证
    wx.cloud.callFunction({
      name: 'cishu',
      data: {
        
      }
    }).then(res => {
      console.log('次数验证成功', res)
      this.setData({
        flag: res,
      })
    }).catch(res => {
      console.log('次数验证失败', res)
    })

    console.log(this.data.flag)
    if(this.data.flag){
        console.log(this.data.value, this.data.foodid)
        wx.cloud.callFunction({
          name: 'fenshu',
          data: {
            foodid: this.data.foodid,
            id: this.data.value
          }
        }).then(res => {
          console.log('成功', res)
          // 提示框
          wx.showModal({
            title: '提示',
            content: '已完成评分！',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              } else {
                wx.navigateBack()
              }
            }
          })
        }).catch(res => {
          console.log('失败', res)
          wx.showToast({
            title: '评分失败',
          })
        })

    }
  },
})