// pages/page/electricity/pages/schoolEle/schoolEle.js
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
    reqDataHistory: {
      classId: '',
      queryFlag: 3,
      year: `${currentTime.getFullYear()}`,
      month: `${currentTime.getMonth() + 1}`,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEleSchoolEnergyData(null)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          // _this.setData({
          //   dayDataNum: res.result.realTimeConSum.dayCon,
          //   monthDataNum: res.result.realTimeConSum.monthCon,
          //   yearDataNum: res.result.realTimeConSum.yearCon
          // })
          let num1 = res.result.realTimeConSum.dayCon;
          let num2 = res.result.realTimeConSum.monthCon;
          let num3 = res.result.realTimeConSum.yearCon;
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
    app.globalObj.apiConfig.getEleSystemHistoryData(_this.data.reqDataHistory)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          let a = []
            , b = [];
          if (res.result.AllbuildCousumList.length) {
            res.result.AllbuildCousumList.forEach((item) => {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  saveCanvasImg: function () {
    // const context1 = wx.createCanvasContext('mychartGauge1');
    // const context2 = wx.createCanvasContext('mychart-gauge1');
    // const context3 = wx.createCanvasContext('mychart-gauge1');
    let _this = this;
    const ecComponent = this.selectComponent('#mychartGauge1');//获取echarts组件
    ecComponent.canvasToTempFilePath({
      //安卓机型此处不会成功回调
      success: res => {
        // wx.showLoading({
        //   title: '成功转换图片',
        //   duration: 2000
        // })
        console.log(res.tempFilePath)
        _this.setData({
          canvasImg: res.tempFilePath
        })
      },
      fail: res => console.log('失败', res)
    });
    // setTimeout(()=> {
    //   wx.canvasToTempFilePath({
    //     x: 100,
    //     y: 200,
    //     width: 50,
    //     height: 50,
    //     destWidth: 100,
    //     destHeight: 100,
    //     canvasId: 'mychartGauge1',
    //     success(res) {
    //       console.log(res.tempFilePath)
    //     },
    //     fail(err) {
    //       console.log(err)
    //     }
    //   })
    // }, 50)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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