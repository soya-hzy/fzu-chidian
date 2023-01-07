// pages/index/selectstore/selectstore.js
const app = getApp(); //引用全局变量
var key = ['简餐', '粉面', '汉堡', '饺子', '炸鸡', '日料', '早餐', '韩料', '西餐', '甜品', '面包', '饮品', '紫荆园', '玫瑰园']
var id = 0;
Page({

  /**页面的初始数据**/
  data: {
    list: [],
    iscollect:[],
    dishid:'',
    checked:'',
    starSucceed: true,                             //默认=1，熄灭状态
    //收藏图标
    iconstar: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/star.png",
    //添加收藏成功图标  
    iconstarSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/star1.png",

    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },

  ///跳转店铺详情
  store: function (e) {
    console.log("storeid"+e.currentTarget.dataset.storeid)
    wx.navigateTo({
      url: '/pages/store/store?storeid='+e.currentTarget.dataset.storeid,
    })
  },
  
  get_collect(){
    wx.cloud.callFunction({
      name: "storerike",
      data: {
        //checked:this.data.checked,
        //businessid:this.data.dishid,
        dishid: this.data.dishid,
      }
    })
    .then(res => {
      console.log("1111获取喜欢成功", res);
      console.log("     "+this.data.checked)
      //app.globalData.openid=res.result.openid
    })
    .catch(err => {
      console.log("获取菜品失败", err)
    })
  },

  ///////////点亮红心///////////////
  chooselike: function (e) {
    console.log("123456")
    //console.log(this.data.islike)
    let value = e.currentTarget.dataset.liked;
    console.log(value)
    this.setData({
      checked:!value
    })
    this.data.dishid = e.currentTarget.dataset.dishid;
    console.log("storeid="+this.data.dishid)
    let id=this.data.dishid
    console.log("id="+id)
    wx.showToast({
      title: '喜欢成功', //标题
      icon: "success", //图标类型, 默认success
      duration: 1500 //提示框停留时间, 默认1500ms
    })
    app.globalData.iscollect1[id]=true
    let iscollectd='iscollect['+id+']';
    console.log("iscollectd="+iscollectd)
    this.setData({
     [iscollectd]:true
    })
    console.log("change:"+app.globalData.iscollect1[id])
    console.log(app.globalData.iscollect1)
    console.log("this.change:"+this.data.iscollect[id])
    console.log(this.data.iscollect)
    this.get_collect()
 
  },
  ///////////熄灭红心///////////////
  choosedislike: function (e) {
    console.log("456789")
    let value = e.currentTarget.dataset.liked;
    this.setData({
      checked:!value
    })
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
    app.globalData.iscollect1[id]=false
    let iscollectd='iscollect['+id+']';
    console.log("iscollectd="+iscollectd)
    this.setData({
      [iscollectd]:false
    })
    console.log("change:"+app.globalData.iscollect1[id])
    console.log("this.change:"+this.data.iscollect[id])

    this.get_collect()
   
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    id = options.id - 1
    console.log(key[id])
    this.getList(key[id])
  },
  getList(key) {
    wx.cloud.callFunction({
      name: 'tagBusiness',
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
        if (res.result.length <= 0) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        this.setData
          ({
            list: this.data.list.concat(res.result)
          })
          var i=this.data.length;
          for(i=0;;i++){
           // console.log("i="+i)
            let id=res.result[i].id
            //console.log("id="+id)
            app.globalData.iscollect1[id]=res.result[i].checked
            let iscollectd='iscollect['+id+']';
           // console.log("iscollectd="+iscollectd)
            this.setData({
             [iscollectd]:res.result[i].checked
           })
           // console.log(this.data.iscollect)
            //console.log(app.globalData.iscollect1)
          }   
      })
      .catch(err => {
        wx.hideLoading()
        /*wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })*/
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
    this.getList(key[id])
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})