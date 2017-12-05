//index.js
//获取应用实例
const app = getApp();
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
      markers: [{
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.530622,
          latitude: 29.565226,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.531018,
          latitude: 29.563153,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.525502,
          latitude: 29.562823,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.518891,
          latitude: 29.56342,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.517669,
          latitude: 29.555472,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.531754,
          latitude: 29.553461,
          width: 25,
          height: 25
      }, {
          iconPath: "../image/location-marker.png",
          id: 0,
          longitude: 106.531754,
          latitude: 29.553461,
          width: 25,
          height: 25
      }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
      this.mapCtx = wx.createMapContext('map');

  },
    onShow: function() {
        this.loadData();
    },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    loadData: function(e) {
      var that = this;
          wx.getLocation({
              type: 'gcj02',
              success: function(e) {
                  var lng = e.longitude;
                  var lat = e.latitude;
                  console.log(e, 'e');

                  that.mapCtx.moveToLocation();
              }
          });

    },
});
