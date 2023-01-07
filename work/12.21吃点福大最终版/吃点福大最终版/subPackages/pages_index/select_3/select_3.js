// pages/index/select_1/select_1.js
const app = getApp();   //引用全局变量
Page({

  /*** 页面的初始数据*/
  data: {
      tag_id:'',
      tag_ids:[],
      tag_len:0,
      tag_ids1:[],
      store_id:'',
      list:[],
      taglist:[],
      array:app.globalData.array,            //引用全局变量
      arraytags:[
        {id:1,checked: false, tag:'早餐'},
        {id:2,checked: false,tag:'午餐'},
        {id:3,checked: false,tag:'晚餐'},
        {id:4,checked: false,tag:'夜宵'},
        {id:5,checked: false,tag:'粥饼'},
        {id:6,checked: false,tag:'饭团'},
        {id:7,checked: false,tag:'包子'},
        {id:8,checked: false,tag:'面包'},
        {id:9,checked: false,tag:'快餐'},
        {id:10,checked: false,tag:'面条'},
        {id:11,checked: false,tag:'米粉'},
        {id:12,checked: false,tag:'香锅'},
        {id:13,checked: false,tag:'饺子'},
        {id:14,checked: false,tag:'汉堡'},
        {id:15,checked: false,tag:'炸鸡'},
        {id:16,checked: false,tag:'沙拉'},
        {id:17,checked: false,tag:'奶茶'},
        {id:18,checked: false,tag:'凉拌'},
        {id:19,checked: false,tag:'煎炸'},
        {id:20,checked: false,tag:'爆炒'},
        {id:21,checked: false,tag:'烧烤'},
        {id:22,checked: false,tag:'清蒸'},
        {id:23,checked: false,tag:'水煮'},
        {id:24,checked: false,tag:'麻辣'},
        {id:25,checked: false,tag:'酸辣'},
        {id:26,checked: false,tag:'甜辣'},
        {id:27,checked: false,tag:'微辣'},
        {id:28,checked: false,tag:'酸甜'},
        {id:29,checked: false,tag:'微甜'},
        {id:30,checked: false,tag:'微酸'},
        {id:31,checked: false,tag:'重口'},
        {id:32,checked: false,tag:'清淡'},
        {id:33,checked: false,tag:'适中'},
        {id:34,checked: false,tag:'有葱'},
        {id:35,checked: false,tag:'无葱'},
        {id:36,checked: false,tag:'有蒜'},
        {id:37,checked: false,tag:'无蒜'},
        {id:38,checked: false,tag:'有姜'},
        {id:39,checked: false,tag:'无姜'}
      ],

    
  },
  /*标签多选*/ 
  switchtags:function(e){
      let that=this
      console.log(e.currentTarget.dataset.id)
      that.setData({
        tag_id:e.currentTarget.dataset.id,
      })
      var index = e.currentTarget.dataset.index-1 ;
      var item = this.data.list[index];
      item.checked = !item.checked;
      if(item.checked==true){
        this.setData({
          tag_len:this.data.tag_len+1
        })
        console.log("len="+this.data.tag_len)
        //this.data.tag_ids.push(this.data.tag_id)
      }
      else{
       // this.data.tag_ids.pop(this.data.tag_id)

       this.setData({
        tag_len:this.data.tag_len-1
      })
          console.log("len="+this.data.tag_len)
        }
        
      
      
      console.log(this.data.tag_ids)
      
      that.setData({
        list: that.data.list,
        taglist:this.data.tag_ids
      });
  },
  
  
  


/////跳转结果页面/////////
  select_3result:function(e){
    this.setData({
      tag_ids:[],
    })
    //console.log("111"+this.data.tag_ids)
    console.log(this.data.tag_ids.length)
    console.log(this.data.list.length)
    for(let i=0;i<this.data.list.length;i++){
      //console.log("i="+i)
     // console.log(this.data.list[i].checked)
       if(this.data.list[i].checked==true){
         this.data.tag_ids.push(i+1)
       }
    }
    console.log(this.data.tag_ids)
    wx.navigateTo({
      url: '/subPackages/pages_index/select_3 result/select_3 result?tags='+this.data.tag_ids.toString()+ '&count='+this.data.tag_len,
    })
    
    this.setData({
      tag_id:[],
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      wx.cloud.callFunction(
        {
          name:"tagback" , 
        },
         
      )
      .then(res =>{
          console.log("获取标签成功",res);
          //app.globalData.openid=res.result.openid
          this.setData
          ({
            list:res.result.data,
          })
          //console.log(this.data.list[0].point[0].id)
      })
      .catch(err =>{
        console.log("获取标签失败",err);
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