// pages/page/electricity/pages/subsysEle/subsysEle.js
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
    // currentBuildIndex: 0,
    // currentRoomIndex: 0,
    ec3: {
      onInit: initChart
    },
    // 子系统
    subSystemList: [
      {
        'Id': 0,
        'name': '选择子系统'
      }
    ],
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
    // 当前子系统
    curSubIndex: 0,
    // 当前房间
    curRoomIndex: 0,
    reqSubEneryData: {
      'id': 101,
      'building_id': '',
      'floor_id': '',
      'room_id': '',
    },
    reqSubEneryHistoryData: {
      'year': `${currentTime.getFullYear()}`,
      'month': `${currentTime.getMonth() + 1}`,
      'id': 1111,
      'queryFlag': 3
    },
    reqBuildEneryData: {
      'id': 0,
      'building_id': 101
    },
    reqBuildEneryHistoryData: {
      'building_id': '',
      'id': 1111,
      'queryFlag': 3,
      'year': `${currentTime.getFullYear()}`,
      'month': `${currentTime.getMonth() + 1}`,
      hour: ''
    },
    reqBuild_RoomList: {
      'buildingId': 101
    },
    reqRoomEneryData: {
      'building_id': 101,
      'floor_id': 1,
      'room_id': 102,
      'id': 0
    },
    reqRoomEneryHistoryData: {
      'building_id': '',
      'floor_id': '',
      'room_id': '',
      'id': 1111,
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
    const zeroPromise = new Promise((rej) => { 
      app.globalObj.apiConfig.getEleSubSystemList()
        .then(res => {
          if (res.success) {
            if (res.result.systemInfo.length>0) {
              _this.setData({
                'subSystemList': res.result.systemInfo
              })
            }
            _this.data.reqRoomEneryData.id = res.result.systemInfo[0].id;
            _this.data.reqSubEneryData.id = res.result.systemInfo[0].id;
            _this.data.reqBuildEneryData.id = res.result.systemInfo[0].id;
            _this.data.reqSubEneryHistoryData.id = res.result.systemInfo[0].id;
            _this.data.reqBuildEneryHistoryData.id = res.result.systemInfo[0].id;
            _this.data.reqRoomEneryHistoryData.id = res.result.systemInfo[0].id;
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
    const firstPromise = new Promise((rej) => { // getEleSubSystemList
      zeroPromise
        .then(()=> {
          rej()
          app.globalObj.apiConfig.getEleSubSystemEneryData(_this.data.reqSubEneryData)
            .then(res => {
              if(res.success) {
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
                _this.setData({
                  dayDataNum: 0,
                  monthDataNum: 0,
                  yearDataNum: 0
                })
                // app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
          app.globalObj.apiConfig.getEleSubSystemHistoryData(_this.data.reqSubEneryHistoryData)
            .then(res => {
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
    const secondPromise = new Promise((rej) => {
      firstPromise
        .then(res => {
          // 楼宇列表
          app.globalObj.apiConfig.getEleBuildListData()
            .then(res => {
              if (res.success) {
                res.result.unshift({
                  'Id': 0,
                  'name': '选择楼宇'
                })
                _this.setData({
                  'buildSysList': res.result
                })
                _this.data.reqBuild_RoomList.buildingId = res.result[0].Id;
                _this.data.reqRoomEneryData.building_id = res.result[0].Id;
                _this.data.reqBuildEneryHistoryData.building_id = res.result[0].Id;
                _this.data.reqRoomEneryHistoryData.building_id = res.result[0].Id;
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
    })
    secondPromise
      .then(() => {
        // 楼宇下的房间列表
        app.globalObj.apiConfig.getEleBuild_RoomListData(_this.data.reqBuild_RoomList)
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
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

  // 切换子系统
  goChangeSubSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSubIndex) {
      return;
    }
    this.setData({
      'curSubIndex': cur_index,
      'curBuildIndex': 0,
      'curRoomIndex': 0
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqSubEneryData.id = _this.data.subSystemList[cur_index].id;
    _this.data.reqBuildEneryData.id = _this.data.subSystemList[cur_index].id;
    _this.data.reqRoomEneryData.id = _this.data.subSystemList[0].id;
    _this.data.reqBuildEneryHistoryData.id = _this.data.subSystemList[0].id;
    _this.data.reqRoomEneryHistoryData.id = _this.data.subSystemList[0].id;
    app.globalObj.apiConfig.getEleSubSystemEneryData(_this.data.reqSubEneryData)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
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
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })

    app.globalObj.apiConfig.getEleSubSystemHistoryData(_this.data.reqSubEneryHistoryData)
      .then(res => {
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
    // cur_index == 0 代表没有选择楼宇 所以查询的是子系统的能耗数据
    if (cur_index == 0) {
      app.globalObj.apiConfig.getEleSubSystemEneryData(_this.data.reqSubEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
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
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleSubSystemHistoryData(_this.data.reqSubEneryHistoryData)
        .then(res => {
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
    } else {
      _this.data.reqBuildEneryData.building_id = _this.data.buildSysList[cur_index].Id;
      _this.data.reqBuild_RoomList.buildingId = _this.data.buildSysList[cur_index].Id;
      _this.data.reqRoomEneryData.building_id = _this.data.buildSysList[cur_index].Id;
      _this.data.reqBuildEneryHistoryData.building_id = _this.data.buildSysList[cur_index].Id;
      _this.data.reqRoomEneryHistoryData.building_id = _this.data.buildSysList[cur_index].Id;
      const secondPromise = new Promise((rej) => {
        // 楼宇数据
        app.globalObj.apiConfig.getEleBuildEnergyData(_this.data.reqBuildEneryData)
          .then(res => {
            if(res.success) {
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
            }else{
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
            rej()
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
        app.globalObj.apiConfig.getEleSubSystemBuildingHistoryData(_this.data.reqBuildEneryHistoryData)
          .then(res => {
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
              }else {
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    }
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
          if(res.success) {
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
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleSubSystemBuildingHistoryData(_this.data.reqBuildEneryHistoryData)
        .then(res => {
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
    } else {
      _this.data.reqRoomEneryData.room_id = _this.data.roomSysList[cur_index].roomId;
      _this.data.reqRoomEneryData.floor_id = _this.data.roomSysList[cur_index].floorId;
      _this.data.reqRoomEneryHistoryData.room_id = _this.data.roomSysList[cur_index].roomId;
      _this.data.reqRoomEneryHistoryData.floor_id = _this.data.roomSysList[cur_index].floorId;
      app.globalObj.apiConfig.getEleBuild_RoomEnergyData(_this.data.reqRoomEneryData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            // _this.setData({
            //   dayDataNum: res.result.realTimeConSum.cruDayConum,
            //   monthDataNum: res.result.realTimeConSum.cruMonthConum,
            //   yearDataNum: res.result.realTimeConSum.cruYearConum
            // })
            let num1 = res.result.realTimeConSum.cruDayConum;
            let num2 = res.result.realTimeConSum.cruMonthConum;
            let num3 = res.result.realTimeConSum.cruYearConum;
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
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      app.globalObj.apiConfig.getEleSubSystemRoomHistoryData(_this.data.reqRoomEneryHistoryData)
        .then(res => {
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