// pages/select/select.js
var whatFoods = ['简餐', '粉面', '汉堡', '饺子', '炸鸡', '日料', '早餐', '韩料', '西餐', '甜品', '面包', '饮品'];//食物分类
var diningRoom = ['玫瑰园', '紫荆园'];//餐厅分类
var foodsIndex;
var roomsIndex;
var foods = new Array();
var rooms = new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    foods = [];//关键字
    rooms = [];//餐厅
    let obj = {};
    //赋值
    whatFoods.forEach((item) => {
      obj.word = item;
      obj.show = false;
      foods.push(obj);
      obj = {};
    });
    diningRoom.forEach((item) => {
      obj.room = item;
      obj.show = false;
      rooms.push(obj);
      obj = {};
    });
    this.setData({
      leftselected: true,
      rightselected: true,
      nothingl: true,
      nothingr: true,
    });
    let ran = Math.floor((Math.random()*4));
    this.getList(whatFoods[ran],0)
  },
//获取表单,调用云函数
  getList(key,length) {
     wx.cloud.callFunction({
      name: 'select',
      data: {
        key,
        length
      }
    }).then(res => {
      console.log(res);
      this.setData({
        list:res.result
      })
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 点击小星星收藏
   */
  onTapCollect(event) {
    let curid=event.currentTarget.dataset.restaurantid;
    let idx=event.currentTarget.dataset.index;
    let checked=event.currentTarget.dataset.checked;
    let curlist=this.data.list;
    wx.cloud.callFunction({
      name: 'storelike',
      data: {
        checked,
        businessid:curid
      }
    }).then(res => {
      curlist[idx].checked=!checked;
      this.setData({
        list:curlist
      });
      wx.showToast({
        title: !checked ? '谢谢收藏' : '取消成功',
        duration: 1000,
        icon: 'success',
        mask: true
      })
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 点击左侧按钮
   */
  onTapLeft() {
    this.setData({
      diningRooms: rooms,
      leftselected: false,
      rightselected: true
    })
  },
  /**
   * 点击右侧按钮
   */
  onTapRight() {
    this.setData({
      foods: foods,
      rightselected: false,
      leftselected: true
    })
  },
  /**
   * 隐藏选择餐厅标签页面
   */
  // 取消
  onTapLeftCancel(event) {
    this.setData({
      leftselected: true
    })
  },
  // 提交
  onTapLeftSubmit(){
    this.setData({
      leftselected: true,
      nothingl : true
    });
    this.showItem(rooms,-1);
    this.getList(diningRoom[roomsIndex],0);
  },
  /**
   *  隐藏选择食物标签页面
   */
  // 取消
  onTapRightCancel(event) {
    this.setData({
      rightselected: true
    })
  },
  // 提交
  onTapRightSubmit(){
    this.setData({
      rightselected: true,
      nothingr: true
    });
    this.showItem(foods,-1);
    this.getList(whatFoods[foodsIndex],0);
  },
  /**
   * 取消推荐
   */
  onTapDislike(event) {
    wx.showModal({
      title: '不喜欢',
      content: '以后将不会再向您推荐此菜品',
      success(res) {
        let id=event.currentTarget.dataset.restaurantid;
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  /**
   * 食物标签被点击
   */
  onTapFoods(event) {
    foodsIndex = event.currentTarget.dataset.index;
    let flag = this.showItem(foods,foodsIndex);//是否有标签被点击
    this.setData({
      foods,
      nothingr: flag
    });
  },
  /**
   * 餐厅标签被点击
   */
  onTapRooms(event) {
    roomsIndex = event.currentTarget.dataset.index;
    let flag = this.showItem(rooms,roomsIndex);//是否有标签被点击
    this.setData({
      diningRooms: rooms,
      nothingl: flag
    });
  },
  //标签显示
  showItem(obj,idx){
    let flag = true
    obj.forEach((item, index) => {
      if (index === idx) {
        item.show = !item.show;
      } else {
        item.show = false;
      }
      if (item.show) {
        flag = false;
      }
    });
    return flag
  },
  /**
   * 点击图片跳到store页面
   * @param {storeid} options 
   */
  onTapStore(e){
    wx.navigateTo({
      url: '../store/store?storeid='+e.currentTarget.dataset.storeid,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})