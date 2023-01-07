// pages/index/select_1/select_1.js
const app = getApp();   //引用全局变量
Page({

  /*** 页面的初始数据*/
  data: {
    islike:app.globalData.islike1,
    list:[],
    dishid:[],
     //喜欢图标
    iconlike: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love.png",   
     //添加喜欢成功图标               
    iconlikeSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love1.png",         
    
      dialogShow: false,
      showOneButtonDialog: false,
      buttons: [{text: '取消'}, {text: '确定'}],

      array:app.globalData.array,            //引用全局变量
      randomnum:(Math.random() * 5).toFixed(0)  //随机数 Math.random
  },

    ///跳转菜品详情
    dish: function (e) {
      app.globalData.currentFood = e.currentTarget.dataset.item
      console.log(e.currentTarget.dataset.dishid)
      wx.navigateTo({
        url: '/subPackages/pages_dish/dish/dish?foodid=' + e.currentTarget.dataset.dishid,
      })
    },
    
  /* 改变爱心的状态的云函数changelike */
  getlist_like1(){
    wx.cloud.callFunction({
      name: "changelike",
      data: {
        dishid: this.data.dishid
      }
    })
    .then(res => {
      console.log("1111获取喜欢成功", res);
      //app.globalData.openid=res.result.openid
      
    })
    .catch(err => {
      console.log("获取喜欢失败", err)
    })
  },

  ///////////点亮红心///////////////
  chooselike: function (e) {
    console.log("123456")
    //console.log(this.data.islike)
    let value = e.currentTarget.dataset.liked;
    console.log(value)
    this.data.dishid = e.currentTarget.dataset.dishid;
    console.log("dishid="+this.data.dishid)
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
     [isliked]:true
    })
    console.log("change:"+app.globalData.islike1[id])
    this. getlist_like1();
 
 
  },
  ///////////熄灭红心///////////////
  choosedislike: function (e) {
    console.log("456789")
    let value = e.currentTarget.dataset.liked;
    console.log(value)
    this.data.dishid = e.currentTarget.dataset.dishid;
    console.log(this.data.dishid)
    let id=this.data.dishid
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

    this. getlist_like1();
   
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

/* 调用randomdish的云函数 */
  getlist_randomdish(){
    wx.cloud.callFunction(
      {
        name:"randomdish" , 
      }
    )
    .then(res  =>{
        console.log("获取菜品成功",res);
        //app.globalData.openid=res.result.openid
        this.setData
        ({
          list:res.result,
        })
       /* let id=res.result[0].data.Food[0].id
        console.log("id="+id)
        app.globalData.islike1[id]=res.result[0].liked
        let isliked='islike['+id+']';
        console.log("isliked="+isliked)
        this.setData({
         [isliked]:res.result[0].liked
       })
        console.log(this.data.islike)
        console.log(app.globalData.islike1)*/
    })
    .catch(err =>{
      console.log("获取菜品失败",err)
    })
  },
/////再来一次,重新设置随机下标值/////////
  again:function(){
    this.getlist_randomdish()
  },

  /**生命周期函数--监听页面加载**/
  onLoad(options) {
      //console.log(app.globalData.openid);
      this.getlist_randomdish()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})