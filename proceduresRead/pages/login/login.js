//index.js
//获取应用实例
const app = getApp()

Page({
  // 初始数据
  data:{
    headerTxt:"诗文朗读",
    isHide:false
  },
  // 监听页面加载 进行中 第一个执行
  onLoad:function(){
    
  },
  // 页面加载完成之后
  onReady: function () {
    
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.rawData);
    if (e.detail.rawData) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
})