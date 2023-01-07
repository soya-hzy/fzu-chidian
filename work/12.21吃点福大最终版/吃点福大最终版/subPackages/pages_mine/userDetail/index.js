// pages/mine/userDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoDetail:{}, 
    list:[]
  },
  bindPickerChange(e){
    console.log(e)
  },
  formSubmit(e) {
    app.globalData.userInfoDetail =
    {
    ...e.detail.value,
      ...app.globalData.userInfoDetail
    }
    console.log('e.detail.value',e.detail.value)
    console.log('app.globalData.userInfoDetail',app.globalData.userInfoDetail)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'mychange',
      data:{
        // id:openid,
        //photo:e.detail.value.photo,
        profile: e.detail.value.profile,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        birthday:e.detail.value.birthday,
        sex:e.detail.value.sex,
       
      }
    }).then(res => {
      console.log('mychange',res)
    }).catch(err => {
      console.log(err)
    })



    wx.showToast({
      title:'保存成功',
      duration:1000,
      icon:'success',
      mask:true
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'my',
    }).then(res => {
      console.log('my',res)
      this.setData({
          list:res.result
      })
      
      
    }).catch(err => {
      console.log(err)
    })
    
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
    console.log('userInfoDetail',app.globalData.userInfoDetail)
    this.setData({
      userInfoDetail:app.globalData.userInfoDetail
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