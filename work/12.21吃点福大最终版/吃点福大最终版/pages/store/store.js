
let dish=[];
let card={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 点击分数到下一页
   */
onTapGrade(e){
  console.log(e.currentTarget.dataset)
  wx.navigateTo({
    url: '/subPackages/pages_dish/dish/dish?foodid='+e.currentTarget.dataset.foodid+'&foodname='+e.currentTarget.dataset.foodname+
    '&foodprice='+e.currentTarget.dataset.foodprice
    +'&store='+e.currentTarget.dataset.store
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name:'storess',
      data:{
        businessid:Number(options.storeid),
        length:0
      }
    }).then(res=>{
      console.log(res);
      let obj={};
      dish=[];
      res.result.forEach((item)=>{
        obj.name=item.FoodName;
        obj.price=item.FoodPrice;
        obj.photo=item.FoodPhoto;
        obj.foodid=item.Foodid;
        obj.foodvalue=item.FoodValue;
        dish.push(obj);
        obj={};
      });
      card={};
      card.drAddress=res.result[0].BusinessAddress;
      card.drName=res.result[0].BusinessName;
      card.score=res.result[0].BusinessValue;
      card.imgcard=res.result[0].BusinessPhoto;
      this.setData({
        datas:card,
        dishes:dish
      });
    }).catch(err=>{
      console.log(err);
    });
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