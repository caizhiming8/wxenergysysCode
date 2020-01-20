// pages/page/water/pages/energy/energy.js
import * as echarts from '../../../../../ec-canvas/echarts';
const app = getApp();
const currentTime = new Date();
currentTime.setTime(currentTime.getTime());
var dayEc = null;
var Chart = [];
let listN = '温度';
let unit = '°C';
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
    name: listN,
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
    currentTab: 1,
    waterBuildsArr: [],
    curBuildIndex: 0,
    ec3: {
      onInit: initChart
    },
    reqDataBuild: {
      'buildingId': 0
    },
    reqDataHistory: {
      flag: 3,
      year: `${currentTime.getFullYear()}`,
      month: `${currentTime.getMonth() + 1}`
    },
    reqDataBuildHistory: {
      flag: 3,
      buildingId: 0,
      year: `${currentTime.getFullYear()}`,
      month: `${currentTime.getMonth() + 1}`
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    const getWaterSchoolPromise = new Promise(rej => {
      app.globalObj.apiConfig.getWaterHistoryEnergyData(_this.data.reqDataHistory)
        .then(res => {
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.length) {
              res.result.forEach((item) => {
                a.push(item.number);
                item.consume = item.consume.toFixed(2);
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
          console.log(err);
        })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    // this.init_echarts()
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    const getWaterSchoolPromise = new Promise(rej=> {
      app.globalObj.apiConfig.getSchoolWaterDosage()
        .then(res => {
          rej()
          if(res.success) {
            // _this.setData({
            //   dayDataNum: res.result.dayconsume,
            //   monthDataNum: res.result.monthconsume,
            //   yearDataNum: res.result.yearconsume
            // })
            let num1 = res.result.dayconsume;
            let num2 = res.result.monthconsume;
            let num3 = res.result.yearconsume;
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
          console.log(res);
        })
        .catch(err => {
          rej()
          app.globalObj.apiConfig.goHideToast();
          console.log(err);
        })
    })
    getWaterSchoolPromise
      .then(() => {
        app.globalObj.apiConfig.getSchoolWaterBuilds()
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
            if(res.success) {
              _this.setData({
                waterBuildsArr: res.result
              })
              _this.data.reqDataBuild.buildingId = res.result[0].id;
              _this.data.reqDataBuildHistory.buildingId = res.result[0].id;
            } else {
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err);
          })
      })
  },

  // 切换tab点击事件
  goChangeTab(e) {
    let _this = this,
      cur_info = e.currentTarget.dataset;
    if (cur_info.index == _this.data.currentTab) {
      return;
    }
    _this.setData({
      currentTab: cur_info.index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    if (cur_info.index == 1) {
      app.globalObj.apiConfig.getSchoolWaterDosage()
        .then(res => {
          if(res.success) {
            // _this.setData({
            //   dayDataNum: res.result.dayconsume,
            //   monthDataNum: res.result.monthconsume,
            //   yearDataNum: res.result.yearconsume
            // })
            let num1 = res.result.dayconsume;
            let num2 = res.result.monthconsume;
            let num3 = res.result.yearconsume;
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
            app.globalObj.apiConfig.goHideToast();
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
          console.log(res);
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err);
        })
      app.globalObj.apiConfig.getWaterHistoryEnergyData(_this.data.reqDataHistory)
        .then(res => {
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.length) {
              res.result.forEach((item) => {
                a.push(item.number);
                item.consume = item.consume.toFixed(2);
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
          console.log(err);
        })
    } else {
      app.globalObj.apiConfig.getBuildWaterDosage(_this.data.reqDataBuild)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            // _this.setData({
            //   dayDataNum: res.result.dayconsume,
            //   monthDataNum: res.result.monthconsume,
            //   yearDataNum: res.result.yearconsume
            // })
            let num1 = res.result.dayconsume;
            let num2 = res.result.monthconsume;
            let num3 = res.result.yearconsume;
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
            app.globalObj.apiConfig.goHideToast();
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
        })
      app.globalObj.apiConfig.getWaterBuildingHistoryEnergyData(_this.data.reqDataBuildHistory)
        .then(res => {
          if (res.success) {
            let a = []
              , b = [];
            if (res.result.length) {
              res.result.forEach((item) => {
                a.push(item.number);
                item.consume = item.consume.toFixed(2);
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
          console.log(res);
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err);
        })
    }
  },

  // 切换楼宇点击事件
  goChangeBuild(e) {
    let _this = this,
      cur_index = e.detail.value;
    _this.setData({
      curBuildIndex: cur_index
    });
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqDataBuild.buildingId = _this.data.waterBuildsArr[cur_index].id;
    _this.data.reqDataBuildHistory.buildingId = _this.data.waterBuildsArr[cur_index].id;
    app.globalObj.apiConfig.getBuildWaterDosage(_this.data.reqDataBuild)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          // _this.setData({
          //   dayDataNum: res.result.dayconsume,
          //   monthDataNum: res.result.monthconsume,
          //   yearDataNum: res.result.yearconsume
          // })
          let num1 = res.result.dayconsume;
          let num2 = res.result.monthconsume;
          let num3 = res.result.yearconsume;
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
          app.globalObj.apiConfig.goHideToast();
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err=> {
        app.globalObj.apiConfig.goHideToast();
      })
    app.globalObj.apiConfig.getWaterBuildingHistoryEnergyData(_this.data.reqDataBuildHistory)
      .then(res => {
        if (res.success) {
          let a = []
            , b = [];
          if (res.result.length) {
            res.result.forEach((item) => {
              a.push(item.number);
              item.consume = item.consume.toFixed(2);
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
        console.log(res);
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err);
      })
  }
})