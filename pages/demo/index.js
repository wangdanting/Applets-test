const app = getApp();
var amapFile = require('../../libs/amap-wx.js');

Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        polyline: []
    },

    onLoad: function () {
        let that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getRegeo({
            iconPath: "../image/marker_checked.png",
            iconWidth: 22,
            iconHeight: 32,
            success: function(data){
                console.log(data, 'data');
                var marker = [{
                    id: data[0].id,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    iconPath: data[0].iconPath,
                    width: data[0].width,
                    height: data[0].height,
                    callout: {
                        content: '我的位置',
                        display: 'ALWAYS'
                    }
                }];
                that.setData({
                    latitude: data[0].latitude
                });
                that.setData({
                    longitude: data[0].longitude
                });
                that.setData({
                    markers: marker
                }, function() {
                    marker.push({
                        iconPath: "../image/marker.png",
                        id: 1,
                        longitude: 106.530622,
                        latitude: 29.565226,
                        width: 22,
                        height: 32,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    }, {
                        iconPath: "../image/marker.png",
                        id: 2,
                        longitude: 106.531018,
                        latitude: 29.563153,
                        width: 25,
                        height: 25,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    }, {
                        iconPath: "../image/marker.png",
                        id: 3,
                        longitude: 106.525502,
                        latitude: 29.562823,
                        width: 25,
                        height: 25,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    }, {
                        iconPath: "../image/marker.png",
                        id: 4,
                        longitude: 106.518891,
                        latitude: 29.56342,
                        width: 25,
                        height: 25,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    }, {
                        iconPath: "../image/marker.png",
                        id: 5,
                        longitude: 106.517669,
                        latitude: 29.555472,
                        width: 25,
                        height: 25
                    }, {
                        iconPath: "../image/marker.png",
                        id: 6,
                        longitude: 106.531754,
                        latitude: 29.553461,
                        width: 25,
                        height: 25,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    }, {
                        iconPath: "../image/marker.png",
                        id: 7,
                        longitude: 106.531754,
                        latitude: 29.553461,
                        width: 25,
                        height: 25,
                        callout: {
                            content: '李子坝梁山鸡',
                            display: 'ALWAYS'
                        }
                    });
                    that.setData({
                        markers: marker
                    })
                });

            },
            fail: function(info) {
                wx.showModal({title: info.errMsg})
            }
        })
    },

    markerTap: function(e) {
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(id);
    },

    showMarkerInfo: function(id) {
        var that = this;
        var data = that.data.markers;
        var markers = [];
        var origin = data[0].longitude + ',' + data[0].latitude;
        var destination = '';

        for(var j = 0; j < data.length; j++){
            if(data[j].id == id) {
                data[j].iconPath = "../image/mapicon-navi-e.png";
                destination =  data[j].longitude + ',' + data[j].latitude;
            } else {
                data[j].iconPath = "../image/marker.png";
            }
            markers.push(data[j]);
        }

        that.setData({
            markers: markers
        }, function() {
            wx.showModal({
                title: 'xxx',
                content: 'xxxxxxxxx',
                showCancel: true,
                cancelText: '取消',
                confirmText: '导航',
                success: function() {
                    that.getPolyline(origin, destination);
                },
                fail: function() {

                }
            })
        });
    },

    getPolyline: function(ori, des) {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getDrivingRoute({
            origin: ori,
            destination: des,
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
            }
        })
    }

});
