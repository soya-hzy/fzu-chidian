// app.js
const app = getApp();
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'soya-fzu-rice-0grey0qla568ff6f',
    })
  },
  globalData: {
    userInfoDetail: {
      userName: '',
      gender: '',
      age: '',
      birthday: '',
      constellation: '',
      location: '',

    },
    currentFood:{},
    islike1:[],
    iscollect1:[],
  }
})