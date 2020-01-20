// pages/page/warm/pages/heatSource/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';
const currentTime = new Date();
let listN = '温度';
let unit = '°C';
let xAxisData = ['30/01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '31/00']
let yAxisData = [20, 21, 20, 23, 26, 25, 26, 25, 28, 29, 30, 29, 28, 27, 26, 25, 24, 23, 23, 21, 20, 21, 22, 23]

const optionYear = {
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
}
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
    ec: {
      onInit: initChart
    },
    currentBuildIndex:0,
    heatSystemList: [
      {
        label: '选择热源系统',
        value: 0
      }
    ],
    curSelectsystemIndex: 0,
    reqData: {
      'systemId': 3,
      'subsystemId': 1
    },
    reqData2: {
      'systemId': 3,
      'subsystemId': 1,
      'query': 0,
      'buildingId': ''
    },
    reqData3: {
      flag: 3,
      time: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}`,
      query: 1, // 热=1，电=2，水=3
      systemId: 3,
      subsystemId: 2,
      buildingId: ''
    },
    dayDataNum: 0,
    monthDataNum: 0,
    yearDataNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    const firstPromise = new Promise((rej)=> {
      app.globalObj.apiConfig.getHeatingSystemList(_this.data.reqData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            res.result.list.unshift({
              label: '选择热源系统',
              value: 0
            })
            _this.setData({
              heatSystemList: res.result.list
            })
            _this.data.reqData2.buildingId = res.result.list[0].value;
            _this.data.reqData3.buildingId = res.result.list[0].value;
          } else {
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
    firstPromise
      .then(()=> {
        app.globalObj.apiConfig.getHeatingSystemEnergy(_this.data.reqData2)
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
            if(res.success) {
              let num1 = res.result.dayconsume;
              let num2 = res.result.monthconsume;
              let num3 = res.result.yearconsume;
              let n1 = new app.globalObj.NumberAnimate.default({
                from: num1,
                speed: 1000,
                decimals: 0,
                refreshTime: 100,
                onUpdate: () => {
                  this.setData({
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
                  this.setData({
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
                  this.setData({
                    yearDataNum: n3.tempValue
                  });
                },
                onComplete: () => {
                }
              });
            } else {
              this.setData({
                dayDataNum: 0,
                monthDataNum: 0,
                yearDataNum: 0
              });
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
        _this.getZHeXianData();
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

  /* 
    切换热源系统
   */

  goChangeHeatSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelectsystemIndex) {
      return;
    }
    _this.setData({
      'curSelectsystemIndex': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData2.buildingId = _this.data.heatSystemList[cur_index].value;
    _this.data.reqData3.buildingId = _this.data.heatSystemList[cur_index].value;
    app.globalObj.apiConfig.getHeatingSystemEnergy(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          let num1 = res.result.dayconsume;
          let num2 = res.result.monthconsume;
          let num3 = res.result.yearconsume;
          let n1 = new app.globalObj.NumberAnimate.default({
            from: num1,
            speed: 1000,
            decimals: 0,
            refreshTime: 100,
            onUpdate: () => {
              this.setData({
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
              this.setData({
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
              this.setData({
                yearDataNum: n3.tempValue
              });
            },
            onComplete: () => {
            }
          });
        } else {
          this.setData({
            dayDataNum: 0,
            monthDataNum: 0,
            yearDataNum: 0
          });
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    _this.getZHeXianData();
  },

  // 获取折现数据
  getZHeXianData() {
    let _this = this
      ,data  = this.data;
    // 获取折线图的数据
    app.globalObj.apiConfig.getHeatingQueryExchangeHistory(_this.data.reqData3)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          let a = []
            , b = []
          if(res.result.list.length) {
            res.result.list.forEach((item)=> {
              a.push(item.number);
              item.consume = item.consume.toFixed(2);
              b.push(item.consume);
            })
            optionYear.xAxis.data = a;
            optionYear.series[0].data = b;
            setTimeout(() => {
              aaaaaa.setOption(optionYear);
            }, 100)
          }else {
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