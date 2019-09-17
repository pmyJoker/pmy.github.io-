//index.js
//获取应用实例
const app = getApp()

Page({
  // 初始数据
  data:{
    headerTxt:"诗文朗读",
    avatarUrl:"", // 头像
    nickName:"" // 名字
  },
  // 监听页面加载 进行中 第一个执行
  onLoad:function(){
    
  },
  // 页面加载完成之后
  onReady: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            }
          })
        } else {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
  }
})