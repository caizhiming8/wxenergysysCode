// pages/page/water/pages/facilityState/facilityState.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    nbMeterListArray: [],
    collectorListArray: [],
    // 请求接口的数据对象
    reqData: {
      // 'name': '',
      'flag': 2,
      'pageSize': 100,
      'currentPage': 1
    },
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
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getEleCollectorStateData(_this.data.reqData)
      .then(res=> {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          _this.setData({
            nbMeterListArray: res.result.StatusList,
            showNoContent: true
          })
        }else{
          _this.setData({
            showNoContent: true
          })
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 改变input 查询内容
  goChangeReqData(e) {
    let _this = this,
      inputData = e.detail;
    _this.data.reqData.name = inputData.value;
  },

  // 请求接口
  goRequestInterface() {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getNBMeterState(_this.data.reqData)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          _this.setData({
            nbMeterListArray: res.result.array,
            showNoContent: true
          })
        }else{
          _this.setData({
            showNoContent: true
          })
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 切换tab点击事件
  goChangeTab(e) {
    let _this = this,
      cur_info = e.currentTarget.dataset;
    if (cur_info.index == _this.data.currentTab) {
      return;
    }
    _this.setData({
      currentTab: cur_info.index,
      showNoContent: false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.nbMeterListArray = [];
    _this.data.collectorListArray = [];
    _this.data.reqData.currentPage = 1;
    if (cur_info.index == 1) {
      // _this.data.reqData.flag = 1;
      app.globalObj.apiConfig.getEleCollectorStateData(_this.data.reqData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            _this.setData({
              nbMeterListArray: res.result.array,
              showNoContent: true
            })
          } else {
            _this.setData({
              showNoContent: true
            })
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else {
      // _this.data.reqData.flag = 2;
      app.globalObj.apiConfig.getWaterDeviceStateList({currentPage: 1,pageSize: 100})
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if(res.success) {
            _this.setData({
              collectorListArray: res.result.StatusList,
              showNoContent: true
            })
          }else{
            _this.setData({
              showNoContent: true
            })
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
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