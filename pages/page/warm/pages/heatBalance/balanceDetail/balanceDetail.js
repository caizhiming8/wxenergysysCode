// pages/page/warm/pages/heatBalance/balanceDetail/balanceDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curInfo: {},
    show: false,
    single: false,
    reqData: {
      'buildingId': '',
      'systemId': '',
      'subsystemId': '',
      'temperature': '',
      'threshold': ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this,
      cur_info = JSON.parse(decodeURIComponent(options.info));
    console.log(cur_info)
    _this.data.reqData.buildingId = cur_info.buildingId;
    _this.data.reqData.systemId = cur_info.systemId;
    _this.data.reqData.subsystemId = cur_info.subsystemId;
    _this.setData({
      'curInfo': cur_info
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

  /* 
    设置阈值
   */
  goClickSetValue() {
    let _this = this;
    _this.setData({
      show: true
    })
  },

  // 设置输入的阈值
  bindReplaceInput: function (e) {
    let cur_value = e.detail.value;
    this.data.reqData.threshold = cur_value;
  },

  // 设置补偿值
  bindReplaceInput2: function (e) {
    let cur_value = e.detail.value;
    this.data.reqData.temperature = cur_value;
  },

  // 点击取消按钮的回调函数
  cancel() {
    this.setData({ show: false })
    this.data.reqData.threshold = '';
    this.data.reqData.temperature = '';
    // this.triggerEvent('cancel')  //triggerEvent触发事件
  },
  // 点击确定按钮的回调函数
  confirm() {
    let _this = this;
    if (!this.data.reqData.threshold) {
      app.globalObj.apiConfig.goShowToast('阈值不能为空', 'none', 2000);
      return;
    } else if (!this.data.reqData.temperature) {
      app.globalObj.apiConfig.goShowToast('补偿值不能为空', 'none', 2000);
      return;
    }
    _this.setData({ show: false })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getHeatingSetThreshold(_this.data.reqData)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          app.globalObj.apiConfig.goShowToast(res.result.result, 'none', 2000);
          setTimeout(()=> {
            wx.navigateBack({
              delta: 1,
            })
          },2000)
        } else {
          app.globalObj.apiConfig.goShowToast(res.result.result, 'none', 2000);
        }
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