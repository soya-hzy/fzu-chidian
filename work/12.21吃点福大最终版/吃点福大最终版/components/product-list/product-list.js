// components/product-list/product-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
          type:Object,
          value:{}
      },
      productType:{
          type:String,
          value:'like'
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      // this.triggerEvent('handleClick')
    },
    deleteClick(){
        this.triggerEvent('deleteClick')
    }
  }
})
