// pages/index/select_1/select_1.js
const app = getApp(); //引用全局变量
Page({

  /*** 页面的初始数据*/
  data: {
    array: app.globalData.array, //引用全局变量
    taboo: '', //忌口
    arraytags: [],
  },
  /*标签多选*/
  switchtags(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.arraytags[index];
    item.checked = !item.checked;
    this.setData({
      arraytags: this.data.arraytags,
    });
  },
  submit() {
    // console.log(this.data.arraytags)
    // console.log(this.data.title)
    let pages = getCurrentPages(); //当前页面    （pages就是获取的当前页面的JS里面所有pages的信息）
    let prevPage = pages[pages.length - 2]; //上一页面（prevPage 就是获取的上一个页面的JS里面所有pages的信息）
    // prevPage.setData({
    //   arraytags: this.data.arraytags
    // })
    if (!this.data.taboo) {
      const data = this.data.arraytags.filter(item => item.checked)
      console.log('data', data)
      wx.cloud.callFunction({
        name: 'enjoytapchange',
        data: {
          change: true,
          tagid: data.map(item => item.id)
        }
      }).then(res => {
        console.log('enjoytapchange', res)
      }).catch(err => {
        console.log(err)
      })
      wx.redirectTo({
        url: '/pages/mine/mine?like=true',
      })
      // prevPage.setData({
      //   arraytags: data
      // })
    } else {
      const data = this.data.arraytags.filter(item=>item.checked)
      wx.cloud.callFunction({
        name: 'hatetapchange',
        data: {
          change: true,
          tagid: data.map(item => item.id)
        }
      }).then(res => {
        console.log('enjoytapchange', res)
      }).catch(err => {
        console.log(err)
      })
      wx.redirectTo({
        url: '/pages/mine/mine?collect=true'
      })
      // prevPage.setData({
      //   tabooList: this.data.arraytags
      // })
    }
    // wx.navigateBack({
    //   delta: 1,
    // })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('options',options)
    this.setData({
      taboo: !!options.taboo
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
    this.getRagList()
  },
  getRagList() {
    wx.cloud.callFunction({
      name: 'hatetapback',
    }).then(res => {
      console.log('tagback', res.result.data)
      this.setData({
        arraytags: res.result.data
      })
      console.log(this.data.arraytags.data)
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