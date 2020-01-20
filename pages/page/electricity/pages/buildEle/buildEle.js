// pages/page/electricity/pages/buildEle/buildEle.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';
const currentTime = new Date();
currentTime.setTime(currentTime.getTime());
var optionYear = {
  grid: {
    left: '10%',
    right: '5%'
  },
  tooltip: {
    formatter: function (params) {
      return 'X: ' + params.name + '\nY: ' + params.data;
    }
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name: ``,
    nameGap: 35
  },
  series: [{
    id: 'aaa',
    name: '用电量',
    radius: '100%',
    type: 'line',
    color: '#EC5176',
    smooth: true,
    symbolSize: 10,
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(235, 81, 118, 0.3)'
        }, {
          offset: 1,
          color: 'rgba(235, 81, 118,0)'
        }],
        globalCoord: false
      }
    },
    data: []
  }]
};
let aaaaaa = null;
function initChart(canvas, width, height) {
  aaaaaa = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(aaaaaa);
  return aaaaaa;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec3: {
      onInit: initChart
    },
    // 当前楼宇
    buildSysList: [
      {
        'Id': 0,
        'name': '选择楼宇'
      }
    ],
    roomSysList: [
      {
        'floorId': 0,
        'roomId': 0,
        'roomName': '选择房间'
      }
    ],
    curBuildIndex: 0,
    // 当前房间
    curRoomIndex: 0,
    reqBuildEneryData: {
      'building_id': 101
    },
    reqBuildHistoryEneryData: {
      'building_id': 101,
      'queryFlag': 3,
      'year': `${currentTime.getFullYear()}`,
      'month': `${currentTime.getMonth() + 1}`,
      'classId': ''
    },
    reqBuild_RoomList: {
      'buildingId': 101
    },
    reqRoomEneryData: {
      'building_id': 101,
      'floor_id': 1,
      'room_id': 102
    },
    reqRoomHistoryEneryData: {
      'building_id': 101,
      'floor_id': 1,
      'room_id': 102,
      'queryFlag': 3,
      'year': `${currentTime.getFullYear()}`,
      'month': `${currentTime.getMonth() + 1}`,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    const firstPromise = new Promise((rej) => {
      // 查询楼宇列表
      app.globalObj.apiConfig.getEleBuildListData()
        .then(res => {
          if(res.success) {
            _this.setData({
              'buildSysList': res.result
            })
            _this.data.reqBuildEneryData.building_id = res.result[0].Id;
            _this.data.reqBuild_RoomList.buildingId = res.result[0].Id;
            _this.data.reqRoomEneryData.building_id = res.result[0].Id;
            _this.data.reqBuildHistoryEneryData.building_id = res.result[0].Id;
            _this.data.reqRoomHistoryEneryData.building_id = res.result[0].Id;
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
          rej();
        })
        .catch(err => {
          rej();
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    const secondPromise = new Promise((rej) => {
      firstPromise
        .then(res => {
          // 楼宇数据
          app.globalObj.apiConfig.getEleBuildEnergyData(_this.data.reqBuildEneryData)
            .then(res => {
              app.globalObj.apiConfig.goHideToast();
              if(res.success) {
                // _this.setData({
                //   dayDataNum: res.result.realTimeConSum.DayCon,
                //   monthDataNum: res.result.realTimeConSum.MonthCon,
                //   yearDataNum: res.result.realTimeConSum.YearCon
                // })
                // return;
                let num1 = res.result.realTimeConSum.DayCon;
                let num2 = res.result.realTimeConSum.MonthCon;
                let num3 = res.result.realTimeConSum.YearCon;
                let n1 = new app.globalObj.NumberAnimate.default({
                  from: num1,
                  speed: 1000,
                  decimals: 0,
                  refreshTime: 100,
                  onUpdate: () => {
                    _this.setData({
                      dayDataNum: n1.tempValue
                    });
                  },
                  onComplete: () => {
                  }
                });
                let n2 = new app.globalObj.NumberAnimate.default({
                  from: num2,
                  speed: 1000,
                  decimals: 0,
                  refreshTime: 100,
                  onUpdate: () => {
                    _this.setData({
                      monthDataNum: n2.tempValue
                    });
                  },
                  onComplete: () => {
                  }
                });
                let n3 = new app.globalObj.NumberAnimate.default({
                  from: num3,
                  speed: 1000,
                  decimals: 0,
                  refreshTime: 100,
                  onUpdate: () => {
                    _this.setData({
                      yearDataNum: n3.tempValue
                    });
                  },
                  onComplete: () => {
                  }
                });
              }else{
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
              rej()
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
          app.globalObj.apiConfig.getEleBuildingHistoryData(_this.data.reqBuildHistoryEneryData)
            .then(res => {
              app.globalObj.apiConfig.goHideToast();
              if (res.success) {
                let a = []
                  , b = [];
                if (res.result.allCons.length) {
                  res.result.allCons.forEach((item) => {
                    a.push(item.time);
                    item.consume = item.consum.toFixed(2);
                    b.push(item.consume);
                  })
                  optionYear.xAxis.data = a;
                  optionYear.series[0].data = b;
                  setTimeout(() => {
                    aaaaaa.setOption(optionYear);
                  }, 100)
                } else {
                  optionYear.xAxis.data = [];
                  optionYear.series[0].data = [];
                  setTimeout(() => {
                    aaaaaa.setOption(optionYear);
                  }, 100)
                }
              } else {
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    })
    secondPromise
      .then(() => {
        // 楼宇下的房间列表
        app.globalObj.apiConfig.getEleBuild_RoomListData(_this.data.reqBuild_RoomList)
          .then(res => {
            if(res.success) {
              res.result.unshift({
                'floorId': 0,
                'roomId': 0,
                'roomName': '选择房间'
              })
              _this.setData({
                'roomSysList': res.result
              })
            }else{
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 点击切换楼宇
  goChangeBuildSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curBuildIndex) {
      return;
    }
    this.setData({
      'curBuildIndex': cur_index,
      'curRoomIndex': 0
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqBuildEneryData.building_id = _this.data.buildSysList[cur_index].Id;
    _this.data.reqRoomEneryData.building_id = _this.data.buildSysList[cur_index].Id;
    _this.data.reqBuild_RoomList.buildingId = _this.data.buildSysList[cur_index].Id;
    _this.data.reqBuildHistoryEneryData.building_id = _this.data.buildSysList[cur_index].Id;
    _this.data.reqRoomHistoryEneryData.building_id = _this.data.buildSysList[cur_index].Id;
    const secondPromise = new Promise((rej) => {
      // 楼宇数据
      app.globalObj.apiConfig.getEleBuildEnergyData(_this.data.reqBuildEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            // _this.setData({
            //   dayDataNum: res.result.realTimeConSum.DayCon,
            //   monthDataNum: res.result.realTimeConSum.MonthCon,
            //   yearDataNum: res.result.realTimeConSum.YearCon
            // })
            let num1 = res.result.realTimeConSum.DayCon;
            let num2 = res.result.realTimeConSum.MonthCon;
            let num3 = res.result.realTimeConSum.YearCon;
            let n1 = new app.globalObj.NumberAnimate.default({
              from: num1,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  dayDataNum: n1.tempValue
                });
              },
              onComplete: () => {
              }
            });
            let n2 = new app.globalObj.NumberAnimate.default({
              from: num2,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  monthDataNum: n2.tempValue
                });
              },
              onComplete: () => {
              }
            });
            let n3 = new app.globalObj.NumberAnimate.default({
              from: num3,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  yearDataNum: n3.tempValue
                });
              },
              onComplete: () => {
              }
            });
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
          rej()
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleBuildingHistoryData(_this.data.reqBuildHistoryEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.allCons.length) {
              res.result.allCons.forEach((item) => {
                a.push(item.time);
                item.consume = item.consum.toFixed(2);
                b.push(item.consume);
              })
              optionYear.xAxis.data = a;
              optionYear.series[0].data = b;
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            } else {
              optionYear.xAxis.data = [];
              optionYear.series[0].data = [];
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            }
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    secondPromise
      .then(() => {
        // 楼宇下的房间列表
        app.globalObj.apiConfig.getEleBuild_RoomListData(_this.data.reqBuild_RoomList)
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
            if(res.success) {
              res.result.unshift({
                floorId: 0,
                roomId: 0,
                roomName: '选择房间'
              })
              _this.setData({
                roomSysList: res.result
              })
            }else{
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  },

  // 点击切换房间
  goChangeRoomSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curRoomIndex) {
      return;
    }
    this.setData({
      'curRoomIndex': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    // cur_index == 0 代表没有选择房间 所以查询的是楼宇的能耗数据
    if (cur_index == 0) {
      app.globalObj.apiConfig.getEleBuildEnergyData(_this.data.reqBuildEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            // _this.setData({
            //   dayDataNum: res.result.realTimeConSum.DayCon,
            //   monthDataNum: res.result.realTimeConSum.MonthCon,
            //   yearDataNum: res.result.realTimeConSum.YearCon
            // })
            let num1 = res.result.realTimeConSum.DayCon;
            let num2 = res.result.realTimeConSum.MonthCon;
            let num3 = res.result.realTimeConSum.YearCon;
            let n1 = new app.globalObj.NumberAnimate.default({
              from: num1,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  dayDataNum: n1.tempValue
                });
              },
              onComplete: () => {
              }
            });
            let n2 = new app.globalObj.NumberAnimate.default({
              from: num2,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  monthDataNum: n2.tempValue
                });
              },
              onComplete: () => {
              }
            });
            let n3 = new app.globalObj.NumberAnimate.default({
              from: num3,
              speed: 1000,
              decimals: 0,
              refreshTime: 100,
              onUpdate: () => {
                _this.setData({
                  yearDataNum: n3.tempValue
                });
              },
              onComplete: () => {
              }
            });
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleBuildingHistoryData(_this.data.reqBuildHistoryEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.allCons.length) {
              res.result.allCons.forEach((item) => {
                a.push(item.time);
                item.consume = item.consum.toFixed(2);
                b.push(item.consume);
              })
              optionYear.xAxis.data = a;
              optionYear.series[0].data = b;
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            } else {
              optionYear.xAxis.data = [];
              optionYear.series[0].data = [];
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            }
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }else{
      _this.data.reqRoomEneryData.roomId = _this.data.roomSysList[cur_index].roomId;
      _this.data.reqRoomEneryData.room_id = _this.data.roomSysList[cur_index].roomId;
      _this.data.reqRoomEneryData.floor_id = _this.data.roomSysList[cur_index].floorId;
      _this.data.reqRoomHistoryEneryData.room_id = _this.data.roomSysList[cur_index].roomId;
      _this.data.reqRoomHistoryEneryData.floor_id = _this.data.roomSysList[cur_index].floorId;
      app.globalObj.apiConfig.getEleBuild_RoomEnergyData(_this.data.reqRoomEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            _this.setData({
              dayDataNum: res.result.realTimeConSum.cruDayConum,
              monthDataNum: res.result.realTimeConSum.cruMonthConum,
              yearDataNum: res.result.realTimeConSum.cruYearConum
            })
          }else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleRoomHistoryData(_this.data.reqRoomHistoryEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.allCons.length) {
              res.result.allCons.forEach((item) => {
                a.push(item.time);
                item.consume = item.consum.toFixed(2);
                b.push(item.consume);
              })
              optionYear.xAxis.data = a;
              optionYear.series[0].data = b;
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            } else {
              optionYear.xAxis.data = [];
              optionYear.series[0].data = [];
              setTimeout(() => {
                aaaaaa.setOption(optionYear);
              }, 100)
            }
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
  },

  // 遮罩点击事件
  goShadeClickEvent() {
    this.setData({
      currentBuildIndex: 0,
      currentRoomIndex: 0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})