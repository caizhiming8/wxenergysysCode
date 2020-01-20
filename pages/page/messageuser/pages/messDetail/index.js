// pages/page/messageuser/pages/messDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoObj: {},
    reqData: {
      id: '',
      projectId: app.globalUserData.User_Info.projectId
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getMessageUpdateState
    let _this = this
      , data = this.data
      , a = JSON.parse(options.id);
      _this.setData({
        infoObj: a
      })
    _this.data.reqData.id = a.id;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getMessageUpdateState(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
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