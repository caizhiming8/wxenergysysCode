// pages/page/warm/pages/heatSource/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';

var optionYear = {
  backgroundColor: "#fff",
  color: ["#37A2DA", "#32C5E9", "#67E0E3"],
  series: [{
    name: '业务指标',
    type: 'gauge',
    max: 3000,
    detail: {
      formatter: '{value} GJ',
      textStyle: {
        fontSize: 16,
        fontWeight: 700
      }
    },
    axisLabel: {
      textStyle: {       // 属性lineStyle控制线条样式
        color: '#000',
        fontSize: 6,   //改变仪表盘内刻度数字的大小
        shadowColor: '#000', //默认透明
      }
    },
    pointer: {   // 指针的宽度和长度
      width: 3,//指针的宽度
      length: "80%", //指针长度，按照半圆半径的百分比
      shadowColor: '#ccc', //默认透明
      shadowBlur: 5
    },
    splitLine: {   //分割线的长度
      length: 10
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 5,
        shadowBlur: 0,
        color: [
          [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0.1,
            color: "#FFC600"
          },
          {
            offset: 0.6,
            color: "#30D27C"
          },
          {
            offset: 1,
            color: "#0B95FF"
          }
          ])]
        ]
      }
    },
    data: []
  }]
};
var optionMonth = {
  backgroundColor: "#fff",
  color: ["#37A2DA", "#32C5E9", "#67E0E3"],
  series: [{
    name: '业务指标',
    type: 'gauge',
    max: 3000,
    detail: {
      formatter: '{value} GJ',
      textStyle: {
        fontSize: 16,
        fontWeight: 700
      }
    },
    axisLabel: {
      textStyle: {       // 属性lineStyle控制线条样式
        color: '#000',
        fontSize: 6,   //改变仪表盘内刻度数字的大小
        shadowColor: '#000', //默认透明
      }
    },
    pointer: {   // 指针的宽度和长度
      width: 3,//指针的宽度
      length: "80%", //指针长度，按照半圆半径的百分比
      shadowColor: '#ccc', //默认透明
      shadowBlur: 5
    },
    splitLine: {   //分割线的长度
      length: 10
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 5,
        shadowBlur: 0,
        color: [
          [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0.1,
            color: "#FFC600"
          },
          {
            offset: 0.6,
            color: "#30D27C"
          },
          {
            offset: 1,
            color: "#0B95FF"
          }
          ])]
        ]
      }
    },
    data: []
  }]
};
var optionDay = {
  backgroundColor: "#fff",
  color: ["#37A2DA", "#32C5E9", "#67E0E3"],
  series: [{
    name: '业务指标',
    type: 'gauge',
    max: 3000,
    detail: {
      formatter: '{value} GJ',
      textStyle: {
        fontSize: 16,
        fontWeight: 700
      }
    },
    axisLabel: {
      textStyle: {       // 属性lineStyle控制线条样式
        color: '#000',
        fontSize: 6,   //改变仪表盘内刻度数字的大小
        shadowColor: '#000', //默认透明
      }
    },
    pointer: {   // 指针的宽度和长度
      width: 3,//指针的宽度
      length: "80%", //指针长度，按照半圆半径的百分比
      shadowColor: '#ccc', //默认透明
      shadowBlur: 5
    },
    splitLine: {   //分割线的长度
      length: 10
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 5,
        shadowBlur: 0,
        color: [
          [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0.1,
            color: "#FFC600"
          },
          {
            offset: 0.6,
            color: "#30D27C"
          },
          {
            offset: 1,
            color: "#0B95FF"
          }
          ])]
        ]
      }
    },
    data: []
  }]
};
let aaaaaa = null;
let aaaaaa2 = null;
let aaaaaa3 = null;
function initChart(canvas, width, height) {
  aaaaaa = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(aaaaaa);
  return aaaaaa;
}
function initChart2(canvas, width, height) {
  aaaaaa2 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(aaaaaa2);
  return aaaaaa2;
}
function initChart3(canvas, width, height) {
  aaaaaa3 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(aaaaaa3);
  return aaaaaa3;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    ec3: {
      onInit: initChart3
    },
    currentBuildIndex: 0,
    heatSystemList: [
      {
        label: '请选择',

      }
    ],
    curSelectsystemIndex: 0,
    curHeatType: 3,
    reqData: {
      'systemId': 3,
      'subsystemId': 3
    },
    reqData2: {
      'systemId': 3,
      'subsystemId': 3,
      'query': 0,
      'buildingId': '',
      'number': 1
    },
    websockConnect: '',
    // 接口返回的实时数据
    responseRealData: {},
    // 接口返回的实时数据2---数组版
    responseRealData2: [],
    // 接口返回的实时数据2---数组版
    responseRealData3: [],
    // 接口返回的实时数据2---数组版
    responseRealData4: [],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;//
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 10000);
    const firstPromise = new Promise((rej) => {
      app.globalObj.apiConfig.getHeatingSystemList(_this.data.reqData)
        .then(res => {
          if(res.success) {
            _this.setData({
              heatSystemList: res.result.list
            })
            _this.data.reqData2.buildingId = res.result.list[0].value;
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
    firstPromise
      .then(() => {
        // app.globalObj.apiConfig.getHeatingSystemEnergy(_this.data.reqData2)
        //   .then(res => {
        //     app.globalObj.apiConfig.goHideToast();
        //     if(res.success) {
        //       optionYear.series[0].data = [{ value: res.result.yearconsume }]
        //       optionMonth.series[0].data = [{ value: res.result.monthconsume }]
        //       optionDay.series[0].data = [{ value: res.result.dayconsume }]
        //       setTimeout(() => {
        //         aaaaaa.setOption(optionYear);
        //         aaaaaa2.setOption(optionMonth);
        //         aaaaaa3.setOption(optionDay);
        //       }, 100)
        //     }else{
        //       app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        //     }
        //   })
        //   .catch(err => {
        //     app.globalObj.apiConfig.goHideToast();
        //     console.log(err)
        //   })
        _this.goGetRealData();
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
    切换换热站系统
   */

  goChangeHeatSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelectsystemIndex) {
      return;
    }
    _this.setData({
      'curSelectsystemIndex': cur_index,
      'showNoContent': false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 10000);
    _this.data.reqData2.buildingId = _this.data.heatSystemList[cur_index].value;
    if (_this.data.curHeatType == 3) {
      _this.goGetRealData();
      return;
    }
    app.globalObj.apiConfig.getHeatingSystemEnergy(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          optionYear.series[0].data = [{ value: res.result.yearconsume }]
          optionMonth.series[0].data = [{ value: res.result.monthconsume }]
          optionDay.series[0].data = [{ value: res.result.dayconsume }]
          setTimeout(() => {
            aaaaaa.setOption(optionYear);
            aaaaaa2.setOption(optionMonth);
            aaaaaa3.setOption(optionDay);
          }, 100)
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 切换热量方式
  goChangeHeatType(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (cur_index == _this.data.curHeatType) {
      return;
    }
    this.setData({
      curHeatType: cur_index,
      showNoContent: false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData2.query = Number(cur_index)+1;
    if (cur_index == 3) {
      // 请求实时数据
      _this.goGetRealData()
      return;
    }
    if (cur_index == 0) {
      optionYear.series[0].detail.formatter = '{value} GJ'
      optionMonth.series[0].detail.formatter = '{value} GJ'
      optionDay.series[0].detail.formatter = '{value} GJ'
    } else if (cur_index == 1) {
      optionYear.series[0].detail.formatter = '{value} kWh'
      optionMonth.series[0].detail.formatter = '{value} kWh'
      optionDay.series[0].detail.formatter = '{value} kWh'
    } else if (cur_index == 2) {
      optionYear.series[0].detail.formatter = '{value} m³'
      optionMonth.series[0].detail.formatter = '{value} m³'
      optionDay.series[0].detail.formatter = '{value} m³'
    }
    app.globalObj.apiConfig.getHeatingSystemEnergy(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          optionYear.series[0].data = [{ value: res.result.yearconsume }]
          optionMonth.series[0].data = [{ value: res.result.monthconsume }]
          optionDay.series[0].data = [{ value: res.result.dayconsume }]
          setTimeout(() => {
            aaaaaa.setOption(optionYear);
            aaaaaa2.setOption(optionMonth);
            aaaaaa3.setOption(optionDay);
          }, 100)
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 请求实时数据
   */
  goGetRealData() {
    let _this = this;
    // 连接
    app.globalObj.apiConfig.getHeatingQueryCityHeatDeviceReal(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          let a = Object.prototype.toString;
          let b = []
            , c = []
            , d = [];
          try{
            for (let i in res.result) {
              let cur_val = res.result[i];
              if (a.call(cur_val) === '[object Object]') {
                if (cur_val.value) {
                  if (cur_val.dataName.indexOf('一') == 0) {
                    b.push(cur_val)
                  } else if (cur_val.dataName.indexOf('二') == 0) {
                    c.push(cur_val)
                  } else {
                    d.push(cur_val)
                  }
                }
              }
            }
            // let e = b.concat(c);
            // let f = e.concat(d);
            // _this.data.responseRealData2 = f;
            _this.setData({
              'responseRealData': res.result,
              'responseRealData2': b,
              'responseRealData3': c,
              'responseRealData4': d,
              showNoContent: true
            })
          }catch(err) {
            console.log(err);
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
})