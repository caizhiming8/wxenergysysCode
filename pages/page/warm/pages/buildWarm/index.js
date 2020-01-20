// pages/page/warm/pages/buildWarm/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';
var option = {
  color: ['#3398DB'],
  title: {
    text: '历史能耗',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: "{a} \n{b}: {c} GJ"
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'GJ'
    }
  ],
  series: [
    {
      name: '历史能耗',
      type: 'bar',
      barWidth: '60%',
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
let aaaaa = null;
function initChart(canvas, width, height) {
  aaaaa = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(aaaaa);


  return aaaaa;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    tabActiveIndex: 0,
    // 能耗对比-时间类型
    curTimeType: 3,
    reqData1: {
      'systemId': 3,
      'subsystemId': 4,
      'flag': 3
    },
    reqData2: {
      'systemId': 3,
      'subsystemId': 4,
      'flag': 1
    },
    buildEneryDataList: [],
    // 数据表   数据
    buildHistoryEnergyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    // app.globalObj.apiConfig.getHeatingEnergyData(_this.data.reqData2)
    //   .then(res => {
    //     app.globalObj.apiConfig.goHideToast();
    //     if (res.success) {
    //       _this.setData({
    //         'buildEneryDataList': res.result
    //       })
    //     } else {
    //       app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
    //     }
    //   })
    //   .catch(err => {
    //     app.globalObj.apiConfig.goHideToast();
    //     console.log(err)
    //   })
    app.globalObj.apiConfig.getHeatingEnergyContrast(_this.data.reqData1)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        let consume = [];
        let buildings = [];
        if(res.success) {
          if (res.result.list && res.result.list.length) {
            res.result.list.forEach((item) => {
              item.consume = item.consume.toFixed(2);
              consume.push(item.consume);
              buildings.push(item.buildingName);
            });
          }
          option.xAxis[0].data = buildings;
          option.series[0].data = consume;
          setTimeout(() => {
            aaaaa.setOption(option);
          }, 100)
          _this.setData({
            'buildHistoryEnergyList': res.result.list
          })
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
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
  goClickTabChange(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (cur_index == _this.data.tabActiveIndex) {
      return;
    }
    this.setData({
      tabActiveIndex: cur_index,
      buildEneryDataList: []
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    if (cur_index == 0) {
      // setTimeout(() => {
      //   aaaaa.setOption(option);
      // }, 100)
      app.globalObj.apiConfig.getHeatingEnergyContrast(_this.data.reqData1)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          let consume = [];
          let buildings = [];
          if (res.success) {
            if (res.result.list && res.result.list.length) {
              res.result.list.forEach((item) => {
                item.consume = item.consume.toFixed(2);
                consume.push(item.consume);
                buildings.push(item.buildingName);
              });
            }
            option.xAxis[0].data = buildings;
            option.series[0].data = consume;
            setTimeout(() => {
              aaaaa.setOption(option);
            }, 100)
            _this.setData({
              'buildHistoryEnergyList': res.result.list
            })
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }else{
      app.globalObj.apiConfig.getHeatingEnergyData(_this.data.reqData2)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            _this.setData({
              'buildEneryDataList': res.result
            })
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
  },

  // 点击切换能耗对比的时间
  goChangeTimeType(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (cur_index == _this.data.curTimeType) {
      return;
    }
    this.setData({
      curTimeType: cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData1.flag = cur_index;
    app.globalObj.apiConfig.getHeatingEnergyContrast(_this.data.reqData1)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        let consume = [];
        let buildings = [];
        if(res.success) {
          if (res.result.list && res.result.list.length) {
            res.result.list.forEach((item) => {
              item.consume = item.consume.toFixed(2);
              consume.push(item.consume);
              buildings.push(item.buildingName);
            });
          }
          option.xAxis[0].data = buildings;
          option.series[0].data = consume;
          setTimeout(() => {
            aaaaa.setOption(option);
          }, 100)
          _this.setData({
            'buildHistoryEnergyList': res.result.list
          })
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