Page({
  data: {
    active:false,
    currentIndex:'',
    bindTextAreaBlur:'',
    name:'',
    phone:'',
    questionList:['软件使用问题','找不到店铺/商品','新用户问题','优惠红包问题','店家问题','超级会员','算法问题','物流问题','其他问题']
  },
  activeClick(e){
      console.log("成功",e)
      const index = e.currentTarget.dataset.index
      this.setData({
          currentIndex:index
      })
  },
  bindTextAreaBlur(e){
      console.log("问题描述成功",e)
      const value = e.detail.value
      this.setData({
        bindTextAreaBlur:value
      })
  },
  get_name(e){
    console.log("联系人输入成功",e)
    const value = e.detail.value
    this.setData({
      name:value
    })
  },
  get_phone(e){
    console.log("联系方式输入成功",e)
      const value = e.detail.value
      this.setData({
        phone:value
      })
  },
  submit(){
      wx.cloud.callFunction({
        name: 'feedback',
        data: {
          //questionList: this.data.questionList[this.data.currentIndex],
          sort:this.data.questionList[this.data.currentIndex],
          //bindTextAreaBlur: this.data.bindTextAreaBlur,
          content: this.data.bindTextAreaBlur,
          username: this.data.name,
          phone: this.data.phone
        }
      }).then( res => {
        console.log("上传成功",res)
      }).catch(res => {
        console.log("上传失败",res)
      })
      this.setData({
        active:!this.data.active
      })
    //   this.active = false
  },
  backClick(){
    wx.navigateBack({
      delta: 1,
    })
   }
})