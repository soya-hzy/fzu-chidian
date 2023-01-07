// pages/mine/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    dishid:''
  },
  // 取消喜欢
  // handleClick(e){
  //   const index = e.currentTarget.dataset.index
  //   const newList = this.data.productList
  //   let that = this
  //   if(newList[index].collect){
  //       wx.showModal({
  //           title: '提示',
  //           content:'确定取消喜欢吗',
  //           success (res) {
  //             if (res.confirm) {
  //               newList[index].collect = !newList[index].collect
  //               that.setData({
  //                   productList:newList
  //               })
  //               wx.showToast({
  //                   title: newList[index].collect ? '已添加喜欢' : '取消喜欢',
  //                   duration: 1000,
  //                 })
  //             } else if (res.cancel) {
  //               console.log('用户点击取消')
  //             }
  //           }
  //         })
  //   }else{
  //       newList[index].collect = !newList[index].collect
  //       that.setData({
  //           productList:newList
  //       })
  //   }
  // },
  // 移除喜欢
  deleteClick(e) {
    const index = e.currentTarget.dataset.index
    const newList = this.data.productList
    const dishid = this.data.productList[index].data.Food[0].id ?? ''
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'enjoydishchange',
            // 传递给云函数的event参数
            data: {
              dishid:dishid
            }
          }).then(res => {
            newList.splice(index, 1)
            that.setData({
              productList: newList
            })
            wx.showToast({
              title: '已删除',
              duration: 1000,
            })
          }).catch(err => {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 返回上一页
  backClick() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log
    wx.cloud.callFunction({
      name: 'enjoydish',
    }).then(res => {
      console.log(res.result)
      this.setData({
        productList: res.result
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})