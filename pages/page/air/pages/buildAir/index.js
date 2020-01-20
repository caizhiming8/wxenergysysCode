// pages/page/air/pages/buildAir/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';

const currentTime = new Date();
currentTime.setTime(currentTime.getTime());
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
    currentBuildIndex: 0,
    currentRoomIndex: 0,
    buildSysList: [],
    roomSysList: [],
    // 当前楼宇
    curBuildIndex: 0,
    // 当前房间
    curRoomIndex: 0,
    reqData1: {
      'buildingId': 0
    },
    reqData2: {
      'buildingId': 101,
      'systemId': 4,
      'subsystemId': 2,
      'floorId': 1,
      'roomId': 0
    },
    reqData3: {
      'systemId': 4,
      'subsystemId': 2,
      'buildingId': 101,
      'floorId': 1,
      'roomId': 1,
      'flag': 3,
      'time': `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}`
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
    const firstPromise = new Promise((rej) => {
      app.globalObj.apiConfig.getAirBuildSystem({'systemId': 4})
        .then(res => {
          rej();
          if(res.success) {
            _this.setData({
              buildSysList: res.result.list2
            })
            _this.data.reqData1.buildingId = res.result.list2[0].buildingId;
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          rej();
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    const secondPromise = new Promise((rej)=> {
      firstPromise
        .then(res => {
          app.globalObj.apiConfig.getAirBuildSystemRoom(_this.data.reqData1)
            .then(res => {
              if(res.success) {
                _this.setData({
                  roomSysList: res.result
                })
                _this.data.reqData2.buildingId = res.result[0].buildingId;
                _this.data.reqData2.floorId = res.result[0].floorId;
                _this.data.reqData2.roomId = res.result[0].roomId;
                _this.data.reqData3.buildingId = res.result[0].buildingId;
                _this.data.reqData3.floorId = res.result[0].floorId;
                _this.data.reqData3.roomId = res.result[0].roomId;
              }else{
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
              rej()
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    })
    secondPromise
      .then(()=> {
        _this.getDataEvent();
        return;
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
  goClickChangeBuild() {
    if (this.data.currentBuildIndex == 1) {
      this.setData({
        currentRoomIndex: 0,
        currentBuildIndex: 0
      })
    } else {
      this.setData({
        currentRoomIndex: 0,
        currentBuildIndex: 1
      })
    }
  },

  // 点击切换楼宇
  goChangeBuildSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curBuildIndex) {
      return;
    }
    this.setData({
      curBuildIndex: cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData1.buildingId = _this.data.buildSysList[cur_index].buildingId;
    const secondPromise = new Promise((rej) => {
      app.globalObj.apiConfig.getAirBuildSystemRoom(_this.data.reqData1)
        .then(res => {
          if(res.success) {
            _this.setData({
              roomSysList: res.result
            })
            _this.data.reqData2.buildingId = res.result[0].buildingId;
            _this.data.reqData2.floorId = res.result[0].floorId;
            _this.data.reqData2.roomId = res.result[0].roomId;
            _this.data.reqData3.buildingId = res.result[0].buildingId;
            _this.data.reqData3.floorId = res.result[0].floorId;
            _this.data.reqData3.roomId = res.result[0].roomId;
          }else{
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
          rej()
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    secondPromise
      .then(() => {
        _this.getDataEvent();
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
      curRoomIndex: cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData2.roomId = _this.data.roomSysList[cur_index].roomId;
    _this.data.reqData3.roomId = _this.data.roomSysList[cur_index].roomId;
    _this.getDataEvent();
    return;
  },

  // 点击切换房间
  goClickChangeRoom() {
    if (this.data.currentRoomIndex == 1) {
      this.setData({
        currentBuildIndex: 0,
        currentRoomIndex: 0
      })
    } else {
      this.setData({
        currentBuildIndex: 0,
        currentRoomIndex: 1
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
  
  // 获取数据接口事件
  getDataEvent() {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getAirBuildSystemRoomData(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          // optionYear.series[0].data = [{ value: res.result.yearconsume }]
          // optionMonth.series[0].data = [{ value: res.result.monthconsume }]
          // optionDay.series[0].data = [{ value: res.result.dayconsume }]
          // setTimeout(() => {
          //   aaaaaa.setOption(optionDay);
          //   aaaaaa2.setOption(optionMonth);
          //   aaaaaa3.setOption(optionYear);
          // }, 100)
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
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
      app.globalObj.apiConfig.getAirBuildSystemRoomHistoryData(_this.data.reqData3)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
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
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})