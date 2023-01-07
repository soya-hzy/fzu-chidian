const app = getApp()
// 获取应用实例
Page({
  data: {
    allcount: 0,
    num5:0,
    num4:0,
    num3:0,
    num2:0,
    num1:0,
    tagArr: [],
    value: 2,
    showView: true,
    icon_like: 'https://img2022.cnblogs.com/blog/2580100/202211/2580100-20221114162623017-1594140391.png',
    icon_unlike: 'https://img2022.cnblogs.com/blog/2580100/202211/2580100-20221114162632566-1704191628.png',
    like: false, //是否已点赞
    count: 0 //点赞数量
  },
  onLoad: function(options) {
    console.log(options.foodid)
    console.log(options.foodname)
    console.log(options.foodprice)
    console.log(options.store)
    let food = app.globalData.currentFood
    let that = this
    console.log(food)
    let name,price,store
    if(JSON.stringify(food)==="{}" || options.foodid != undefined){
      if(JSON.stringify(food)==="{}") {
      } else {
        console.log('test111', food.Food[0].name)
        name = food.Food[0].name
        price = food.Food[0].price
        store = food.store[0].name
      }
      food = {
        data: {
          id:1,
          name: name,
          price: price,
        },
        store: [{
          name: store,
        }]
      }
    }
    console.log(food)
    if(options.foodid != undefined){
      food.data.id = parseInt(options.foodid)
    }
    if(options.foodprice != undefined) {
      food.data.price = parseInt(options.foodprice)
    }
    if(options.foodname != undefined){
      food.data.name = options.foodname
    }
    if(options.store != undefined){
      food.store[0].name = options.store
    }
    console.log(food)
    
    //整理标签数组
    wx.cloud.callFunction({
      name: "tagcount",
      data: {
        foodid: food.data.id,
      }
    }).then(res => {
      console.log("后端tagcount", res.result);
      let tags = []
      let tagarr = res.result
      tagarr.forEach(item => {
          let obj = {}
          obj['id'] = item.tagid
          obj['name'] = item.tagname
          obj['num'] = item.count
          tags.push(obj)
      })
      this.setData({
        tagArr: tags,
      })
    }).catch(err => {
      console.log("获取tag失败", err)
    })
    // let tagarr = food.data.tedian
    // let tags = []
    // tagarr.forEach(item => {
    //   let obj = {}
    //   obj['id'] = item.id
    //   obj['name'] = item.tagname
    //   obj['num'] = 1

    //   tags.push(obj)
    // })

    this.setData({
      currentFood: food,
    })
    // 获取标签列表
    wx.cloud.database().collection('Tags').get()
      .then(res => {
        console.log('标签列表', res)
        this.setData({
          list: res.data
        })
      })
      //评分
      console.log(food.data.name)
      console.log(food.data.id)
      wx.cloud.callFunction({
        name: 'dishss',
        data: {
          foodname: food.data.name,
          foodid: food.data.id,
        } 
      }).then(res => {
        console.log(res.result)
        let length = res.result.length
        let like = res.result.flike
        let ftag = res.result.ftag
        let value =Math.round(((5*res.result.length5+4*res.result.length4+3*res.result.length3+2*res.result.length2+1*res.result.length1)/res.result.length)*10)/10
        that.setData
      ({
            num1: Math.ceil(res.result.length1*100 / length),
            num2: Math.ceil(res.result.length2*100 / length),
            num3: Math.ceil(res.result.length3*100 / length),
            num4: Math.ceil(res.result.length4*100 / length),
            num5: Math.ceil(res.result.length5*100 / length),
            allcount: length,
            value:value,
            like: like
      })
      }).catch(err => {
        console.log('dishss失败', err)
      })
      },
  onShow() {
    // wx.cloud.database().collection('FoodValue')
    //   .where({
    //     foodid:this.data.currentFood.foodid
    //   }).get()
    //   .then(res=>{
    //     console.log('得分',res)
    //     let arr=res.data
    //     if (arr) {
    //       let valueNum = 0
    //       let count = arr.length
    //       arr.forEach(item => {
    //         valueNum += item.value
    //       })
    //       let value = Math.ceil(valueNum / arr.length)
    //       this.setData({
    //         value: value,
    //         count: count
    //       })
    //     }
    //   })
  },
  
  onChange(event) {
    Toast('当前值：' + event.detail);
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`,
    });
  },
  showButton: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },
  hideButton: function () {
    var that = this;
    that.setData({
      showView: true
    })
  },
  next_calculator: function () {
    wx.navigateTo({
      url: '/subPackages/pages_dish/score/score?foodname='+this.data.currentFood.data.name+'&foodid='+this.data.currentFood.data.id,
    })
  },
  //点赞
  onLike(e) {
    wx.vibrateShort() //手机振动API
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
    let like = this.properties.like
    let count = this.properties.count
    count = like ? count - 1 : count + 1
    if (!like) {
      setTimeout(function () {
        this.animation.scale(1.5).step();
        this.animation.scale(1.0).step();
        this.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);

      wx.cloud.callFunction({
        name: "changelike",
        data: {
          dishid: this.data.currentFood.data.id,
        }
      })
      .then(res => {
        console.log("1111获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
      })
      .catch(err => {
        console.log("获取菜品失败", err)
      })
    } 
    else
     {
      wx.cloud.callFunction({
        name: "changelike",
        data: {
          dishid: this.data.currentFood.data.id,
        }
      })
      .then(res => {
        console.log("2222获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
      })
      .catch(err => {
        console.log("2222获取菜品失败", err)
      })
    }
    this.setData({
      count,
      like: !like
    })
  },
   // 点击添加标签
   addTag(e) {
    console.log(tagArr)
    console.log(this.data.tagArr)
    let tagArr = this.data.tagArr
    let item = e.currentTarget.dataset.item
    let tagName = item.name
    console.log(tagName)
    console.log(tagArr)

    var ret2 = tagArr.find((v) => {
      return v.name == tagName;
    });

    if (ret2 && ret2.name) { //添加过
      tagArr.forEach(item => {
        if (item.name == tagName) {
          item.num += 1
        }
      })
    } else { //没有添加过
      tagArr.push({
        id: 66,
        name: tagName,
        num: 1
      })

    }
    this.setData({
      tagArr
    })

    //添加标签
    let tagid
    this.data.list.forEach(item =>{
      if(tagName == item.name){
        tagid =  item.id
      }
    })
    console.log(tagid)
    wx.cloud.callFunction({
      name: "pinglun",
      data: {
        tagid: tagid,
        foodid: this.data.currentFood.data.id,
      }
    })
  },
})