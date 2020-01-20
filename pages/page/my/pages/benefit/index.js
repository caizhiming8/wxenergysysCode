// pages/page/my/pages/benefit/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';
let projectId = app.globalUserData.User_Info.preprojectId;

var labelOption = {
  normal: {
    show: true,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '',
    fontSize: 16,
    rich: {
      name: {
        textBorderColor: '#fff'
      }
    }
  }
};
const option1 = {
  grid: {
    left: '15%',
    right: '5%'
  },
  color: ['#003366', '#006699'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['今日', '昨日']
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['能耗', '定额']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '今日',
      type: 'bar',
      barGap: 0,
      selectedMode: 'multiple',
      legendHoverLink: false,
      barWidth: 30,
      label: labelOption,
      data: [320, 332],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#78DB95'
          }, {
            offset: 1,
              color: '#29C8B1'
          }])
        },
      }
    },
    {
      name: '昨日',
      type: 'bar',
      barWidth: 30,
      label: labelOption,
      data: [220, 182],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#08A9FE'
          }, {
            offset: 1,
              color: '#5C63F6'
          }])
        },
      }
    }
  ]
};
const option2 = {
  grid: {
    left: '15%',
    right: '5%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['今日', '昨日']
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['节能金额', '节能利润']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '今日',
      type: 'bar',
      barGap: 0,
      barWidth: 30,
      label: labelOption,
      data: [320, 332],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#fa8c60'
          }, {
            offset: 1,
              color: '#f77644'
          }]),
        }
      }
    },
    {
      name: '昨日',
      type: 'bar',
      barWidth: 30,
      label: labelOption,
      data: [420, 182],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#fb7676'
          }, {
            offset: 1,
              color: '#fa4a4a'
          }])
        }
      },
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
    ec1: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    unitsArr: [
      {
        name1: 'GJ',
        name2: '元'
      },
      {
        name1: 'kw·h',
        name2: '元'
      },
      {
        name1: 'm³',
        name2: '元'
      }
    ],
    unitObj: {
      name1: 'GJ',
      name2: '元'
    },
    isIpx: app.globalObj.isIpx ? true : false,
    currentTab: 1,
    tabNavIndex: 'index',
    // 实时效益
    reqData1: {
      flag: 1,
      projectId: projectId
    },
    // 昨日效益
    reqData2: {
      flag: 2,
      projectId: projectId
    },
    // 当前楼宇
    curBuildIndex: 0,
    buildSysList: [
      {
        'Id': 0,
        'name': '供暖系统'
      },
      {
        'Id': 1,
        'name': '供电系统'
      },
      {
        'Id': 2,
        'name': '供水系统'
      }
    ],
    todayDataObj: [],
    todayTableData: {
      // 能耗
      dayCon: '',
      // 节能金额
      moneySaving: '',
      // 节能利润
      profit: '',
      // 定额
      quota: ''
    },
    yesterdayDataObj: [],
    yesterdayTableData: {
      // 能耗
      dayCon: '',
      // 节能金额
      moneySaving: '',
      // 节能利润
      profit: '',
      // 定额
      quota: ''
    },
    reqData3: {
      projectId: app.globalUserData.User_Info.preprojectId,
      flag: 2,
      time_flag: 2
    },
    economyMoneyObj: {
      moneySaving: 0,
      cruQouat: 0,
      quotaAll: 0,
      profit: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 今日数据
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getBenefitRealTime(_this.data.reqData1)
      .then(res => {
        if (res.success) {
          res.result.list.forEach(item=> {
            if (item.system == "暖") {
              _this.setData({
                'yesterdayTableData': item
              })
            }
          })
          _this.data.yesterdayDataObj = res.result.list;
          app.globalObj.apiConfig.goHideToast();
        }else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    // 昨日数据
    app.globalObj.apiConfig.getBenefitRealTime(_this.data.reqData2)
      .then(res => {
        if (res.success) {
          res.result.list.forEach(item => {
            if (item.system == "暖") {
              _this.setData({
                'todayTableData': item
              })
            }
          })
          _this.data.todayDataObj = res.result.list;
          app.globalObj.apiConfig.goHideToast();
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    _this.goDisposeAllData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 点击切换-系统
  goChangeBuildSystem(e) {
    let _this = this
      ,cur_index = e.detail.value
      ,data = this.data;
    if (cur_index == _this.data.curBuildIndex) {
      return;
    }
    // 0 供暖 1 供电 2 供暖
    _this.setData({
      'curBuildIndex': cur_index
    })
    if (data.tabNavIndex == 'index') {
      _this.goDisposeTableData();
      _this.goDisposeAllData();
    } else {
      _this.goDisposeData();
    }
  },

  // 底部按钮
  goTabPage(e) {
    let _this = this
      , cur_value = e.currentTarget.dataset.id
      , data = this.data;
    if (cur_value == 'index') {
      _this.setData({
        'tabNavIndex': cur_value
      })
      _this.goDisposeTableData();
      _this.goDisposeAllData();
    } else if (cur_value == 'extra') {
      wx.navigateTo({
        url: './extraList/extraList',
      })
    } else {
      _this.setData({
        'tabNavIndex': cur_value
      })
      _this.goDisposeData();
    }
  },

  // 表单数据处理
  goDisposeTableData() {
    let _this = this
      , data = this.data
      , cur_index = _this.data.curBuildIndex;
    _this.setData({
      unitObj: data.unitsArr[cur_index]
    })
    if (cur_index == 0) {
      data.todayDataObj.forEach(item => {
        if (item.system == "暖") {
          _this.setData({
            'todayTableData': item
          })
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "暖") {
          _this.setData({
            'yesterdayTableData': item
          })
        }
      })
    } else if (cur_index == 1) {
      data.todayDataObj.forEach(item => {
        if (item.system == "电") {
          _this.setData({
            'todayTableData': item
          })
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "电") {
          _this.setData({
            'yesterdayTableData': item
          })
        }
      })
    } else {
      data.todayDataObj.forEach(item => {
        if (item.system == "水") {
          _this.setData({
            'todayTableData': item
          })
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "水") {
          _this.setData({
            'yesterdayTableData': item
          })
        }
      })
    }
  },

  // 图标数据处理
  goDisposeData() {
    let _this = this
      , data = this.data
      , cur_index = _this.data.curBuildIndex;
    let obj1 = {}
      , obj2 = {};
    if (cur_index == 0) {
      data.todayDataObj.forEach(item => {
        if (item.system == "暖") {
          obj1 = item
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "暖") {
          obj2 = item
        }
      })
    } else if (cur_index == 1) {
      data.todayDataObj.forEach(item => {
        if (item.system == "电") {
          obj1 = item
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "电") {
          obj2 = item
        }
      })
    } else {
      data.todayDataObj.forEach(item => {
        if (item.system == "水") {
          obj1 = item
        }
      })
      data.yesterdayDataObj.forEach(item => {
        if (item.system == "水") {
          obj2 = item
        }
      })
    }
    // 今日
    option1.series[0].data = [obj1.dayCon, obj1.quota];
    // 昨日
    option1.series[1].data = [obj2.dayCon, obj2.quota];

    // 今日
    option2.series[0].data = [obj1.moneySaving, obj1.profit];
    // 昨日
    option2.series[1].data = [obj2.moneySaving, obj2.profit];

    setTimeout(() => {
      aaaaaa.setOption(option1);
      aaaaaa2.setOption(option2);
      // 显示 tooltip
      aaaaaa.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
      });
      // 显示 tooltip
      // aaaaaa2.dispatchAction({
      //   type: 'showTip',
      //   seriesIndex: 0,
      //   dataIndex: 0
      // });
    }, 100)
  },

  // 总节能数据
  goDisposeAllData() {
    let _this = this
      , data = this.data
      , cur_index = _this.data.curBuildIndex;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    if (cur_index == 0) {
      app.globalObj.apiConfig.getBenefitWarmYearData(_this.data.reqData3)
        .then(res => {
          if (res.success) {
            let a = {
              moneySaving: res.result.moneySaving,
              profit: res.result.profit,
              cruQouat: res.result.quota,
              quotaAll: res.result.allquota
            }
            _this.setData({
              economyMoneyObj: a
            })
            app.globalObj.apiConfig.goHideToast();
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else if (cur_index == 1) {
      app.globalObj.apiConfig.getBenefitEleYearData(_this.data.reqData3)
        .then(res => {
          if (res.success) {
            let a = {
              moneySaving: res.result.saveMoney,
              profit: res.result.profit,
              cruQouat: res.result.cruQouat,
              quotaAll: res.result.quotaAll
            }
            _this.setData({
              economyMoneyObj: a
            })
            app.globalObj.apiConfig.goHideToast();
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else {
      app.globalObj.apiConfig.getBenefitWaterYearData(_this.data.reqData3)
        .then(res => {
          if (res.success) {
            let a = {
              moneySaving: res.result.moneySaving,
              profit: res.result.profit,
              cruQouat: res.result.quota,
              quotaAll: res.result.allquota
            }
            _this.setData({
              economyMoneyObj: a
            })
            app.globalObj.apiConfig.goHideToast();
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
  }
})