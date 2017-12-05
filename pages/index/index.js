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
        textData: {}
    },
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'c2625758e7be0fd3d225a8179849c2f2'});
        myAmapFun.getPoiAround({
            iconPathSelected: '../image/car-marker.png',
            iconPath: '../image/location-marker.png',
            success: function(data) {
                markersData = data.markers;
                console.log(markersData, 'markersData');
                that.setData({
                    markers: markersData,
                });
                that.setData({
                    latitude: markersData[0].latitude,
                    longitude: markersData[0].longitude
                });
                that.showMarkerInfo(markersData, 0);
            },
            fail: function(info) {
                wx.showModal({title: info.errMsg})
            }
        });
        this.mapCtx = wx.createMapContext('map');
    },
    // onShow: function() {
    //     this.loadData();
    // },
    // loadData: function(e) {
    //   var that = this;
    //       wx.getLocation({
    //           type: 'gcj02',
    //           success: function(e) {
    //               var lng = e.longitude;
    //               var lat = e.latitude;
    //               console.log(e, 'e');
    //
    //               that.mapCtx.moveToLocation();
    //           }
    //       });
    // },
    markertap: function(e) {
        console.log(e, 'e');
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(markersData, id);
        that.changeMarkerColor(markersData, id);
    },

    showMarkerInfo: function(data, i) {
        var that = this;
        that.setData({
            textData: {
                name: data[i].name,
                desc: data[i].address
            }
        })
    },

    changeMarkerColor: function(data, i) {
        var that = this;
        var markers = [];

        for(var j = 0; j < data.length; j++){
            if(j == i) {
                data[j].iconPath = "../image/car-marker.png";
            } else {
                data[j].iconPath = "../image/location-marker.png";
            }
            markers.push(data[j]);
        }

        that.setData({
            markers: markers
        });
    }
});
