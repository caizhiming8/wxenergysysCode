// pages/page/water/pages/smallFlow/smallFlow.js
const app = getApp();
const currentTime = new Date();
currentTime.setTime(currentTime.getTime() - 24 * 60 * 60 * 1000);
import * as echarts from '../../../../../ec-canvas/echarts';
var option = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      return params[0].name + '\n' + params[0].seriesName + ':' + params[0].data + 'm³' + '\n' +
        params[1].seriesName + ':' + params[1].data + 'm³';
    }
  },
  legend: {
    data: ['夜间流量', '整日流量']
  },
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'm³'
    }
  ],
  series: [
    {
      name: '夜间流量',
      type: 'bar',
      data: [],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#29C8B1'
          }, {
            offset: 1,
            color: '#78DB95'
          }]),
        }
      }
    },
    {
      name: '整日流量',
      type: 'bar',
      data: [],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#08A9FE'
          }, {
            offset: 1,
            color: '#5C63F6'
          }]),
        }
      }
    }
  ]
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
    tabActiveIndex: 0,
    // 设备间比的时间控件
    timeSelect: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`,
    // 同设备之比的时间控件
    timeSelect2: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}`,
    equipmentArray: [],
    // 选中的设备index
    currentSelectIndex: 0,
    ec: {
      onInit: initChart
    },
    // 设备间比-夜间小流量-请求数据
    reqData1: {
      'year': '',
      'month': '',
      'day': '',
      'pageSize': 50,
      'currentPage': 1
    },
    // 设备间比-夜间小流量-请求数据-柱状图
    reqData1_2: {
      'year': '',
      'month': '',
      'day': ''
    },
    responseData: [],
    // 同设备间比-夜间小流量-请求数据
    reqData2: {
      'deviceId': '',
      'year': '',
      'month': '',
      'pageSize': 50,
      'currentPage': 1
    },
    // 同设备间比-夜间小流量-请求数据
    reqData2_2: {
      'deviceId': '',
      'year': '',
      'month': ''
    },
    showEchartsModel: true,
    showNoContent: false
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    _this.data.reqData1.year = currentTime.getFullYear();
    _this.data.reqData1.month = currentTime.getMonth() + 1;
    _this.data.reqData1.day = currentTime.getDate();
    _this.data.reqData2.year = currentTime.getFullYear();
    _this.data.reqData2.month = currentTime.getMonth() + 1;
    _this.data.reqData1_2.year = currentTime.getFullYear();
    _this.data.reqData1_2.month = currentTime.getMonth() + 1;
    _this.data.reqData1_2.day = currentTime.getDate();
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    const firstPromise = new Promise((rej)=> {
      // 查询供水系统供夜间小流量设备间的对比
      app.globalObj.apiConfig.getWaterQueryNightLeak(_this.data.reqData1)
        .then(res => {
          rej();
          console.log(res)
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
        })
        .catch(err => {
          rej();
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    const secondPromise = new Promise(rej=> {
      firstPromise
        .then(res => {
          // 查询供水系统-夜间小流量-设备间比-柱状图
          app.globalObj.apiConfig.getWaterNightEquipmentTable(_this.data.reqData1_2)
            .then(res => {
              rej();
              let deviceName = [],
                dayConsume = [],
                nightConsume = [];
              if (res.result.array.length) {
                _this.setData({
                  showEchartsModel: true
                })
              }else {
                _this.setData({
                  showEchartsModel: false
                })
              }
              if (res.result.array && res.result.array.length) {
                res.result.array.forEach((item) => {
                  deviceName.push(item.deviceName);
                  dayConsume.push(item.dayConsume);
                  nightConsume.push(item.nightConsume);
                })
              }
              option.xAxis[0].data = deviceName;
              option.series[0].data = nightConsume;
              option.series[1].data = dayConsume;

              setTimeout(() => {
                aaaaaa.setOption(option);
              }, 100)
              console.log(res)
            })
            .catch(err => {
              rej();
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    })
    // 查询设备列表
    secondPromise
      .then(()=> {
        app.globalObj.apiConfig.getWaterNightEquipment()
          .then(res => {
            _this.setData({
              equipmentArray: res.result
            })
            if (res.result.length > 0) {
              _this.data.reqData2.deviceId = _this.data.equipmentArray[0].id;
              _this.data.reqData2_2.deviceId = _this.data.equipmentArray[0].id;
            }
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  },

  // 点击切换tab
  goClickTabChange(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (_this.cur_index == _this.data.tabActiveIndex) {
      return;
    }
    this.setData({
      tabActiveIndex: cur_index,
      responseData: [],
      showNoContent: false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    if (cur_index == 0) {
      const firstPromise = new Promise((rej) => {
        // 查询供水系统供夜间小流量设备间的对比
        app.globalObj.apiConfig.getWaterQueryNightLeak(_this.data.reqData1)
          .then(res => {
            rej();
            _this.setData({
              responseData: res.result.array,
              showNoContent: true
            })
          })
          .catch(err => {
            rej();
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
      firstPromise
        .then(res => {
          // 查询供水系统-夜间小流量-设备间比-柱状图
          app.globalObj.apiConfig.getWaterNightEquipmentTable(_this.data.reqData1_2)
            .then(res => {
              let deviceName = [],
                dayConsume = [],
                nightConsume = [];
              if (res.result.array.length) {
                _this.setData({
                  showEchartsModel: true
                })
              } else {
                _this.setData({
                  showEchartsModel: false
                })
              }
              if (res.result.array && res.result.array.length) {
                res.result.array.forEach((item) => {
                  deviceName.push(item.deviceName);
                  dayConsume.push(item.dayConsume);
                  nightConsume.push(item.nightConsume);
                })
              }
              option.xAxis[0].data = deviceName;
              option.series[0].data = nightConsume;
              option.series[1].data = dayConsume;
              setTimeout(() => {
                aaaaaa.setOption(option);
              }, 100)
              app.globalObj.apiConfig.goHideToast();
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    }else{
      const firstPromise = new Promise(rej => {
        app.globalObj.apiConfig.getWaterNightSmallEquipmentTable(_this.data.reqData2)
          .then(res => {
            rej();
            _this.setData({
              responseData: res.result.array
            })
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
      firstPromise
        .then(() => {
          app.globalObj.apiConfig.getWaterNightSmallEquipment(_this.data.reqData2_2)
            .then(res => {
              console.log(res)
              let deviceName = [],
                dayConsume = [],
                nightConsume = [];
              if (res.result.array.length) {
                _this.setData({
                  showEchartsModel: true
                })
              } else {
                _this.setData({
                  showEchartsModel: false
                })
              }
              if (res.result.array && res.result.array.length) {
                res.result.array.forEach((item) => {
                  deviceName.push(item.number);
                  dayConsume.push(item.dayConsume);
                  nightConsume.push(item.nightConsume);
                })
              }
              option.xAxis[0].data = deviceName;
              option.series[0].data = nightConsume;
              option.series[1].data = dayConsume;
              setTimeout(() => {
                aaaaaa.setOption(option);
              }, 100)
              app.globalObj.apiConfig.goHideToast();
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    }
  },
  // 设备间比的切换时间
  goChangeTimePicker: function (e) {
    let _this = this,
      cur_time_info = e.detail;
    if (_this.data.timeSelect == cur_time_info.value) {
      return;
    }
    _this.setData({
      timeSelect: cur_time_info.value,
      showNoContent: false
    })
    let time = cur_time_info.value.split('-');
    _this.data.reqData1.year = time[0];
    _this.data.reqData1.month = time[1];
    _this.data.reqData1.day = time[2];
    _this.data.reqData1_2.year = time[0];
    _this.data.reqData1_2.month = time[1];
    _this.data.reqData1_2.day = time[2];
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    // 接口调用
    const firstPromise = new Promise((rej) => {
      // 查询供水系统供夜间小流量设备间的对比
      app.globalObj.apiConfig.getWaterQueryNightLeak(_this.data.reqData1)
        .then(res => {
          rej();
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
        })
        .catch(err => {
          rej();
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    firstPromise
      .then(res => {
        // 查询供水系统-夜间小流量-设备间比-柱状图
        app.globalObj.apiConfig.getWaterNightEquipmentTable(_this.data.reqData1_2)
          .then(res => {
            console.log(res)
            let deviceName = [],
              dayConsume = [],
              nightConsume = [];
            if (res.result.array.length) {
              _this.setData({
                showEchartsModel: true
              })
            } else {
              _this.setData({
                showEchartsModel: false
              })
            }
            if (res.result.array && res.result.array.length) {
              res.result.array.forEach((item) => {
                deviceName.push(item.deviceName);
                dayConsume.push(item.dayConsume);
                nightConsume.push(item.nightConsume);
              })
            }
            option.xAxis[0].data = deviceName;
            option.series[0].data = nightConsume;
            option.series[1].data = dayConsume;

            setTimeout(() => {
              aaaaaa.setOption(option);
            }, 100)
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  },
  // 同设备之比的切换时间
  goChangeTimePicker2: function (e) {
    let _this = this,
      cur_time_info = e.detail;
    if (_this.data.timeSelect2 == cur_time_info.value) {
      return;
    }
    _this.setData({
      timeSelect2: cur_time_info.value,
      responseData: [],
      showNoContent: false
    })
    let time = cur_time_info.value.split('-');
    _this.data.reqData2.year = time[0];
    _this.data.reqData2.month = time[1];
    _this.data.reqData2_2.year = time[0];
    _this.data.reqData2_2.month = time[1];
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    // 接口调用
    const firstPromise = new Promise(rej => {
      app.globalObj.apiConfig.getWaterNightSmallEquipmentTable(_this.data.reqData2)
        .then(res => {
          rej();
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
          app.globalObj.apiConfig.goHideToast();
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    firstPromise
      .then(() => {
        app.globalObj.apiConfig.getWaterNightSmallEquipment(_this.data.reqData2_2)
          .then(res => {
            console.log(res)
            let deviceName = [],
              dayConsume = [],
              nightConsume = [];
            if (res.result.array.length) {
              _this.setData({
                showEchartsModel: true
              })
            } else {
              _this.setData({
                showEchartsModel: false
              })
            }
            if (res.result.array && res.result.array.length) {
              res.result.array.forEach((item) => {
                deviceName.push(item.number);
                dayConsume.push(item.dayConsume);
                nightConsume.push(item.nightConsume);
              })
            }
            option.xAxis[0].data = deviceName;
            option.series[0].data = nightConsume;
            option.series[1].data = dayConsume;
            setTimeout(() => {
              aaaaaa.setOption(option);
            }, 100)
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  },
  // 切换设备
  goChangeFacilityPicker(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.currentSelectIndex) {
      return;
    }
    _this.setData({
      currentSelectIndex: cur_index,
      responseData: [],
      showNoContent: false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData2.deviceId = _this.data.equipmentArray[cur_index].id;
    _this.data.reqData2_2.deviceId = _this.data.equipmentArray[cur_index].id;
    const firstPromise = new Promise(rej=> {
      app.globalObj.apiConfig.getWaterNightSmallEquipmentTable(_this.data.reqData2)
        .then(res => {
          rej();
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
          app.globalObj.apiConfig.goHideToast();
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    firstPromise
      .then(()=> {
        app.globalObj.apiConfig.getWaterNightSmallEquipment(_this.data.reqData2_2)
          .then(res => {
            console.log(res)
            let deviceName = [],
              dayConsume = [],
              nightConsume = [];
            if (res.result.array.length) {
              _this.setData({
                showEchartsModel: true
              })
            } else {
              _this.setData({
                showEchartsModel: false
              })
            }
            if (res.result.array && res.result.array.length) {
              res.result.array.forEach((item) => {
                deviceName.push(item.number);
                dayConsume.push(item.dayConsume);
                nightConsume.push(item.nightConsume);
              })
            }
            option.xAxis[0].data = deviceName;
            option.series[0].data = nightConsume;
            option.series[1].data = dayConsume;
            setTimeout(() => {
              aaaaaa.setOption(option);
            }, 100)
            app.globalObj.apiConfig.goHideToast();
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      })
  }
})