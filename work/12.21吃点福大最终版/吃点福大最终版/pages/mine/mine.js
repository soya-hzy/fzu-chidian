const app = getApp()
Page({
  data: {
    arraytags: [],
    tabooList: [],
    liketabs: false,
    taboo: false,
    hasUserInfo: false,
    userInfo: {
      avatarUrl: '',
      nikeName: ''
    }
  },
  onLoad(options){
    // console.log('options',options)
    if(options.like == 'true'){
      this.openlike()
    }else if(options.collect == 'true'){
      this.opentaboo()
    }
  },
  userDetail() {
    wx.navigateTo({
      url: '/subPackages/pages_mine/userDetail/index',
    })
  },
  login() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // console.log('res.userInfo.nickName', res.userInfo.nickName)
        app.globalData.userInfoDetail.userName = res.userInfo.nickName
      }
    })
  },
  addtags() {
    wx.redirectTo({
      url: '/subPackages/pages_mine/addtag/index',
    })
  },
  addtags2() {
    wx.redirectTo({
      url: '/subPackages/pages_mine/addtag/index?taboo=1',
    })
  },
  delitem(e) {
    const index = e.detail.index
    const id = this.data.arraytags[index].id
    console.log(id)
    // const data = this.data.arraytags
    wx.cloud.callFunction({
      name: 'enjoytapchange',
      data: {
        change:false,
        tagid:[id]
      }
    }).then(res => {
      this.getEnjoytap()
    }).catch(err => {
      console.log(err)
    })
    // data.splice(index, 1)
    // this.setData({
    //   arraytags: data
    // })
  },

  // 忌口
  delitem2(e) {
    const index = e.detail.index
    const id = this.data.tabooList[index].id
    wx.cloud.callFunction({
      name: 'hatetapchange',
      data: {
        change: false,
        tagid: [id]
      }
    }).then(res => {
      this.getHatetapList()
    }).catch(err => {
      console.log(err)
    })
    // data.splice(index, 1)
    // this.setData({
    //   tabooList: data
    // })
  },
  deletetags(){
    const data = this.data.tabooList
    data.splice(data.length - 1, 1)
    this.setData({
      tabooList: data
    })
  },
  deletetags2() {
    const data = this.data.tabooList
    data.splice(data.length - 1, 1)
    this.setData({
      tabooList: data
    })
  },
  openlike() {
    wx.cloud.callFunction({
      name: 'enjoytap',
    }).then(res => {
      // console.log('enjoytap', res)
      this.setData({
        arraytags: res.result,
        liketabs: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  opentaboo() {
    wx.cloud.callFunction({
      name: 'hatetap',
    }).then(res => {
      // console.log('hatetap', res)
      this.setData({
        tabooList: res.result,
        taboo: true
      })
    }).catch(err => {
      console.log(err)
    })

  },
  close(e) {
    this.setData({
      liketabs: false,
      taboo: false
    })
  },
  handleLike() {
    wx.navigateTo({
      url: '/subPackages/pages_mine/like/like',
    })
  },
  handleCollect() {
    wx.navigateTo({
      url: '/subPackages/pages_mine/collect/collect',
    })
  },
  handleFeedback() {
    wx.navigateTo({
      url: '/subPackages/pages_mine/feedback/feedback',
    })
  },
  getHatetapList(){
   // 忌口的标签
   wx.cloud.callFunction({
    name: 'hatetap',
  }).then(res => {
    // console.log('忌口的标签。hatetap', res)
    this.setData({
      tabooList: res.result,
      // taboo: true
    })
  }).catch(err => {
    console.log(err)
  })
  },
  //喜欢的标签
  getEnjoytap(){
    wx.cloud.callFunction({
      name: 'enjoytap',
    }).then(res => {
      // console.log('喜欢的标签，enjoytap', res)
      this.setData({
        arraytags: res.result,
        // liketabs: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  onShow() {
    // 获取个人信息
    // my
    // mychange
    wx.cloud.callFunction({
      name: 'my',
    }).then(res => {
      console.log('my',res)
    }).catch(err => {
      console.log(err)
    })
    console.log('app.globalData.userInfoDetail',app.globalData.userInfoDetail)
    const newUserInfo = {
      ...app.globalData.userInfoDetail,
    }
    console.log('newUserInfo',newUserInfo)
    // Object.assign(, app.globalData.userInfoDetail)
    // if (newUserInfo.userName) newUserInfo.nickName = newUserInfo.userName
    // console.log('newUserInfo', newUserInfo)
    // console.log('userInfoDetail',userInfo.)
    this.setData({
      userInfo: newUserInfo,
      hasUserInfo: true
    })
    // console.log('userInfo', this.data.userInfo)
    // 标签数据
    this.getEnjoytap()
    this.getHatetapList()
  },
})