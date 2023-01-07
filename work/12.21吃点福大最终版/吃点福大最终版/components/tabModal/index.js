// components/tabModal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'你的喜欢'
    },
    tagList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isDelete:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeModal(){
      this.triggerEvent('close',{
        liketabs:false
      })
    },
    addtags(){
        this.triggerEvent('addtags')
    },
    deletetags(){
      this.setData({
        isDelete:!this.data.isDelete
      })
      // this.triggerEvent('deletetags')
    },
    delitem(e){
      const index = e.currentTarget.dataset.index
      if(this.data.isDelete){
        this.triggerEvent('delitem',{
          index:index
        })
      }
    
    }
  }
})
