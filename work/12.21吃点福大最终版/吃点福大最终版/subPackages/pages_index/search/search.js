// pages/index/search/search.js
const app = getApp();   //引用全局变量
var key = ""
Page({

  /*** 页面的初始数据 */
  data: {
    list:[],
    islike:[],         //存放是否喜欢的状态
    id: '', ///存放标签id
    dishid: "",
    //likeSucceed: true,                             //默认=1，熄灭状态
    //喜欢图标
    iconlike: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love.png",   
    //添加喜欢成功图标  
    iconlikeSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love1.png",         
    
      dialogShow: false,
      showOneButtonDialog: false,
      buttons: [{text: '取消'}, {text: '确定'}],
      array:app.globalData.array,            //引用全局变量
  },

    ///跳转菜品详情
    dish: function (e) {
      app.globalData.currentFood = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/subPackages/pages_dish/dish/dish?foodid=' + e.currentTarget.dataset.dishid,
      })
    },

  ///////////点亮红心///////////////
  chooselike: function (e) {
    console.log("123456")
    //console.log(this.data.islike)
    let value = e.currentTarget.dataset.liked;
    console.log(value)
    this.data.dishid = e.currentTarget.dataset.dishid;
    console.log(this.data.dishid)
    let id=this.data.dishid
    console.log("id="+id)
    wx.showToast({
      title: '喜欢成功', //标题
      icon: "success", //图标类型, 默认success
      duration: 1500 //提示框停留时间, 默认1500ms
    })
    app.globalData.islike1[id]=true
    let isliked='islike['+id+']';
    console.log("isliked="+isliked)
    this.setData({
      likeSucceed: !value,
     [isliked]:true
    })
    console.log("change:"+app.globalData.islike1[id])
    console.log(app.globalData.islike1)
    console.log("this.change:"+this.data.islike[id])
    console.log(this.data.islike)
    wx.cloud.callFunction({
        name: "changelike",
        data: {
          dishid: this.data.dishid,
        }
      })
      .then(res => {
        console.log("1111获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
      })
      .catch(err => {
        console.log("获取菜品失败", err)
      })
 
  },
  ///////////熄灭红心///////////////
  choosedislike: function (e) {
    console.log("456789")
    //let value = e.currentTarget.dataset.liked;
    let dishid = e.currentTarget.dataset.dishid;
   // console.log(value)
    console.log(dishid)
    let id=dishid
    console.log("id="+id)
    wx.showToast({
      title: '移除喜欢成功', //标题
      icon: "success", //图标类型, 默认success
      duration: 1500 //提示框停留时间, 默认1500ms
    })
    app.globalData.islike1[id]=false
    let isliked='islike['+id+']';
    console.log("isliked="+isliked)
    this.setData({
      [isliked]:false
    })
    console.log("change:"+app.globalData.islike1[id])
    console.log("this.change:"+this.data.islike[id])

    wx.cloud.callFunction({
        name: "changelike",
        data: {
          dishid: dishid,
        }
      })
      .then(res => {
        console.log("2222获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
      

      })
      .catch(err => {
        console.log("2222获取菜品失败", err)
      })
   
  },


///////////取消推荐弹窗////////////
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  
  /** 生命周期函数--监听页面加载**/
  onLoad(options) {
    key = options.inputValue
    this.getList(options.inputValue)
}, 
  //获取数据
  getList(key) {
    wx.cloud.callFunction({
      name: 'search',
      data: {
        key: key,
        length: this.data.list.length
        
      }
    }
    )
      .then(res => {
        console.log("获取搜索结果成功", res);
        wx.hideLoading()
        //app.globalData.openid=res.result.openid
        //if (res.result.data.length <= 0) {
          if (res.result.length <= 0) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        this.setData({
            list: this.data.list.concat(res.result)
          })

          this.setData({
            islike:app.globalData.islike1,
          })
      })
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        console.log("获取搜索结果失败", err);
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
     this.setData({
      islike:app.globalData.islike1,
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
    wx.showLoading({
      title: '加载中'
    })
    this.getList(key)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})