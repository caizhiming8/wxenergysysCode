// pages/page/electricity/pages/eleDeviceState/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectorList: [],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEleDeViceStateListData({ currentPage: 1, pageSize: 100 })
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          _this.setData({
            'collectorList': res.result.StatusList,
            'showNoContent': true
          })
        } else {
          _this.setData({
            'collectorList': res.result.StatusList,
            'showNoContent': true
          })
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})