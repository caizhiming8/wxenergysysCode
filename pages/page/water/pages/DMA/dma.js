// pages/page/water/pages/DMA/dma.js
import * as echarts from '../../../../../ec-canvas/echarts';
const app = getApp();
var option = {
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 50,
      label: {
        normal: {
          show: true
        }
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [2, 8],
      edgeLabel: {
        normal: {
          textStyle: {
            fontSize: 16
          }
        }
      },
      data: [], 
      // links: [],
      links: [],
      lineStyle: {
        normal: {
          opacity: 0.9,
          width: 2,
          curveness: -0.2
        }
      }
    }
  ]
};
var option2 = {
  color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
  series: [{
    label: {
      normal: {
        fontSize: 14
      }
    },
    name: '出口占比',
    type: 'pie',
    radius: '55%',
    center: ['50%', '60%'],
    data: [{
      value: 55,
      name: '北京'
    }, {
      value: 20,
      name: '武汉'
    }, {
      value: 10,
      name: '杭州'
    }, {
      value: 20,
      name: '广州'
    }, {
      value: 38,
      name: '上海'
    },
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 2, 2, 0.3)'
      }
    }
  }]
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
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart2
    },
    // DMA分区列表
    dmaSubareaList:[],
    // 哪一个页面显示
    curPageShow: 1,
    currentDomPageIndex1: 0,
    currentDomPageIndex2: 0,
    list: [{
      text: "图标",
      iconPath: "/images/chart_nor@2x.png",
      selectedIconPath: "/images/chart_se@2x.png",
    },
    {
      text: "表单",
      iconPath: "/images/list_nor@2x.png",
      selectedIconPath: "/images/list_se@2x.png",
    }],
    tableResponseData1: [],
    tableReqData1: {
      'flag': 3,
      'pageSize': 10,
      'currentPage': 1
    },
    tableReqData2: {
      'flag': 3,
      'areaId': 1
    },
    curSelecttableIndex: 0,
    curSelectDmaIndex: 0,
    curSelectDmaTime: 0,
    tableTimeArray: [
      {
        'id': 3,
        'name': '当日'
      },
      {
        'id': 2,
        'name': '当月'
      },
      {
        'id': 1,
        'name': '当年'
      }
    ],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    // const firstPromise = new Promise((rej)=> {
    //   app.globalObj.apiConfig.getWaterDMASubareaList(null)
    //     .then(res => {
    //       if(res.success) {
    //         _this.setData({
    //           'dmaSubareaList': res.result
    //         })
    //         _this.data.tableReqData2.areaId = res.result[0].id;
    //       } else {
    //         app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
    //       }
    //       rej()
    //     })
    //     .catch(err => {
    //       app.globalObj.apiConfig.goHideToast();
    //       console.log(err)
    //     })
    // })
    // firstPromise
    //   .then(res=> {
    //     app.globalObj.apiConfig.getWaterDMAEchartsData(_this.data.tableReqData2)
    //       .then(res => {
    //         let outbranchsName = [],
    //           links = [],
    //           DMAData = [],
    //           outbranchsValue = [],
    //           n = 0;
    //         app.globalObj.apiConfig.goHideToast();
    //         if(res.success) {
    //           if (res.result.outbranchs && res.result.outbranchs.length) {
    //             res.result.outbranchs.forEach((item) => {
    //               // 处理饼图的数据
    //               outbranchsName.push(item.deviceName);
    //               outbranchsValue.push({ value: item.consume, name: item.deviceName });
    //               // 出口处理球线数据
    //               links.push({ target: item.deviceName, source: item.areaComment });
    //               DMAData.push({ name: item.deviceName, symbolSize: 80, x: 500, y: 250 + n, value: item.consume });
    //               n += 50;
    //             });
    //           }
    //           let m = 0, DMAname;
    //           if (res.result.inbranchs && res.result.inbranchs.length) {
    //             DMAname = res.result.inbranchs[0].areaComment;
    //             res.result.inbranchs.forEach((item) => {
    //               // 进口处理球线数据
    //               links.push({ source: item.name, target: item.areaComment });
    //               DMAData.push({ name: item.name, symbolSize: 80, x: 300, y: 250 + m, value: item.consume });
    //               m += 50;
    //             });
    //           }
    //           // 左面的求线图
    //           DMAData.push({ name: DMAname, symbolSize: 120, x: 400, y: 300 });
    //           // 右边的饼图
    //           outbranchsName.push('漏损量');
    //           if (res.result.leak == null) {
    //             outbranchsValue.push({ value: '0', name: '漏损量' });
    //           } else {
    //             outbranchsValue.push({ value: res.result.leak.diff, name: '漏损量' });
    //           }
    //           option.series[0].data = DMAData;
    //           option.series[0].links = links;
    //           option2.series[0].data = outbranchsValue;

    //           setTimeout(() => {
    //             aaaaaa.setOption(option);
    //             aaaaaa2.setOption(option2);
    //           }, 100)
    //         } else {
    //           app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
    //         }
    //       })
    //       .catch(err => {
    //         app.globalObj.apiConfig.goHideToast();
    //         console.log(err)
    //       })
    //   })
    _this.tabChange();
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
    下方tab切换
   */
  tabChange(e) {
    let _this = this;
    //   cur_index = e.detail.index;
    // if (cur_index == _this.data.curPageShow) {
    //   return;
    // }
    // _this.setData({
    //   curPageShow: cur_index
    // })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    // if (cur_index == 0) {
    //   setTimeout(() => {
    //     aaaaaa.setOption(option);
    //     aaaaaa2.setOption(option2);
    //     app.globalObj.apiConfig.goHideToast();
    //   }, 100)
    // }else{
      app.globalObj.apiConfig.getWaterDMAInOutTable(_this.data.tableReqData1)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            _this.setData({
              tableResponseData1: res.result.array,
              showNoContent: true
            })
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    // }
  },

  // 点击切换楼宇
  goClickChangeBuild() {
    if (this.data.currentDomPageIndex1 == 1) {
      this.setData({
        currentDomPageIndex2: 0,
        currentDomPageIndex1: 0
      })
    } else {
      this.setData({
        currentDomPageIndex2: 0,
        currentDomPageIndex1: 1
      })
    }
  },

  // 点击切换房间
  goClickChangeRoom() {
    if (this.data.currentDomPageIndex2 == 1) {
      this.setData({
        currentDomPageIndex1: 0,
        currentDomPageIndex2: 0
      })
    } else {
      this.setData({
        currentDomPageIndex1: 0,
        currentDomPageIndex2: 1
      })
    }
  },

  /* 
    切换表单时间
   */

  goChangeDMAtableTime(e) {
    console.log(e)
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelecttableIndex) {
      return;
    }
    _this.setData({
      'curSelecttableIndex': cur_index,
      'showNoContent': false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.tableReqData1.flag = _this.data.tableTimeArray[cur_index].id;
    app.globalObj.apiConfig.getWaterDMAInOutTable(_this.data.tableReqData1)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          _this.setData({
            tableResponseData1: res.result.array,
            showNoContent: true
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

  /* 
    切换DMA分区时间
   */

  goChangeDMAtableTime2(e) {
    console.log(e)
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelectDmaTime) {
      return;
    }
    _this.setData({
      'curSelectDmaTime': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.tableReqData2.flag = _this.data.tableTimeArray[cur_index].id;
    app.globalObj.apiConfig.getWaterDMAEchartsData(_this.data.tableReqData2)
      .then(res => {
        let outbranchsName = [],
          links = [],
          DMAData = [],
          outbranchsValue = [],
          n = 0;
        if (res.result.outbranchs && res.result.outbranchs.length) {
          res.result.outbranchs.forEach((item) => {
            // 处理饼图的数据
            outbranchsName.push(item.deviceName);
            outbranchsValue.push({ value: item.consume, name: item.deviceName });
            // 出口处理球线数据
            links.push({ target: item.deviceName, source: item.areaComment });
            DMAData.push({ name: item.deviceName, symbolSize: 80, x: 500, y: 250 + n, value: item.consume });
            n += 50;
          });
        }
        let m = 0, DMAname;
        if (res.result.inbranchs && res.result.inbranchs.length) {
          DMAname = res.result.inbranchs[0].areaComment;
          res.result.inbranchs.forEach((item) => {
            // 进口处理球线数据
            links.push({ source: item.name, target: item.areaComment });
            DMAData.push({ name: item.name, symbolSize: 80, x: 300, y: 250 + m, value: item.consume });
            m += 50;
          });
        }
        // 左面的求线图
        DMAData.push({ name: DMAname, symbolSize: 120, x: 400, y: 300 });
        // 右边的饼图
        outbranchsName.push('漏损量');
        if (res.result.leak == null) {
          outbranchsValue.push({ value: '0', name: '漏损量' });
        } else {
          outbranchsValue.push({ value: res.result.leak.diff, name: '漏损量' });
        }
        option.series[0].data = DMAData;
        option.series[0].links = links;
        option2.series[0].data = outbranchsValue;

        setTimeout(() => {
          aaaaaa.setOption(option);
          aaaaaa2.setOption(option2);
        }, 100)
        app.globalObj.apiConfig.goHideToast();
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
    切换DMA分区
   */

  goChangeDMAtableTime3(e) {
    console.log(e)
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelectDmaIndex) {
      return;
    }
    _this.setData({
      'curSelectDmaIndex': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.tableReqData2.areaId = _this.data.dmaSubareaList[cur_index].id;
    app.globalObj.apiConfig.getWaterDMAEchartsData(_this.data.tableReqData2)
      .then(res => {
        let outbranchsName = [],
          links = [],
          DMAData = [],
          outbranchsValue = [],
          n = 0;
        if (res.result.outbranchs && res.result.outbranchs.length) {
          res.result.outbranchs.forEach((item) => {
            // 处理饼图的数据
            outbranchsName.push(item.deviceName);
            outbranchsValue.push({ value: item.consume, name: item.deviceName });
            // 出口处理球线数据
            links.push({ target: item.deviceName, source: item.areaComment });
            DMAData.push({ name: item.deviceName, symbolSize: 80, x: 500, y: 250 + n, value: item.consume });
            n += 50;
          });
        }
        let m = 0, DMAname;
        if (res.result.inbranchs && res.result.inbranchs.length) {
          DMAname = res.result.inbranchs[0].areaComment;
          res.result.inbranchs.forEach((item) => {
            // 进口处理球线数据
            links.push({ source: item.name, target: item.areaComment });
            DMAData.push({ name: item.name, symbolSize: 80, x: 300, y: 250 + m, value: item.consume });
            m += 50;
          });
        }
        // 左面的求线图
        DMAData.push({ name: DMAname, symbolSize: 120, x: 400, y: 300 });
        // 右边的饼图
        outbranchsName.push('漏损量');
        if (res.result.leak == null) {
          outbranchsValue.push({ value: '0', name: '漏损量' });
        } else {
          outbranchsValue.push({ value: res.result.leak.diff, name: '漏损量' });
        }
        option.series[0].data = DMAData;
        option.series[0].links = links;
        option2.series[0].data = outbranchsValue;

        setTimeout(() => {
          aaaaaa.setOption(option);
          aaaaaa2.setOption(option2);
        }, 100)
        app.globalObj.apiConfig.goHideToast();
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