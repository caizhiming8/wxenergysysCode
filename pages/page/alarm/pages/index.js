// pages/page/alarm/pages/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0,
    isBottom: false,
    reqData: {
      systemId: 2,
      status:'',
      startTime:'',
      endTime:'',
      pageSize: 10,
      currentPage: 1,
      flag: 1,
      roleId: 1
    },
    responseData: [],

    isPickerRender: false,
    isPickerShow: false,
    startTime: "开始时间",
    endTime: "结束时间",
    pickerConfig: {
      endDate: true,
      // column: "second",
      dateLimit: true,
      // initStartTime: "2019-01-01",
      // initEndTime: "2019-12-01",
      limitStartTime: "2015-05-06"
    },
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data
      , id = options.id
      , roleId = options.roleId;
    data.reqData.roleId = roleId;
    if (id == 1) {
      data.reqData.systemId = 2;
      wx.setNavigationBarTitle({
        title: '供电表单',
      })
    } else if(id == 2) {
      data.reqData.systemId = 1;
      wx.setNavigationBarTitle({
        title: '供水表单',
      })
    } else {
      data.reqData.systemId = id;
      if(id == 3) {
        wx.setNavigationBarTitle({
          title: '供暖表单',
        })
      }else {
        wx.setNavigationBarTitle({
          title: '空调表单',
        })
      }
    }
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
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmWarningList(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
          if (res.result.array.length < data.reqData.pageSize) {
            _this.setData({
              isBottom: true
            })
          }
        } else {
          _this.setData({
            showNoContent: true
          })
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        _this.setData({
          showNoContent: true
        })
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 头部tab切换
   */
  goChangeTab(e) {
    let _this = this
      , data = this.data
      , cur_index = e.currentTarget.dataset.index;

    if(cur_index == data.activeTab) {
      _this.setData({
        activeTab: 0
      })
      return;
    }
    _this.setData({
      activeTab: cur_index,
      isBottom: false,
      showNoContent: false
    })
    data.reqData.currentPage = 1;
    data.reqData.status = cur_index == 0 ? '' : cur_index;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmWarningList(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            responseData: res.result.array,
            showNoContent: true
          })
          if (res.result.array.length < data.reqData.pageSize) {
            _this.setData({
              isBottom: true
            })
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

  /* 
   * 下一页
   */
  goNextPage(e) {
    let _this = this
      , data = this.data;
    if (data.isBottom) {
      return;
    }
    _this.data.reqData.currentPage += 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmWarningList(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            responseData: data.responseData.concat(res.result.array)
          })
          if (res.result.array.length < data.reqData.pageSize) {
            data.isBottom = true;
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

  /* 
   * 查看详情
   */
  goLookDetail(e) {
    let _this = this
      , data = this.data
      , cur_value = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `./alarmDetail/index?id=${JSON.stringify(cur_value)}&roleId=${data.reqData.roleId}`
    })
  },




  // 清除时间
  clearTime: function() {
    let _this = this;
    _this.data.reqData.endTime = '';
    _this.data.reqData.startTime = '';
    _this.setData({
      isPickerShow: false,
      chartHide: false,
      startTime: '请选择时间',
      endTime: '请选择时间'
    });
    _this.onShow();
  },
  pickerShow: function () {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function () {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },

  bindPickerChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    console.log(this.data.sensorList);

    this.getData(this.data.sensorList[e.detail.value].id);
    // let startDate = util.formatTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7));
    // let endDate = util.formatTime(new Date());
    this.setData({
      index: e.detail.value,
      sensorId: this.data.sensorList[e.detail.value].id
      // startDate,
      // endDate
    });
  },
  setPickerTime: function (val) {
    let data = val.detail
      , _this = this;
    let startTime = data.startTime.substring(0, 10)
      , endTime = data.endTime.substring(0, 10);
    _this.setData({
      startTime: startTime,
      endTime: endTime,
      showNoContent: false
    });
    _this.data.reqData.endTime = endTime;
    _this.data.reqData.startTime = startTime;
    _this.onShow();
  }
})