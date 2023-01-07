// pages/mine/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: []
  },

  handleClick(e) {
    const index = e.currentTarget.dataset.index
    const newList = this.data.productList
    let that = this
    if (newList[index].collect) {
      wx.showModal({
        title: '提示',
        content: '确定取消收藏吗',
        success(res) {
          if (res.confirm) {
            newList[index].collect = !newList[index].collect
            that.setData({
              productList: newList
            })
            wx.showToast({
              title: newList[index].collect ? '已收藏' : '已取消收藏',
              duration: 1000,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      newList[index].collect = !newList[index].collect
      that.setData({
        productList: newList
      })
    }
  },
  deleteClick(e) {
    const index = e.currentTarget.dataset.index
    console.log('index', index)
    const newList = this.data.productList
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        console.log('res')
        if (res.confirm) {
          // const businessid = that.data.productList[index].data.businessid
          const businessid = that.data.productList[index].data.id
          wx.cloud.callFunction({
            name: 'enjoystorechange',
            data: {
              businessid
            }
          }).then(res => {
            wx.showToast({
              title: '已删除',
              duration: 1000,
            })
            that.getDataList()
          }).catch(err => {
            console.log(err)
            return
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
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
    this.getDataList()
  },
  getDataList() {
    wx.cloud.callFunction({
      name: 'enjoystore',
    }).then(res => {
      console.log('enjoystore', res)
      this.setData({
        productList: res.result.list
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