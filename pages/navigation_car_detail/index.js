//index.js
//获取应用实例
const app = getApp();
var amapFile = require('../../libs/amap-wx.js');

Page({
    data: {
       steps: null
    },
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getDrivingRoute({
            origin: '116.481028,39.989643',
            destination: '116.434446,39.90816',
            success: function(data){
                if(data.paths && data.paths[0] && data.paths[0].steps){
                    that.setData({
                        steps: data.paths[0].steps
                    });
                }
            },
            fail: function(info) {
                wx.showModal({title: info.errMsg})
            }
        })
    },




});
