// pages/tabBar/alarm/alarm.js
const app = getApp();
import * as echarts from '../../../ec-canvas/echarts';

var optionYear = {
  title: {
    text: '总告警条数',
    subtext: 0,
    x: 'center',
    y: 'center'
  },
  color: ['#FF908F', '#8693F3', '#08A9FE'],
  tooltip: {
    trigger: 'item',
    formatter: "{a} \n{b}: {c} 条 ({d}%)"
  },
  series: [
    {
      name: '告警级别',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};
var optionMonth = {
  title: {
    text: '总告警条数',
    subtext: 0,
    x: 'center',
    y: 'center'
  },
  color: ['#08A9FE', '#8693F3', '#FCC667', '#FF908F'],
  tooltip: {
    trigger: 'item',
    formatter: "{a} \n{b}: {c} 条 ({d}%)"
  },
  series: [
    {
      name: '告警类型',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};
let aaaaaa = null;
let aaaaaa2 = null;
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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: app.globalObj.isIpx ? true : false,
    activeNav: 1,
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    // 水-告警数量
    warnNum_water: 0,
    // 电-告警数量
    warnNum_ele: 0,
    // 暖-告警数量
    warnNum_warm: 0,
    // 空调-告警数量
    warnNum_air: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    optionYear.series[0].data = [];
    optionMonth.series[0].data = [];
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmWarningDegree({ systemId: 2 })
      .then(res => {
        if (res.success) {
          res.result.forEach(item => {
            optionYear.series[0].data.push({ value: item.number, name: item.message });
            optionYear.title.subtext = item.allnum;
          })
          setTimeout(() => {
            app.globalObj.apiConfig.goHideToast();
            aaaaaa.setOption(optionYear);
            // aaaaaa2.setOption(optionMonth);
          }, 200)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getAlarmWarningType({ systemId: 2 })
      .then(res => {
        if (res.success) {
          res.result.forEach(item => {
            optionMonth.series[0].data.push({ value: item.number, name: item.message });
            optionMonth.title.subtext = item.allnum;
          })
          setTimeout(() => {
            app.globalObj.apiConfig.goHideToast();
            aaaaaa2.setOption(optionMonth);
          }, 200)
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    app.globalObj.apiConfig.getAlarmAllNum(null)
      .then(res => {
        if (res.success) {
          if (res.result.list.length > 0) {
            res.result.list.forEach(item=> {
              if (item.systemName == '供电告警') {
                _this.setData({
                  warnNum_ele: item.num
                })
              } else if (item.systemName == '供水告警') {
                _this.setData({
                  warnNum_water: item.num
                })
              } else if (item.systemName == '供暖告警') {
                _this.setData({
                  warnNum_warm: item.num
                })
              } else {
                _this.setData({
                  warnNum_air: item.num
                })
              }
            })
          } else {
            let a = 'homeSwiperObj.data';
            _this.setData({
              [a]: _this.data.swipeHData
            })
          }
        }
        // _this.goChangeBotNum();
        app.globalObj.apiConfig.goHideToast();
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 切换头部nav
   */
  goChangeNav(e) {
    let _this = this
      , data = this.data
      , cur_value = e.currentTarget.dataset.id;
    if (cur_value == data.activeNav) {
      return;
    }
    _this.setData({
      activeNav: cur_value
    })
    let a = 0;
    if (cur_value == 1) {
      a = 2;
    } else if (cur_value == 2) {
      a = 1;
    } else {
      a = cur_value;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmWarningDegree({ systemId: a })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          optionYear.title.subtext = 0;
          optionYear.series[0].data = [];
          res.result.forEach(item => {
            optionYear.series[0].data.push({ value: item.number, name: item.message });
            optionYear.title.subtext += item.number;
          })
          setTimeout(() => {
            aaaaaa.setOption(optionYear);
          }, 100)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getAlarmWarningType({ systemId: a })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          optionMonth.title.subtext = 0;
          optionMonth.series[0].data = [];
          res.result.forEach(item => {
            optionMonth.series[0].data.push({ value: item.number, name: item.message });
            optionMonth.title.subtext += item.number;
          })
          setTimeout(() => {
            aaaaaa2.setOption(optionMonth);
          }, 100)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },
  // 底部按钮
  goTabPage(e) {
    let _this = this
      , cur_value = e.currentTarget.dataset
      , data = this.data;
    if (cur_value.id == 'index') {
      let a = app.globalUserData.User_Info.roleId;
      if(a.length > 1) {
        wx.navigateTo({
          url: `/pages/page/alarm/pages/alarmSelect/${cur_value.id}?id=${data.activeNav}`
        })
      }else {
        wx.navigateTo({
          url: `/pages/page/alarm/pages/${cur_value.id}?id=${data.activeNav}&roleId=${a}`
        })
      }
    }else {
      // 告警设定
      if(app.globalFun.authDetecte(cur_value.auth)) {
        wx.navigateTo({
          url: `/pages/page/alarm/pages/setting/index?id=${data.activeNav}`,
        })
      }else {
        app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
      }
    }
  }
})