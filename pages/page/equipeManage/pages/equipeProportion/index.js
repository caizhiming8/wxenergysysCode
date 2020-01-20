// pages/page/equipeManage/pages/equipeProportion/index.js
const app = getApp();
import * as echarts from '../../../../../ec-canvas/echarts';

var optionYear = {
  title: {
    text: '状态占比',
    subtext: 0,
    x: 'center',
    y: 'center'
  },
  color: ['#FF908F','#8693F3'],
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}个"
  },
  series: [
    {
      name: '状态占比',
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
            fontSize: '16',
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
    text: '巡检数占比',
    subtext: 0,
    x: 'center',
    y: 'center'
  },
  color: ['#8693F3', '#FF908F'],
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}个"
  },
  series: [
    {
      name: '巡检数占比',
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
            fontSize: '16',
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
    reqData: {
      period_flag: '',
      Uid: '',
      planName: '',
      currentPage: 1,
      pageSize: 15
    },
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    typeArrList: [
      { label: '查询类型', value: '-1' }, 
      { label: '年巡检', value: 0 }, 
      { label: '月巡检', value: 1 }, 
      { label: '日巡检', value: 2 }
    ],
    curSelectTypeIndex: 0,
    renArrList: [],
    curSelectRenIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.getEquipeUserList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            username: '巡检人',
            id: 0
          })
          _this.setData({
            'renArrList': res.result.list
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    _this.goGetData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /* 
   * 调用接口
   */
  goGetData() {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipePollList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          console.log(res)
          if (res.result) {
            let a = res.result.listCount[0].yzxcount
              , b = res.result.listCount[0].wzxcount
              , c = res.result.listCount[0].gzs
              , d = res.result.listCount[0].zcs
            optionYear.series[0].data = [
              { value: a, name: '已执行' },
              { value: b, name: '未执行' }
            ]
            optionYear.title.subtext = (a+b);
            optionMonth.series[0].data = [
              { value: c, name: '故障' },
              { value: d, name: '正常' }
            ]
            optionMonth.title.subtext = (c + d);
            setTimeout(() => {
              aaaaaa.setOption(optionYear);
              aaaaaa2.setOption(optionMonth);
            }, 50)
          }else{
            optionYear.series[0].data = [
              { value: 0, name: '已执行' },
              { value: 0, name: '未执行' }
            ];
            optionMonth.series[0].data = [
              { value: 0, name: '故障' },
              { value: 0, name: '正常' }
            ];
            optionYear.title.subtext = 0;
            optionMonth.title.subtext = 0;
            setTimeout(() => {
              aaaaaa.setOption(optionYear);
              aaaaaa2.setOption(optionMonth);
            }, 50)
            app.globalObj.apiConfig.goShowToast('查询结果为空', 'none', 2000);
          }
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /**
   * tab切换
   */
  goChangeDMAtableTime3(e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.id
      , cur_value = e.detail.value;
    if (cur_index == 1) {
      if (cur_value == _this.data.curSelectTypeIndex) {
        return;
      }
      _this.setData({
        curSelectTypeIndex: cur_value
      })
      _this.data.reqData.period_flag = cur_value ? _this.data.typeArrList[cur_value].id: '';
    } else {
      if (cur_value == _this.data.curSelectRenIndex) {
        return;
      }
      _this.setData({
        curSelectRenIndex: cur_value
      })
      _this.data.reqData.Uid = cur_value > 0 ? _this.data.renArrList[cur_value].id : '';
    }
    _this.goGetData();
  },

  /* 
   * 输入的文字
   */
  goInputCont(e) {
    this.data.reqData.planName = e.detail.value;
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