//index.js
//获取应用实例
const app = getApp();
var amapFile = require('../../libs/amap-wx.js');

var markersData = [];

Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        textData: null
    },
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getRegeo({
            iconPath: "../image/location-marker.png",
            iconWidth: 22,
            iconHeight: 22,
            success: function(data){
                console.log(data, 'data');
                var marker = [{
                    id: data[0].id,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    iconPath: data[0].iconPath,
                    width: data[0].width,
                    height: data[0].height
                }];
                that.setData({
                    markers: marker
                });
                that.setData({
                    latitude: data[0].latitude
                });
                that.setData({
                    longitude: data[0].longitude
                });
                that.setData({
                    textData: {
                        name: data[0].name,
                        desc: data[0].desc
                    }
                })
            },
            fail: function(info) {
                wx.showModal({title: info.errMsg})
            }
        })
    },




});
