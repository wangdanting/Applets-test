//index.js
//获取应用实例
const app = getApp();
var amapFile = require('../../libs/amap-wx.js');

var markersData = [];

Page({
    data: {
        markers: [{
            iconPath: '../image/location-marker.png',
            id: 0,
            latitude: 39.989643,
            longitude: 116.481028,
            width: 23,
            height: 23,
        }, {
            iconPath: '../image/car-marker.png',
            id: 0,
            latitude: 39.90816,
            longitude: 116.434446,
            width: 23,
            height: 23,
        }],
        latitude: 39.949643,
        longitude: 116.451028,
        distance: '',
        cost: '',
        polyline: []
    },
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getDrivingRoute({
            origin: '116.481028, 39.989643',
            destination: '116.434446, 39.90816',
            success: function(data) {
                var points = [];
                if(data.paths && data.paths[0] && data.paths[0].steps){
                    var steps = data.paths[0].steps;
                    for(var i = 0; i < steps.length; i++) {
                        var poLen = steps[i].polyline.split(';');
                        for(var j = 0; j < poLen.length; j++) {
                            points.push({
                                longitude: parseFloat(poLen[j].split(',')[0]),
                                latitude: parseFloat(poLen[j].split(',')[1])
                            })
                        }
                    }
                }
                that.setData({
                    polyline: [{
                        points: points,
                        color: '#0091ff',
                        width: 6
                    }]
                });
                if(data.paths[0] && data.paths[0].distance) {
                    that.setData({
                        distance:data.paths[0].distance + '米'
                    })
                }
                if(data.taxi_cost) {
                    that.setData({
                        cost: '打车约' + parseInt(data.taxi_cost) + '米'
                    });
                }
            }
        })
    },
    goDetail: function() {
        wx.navigateTo({
            url: '../navigation_car_detail/index'
        })
    },
    goToCar: function() {
        wx.redirectTo({
            url: '../navigation_car/navigation'
        })
    },
});
