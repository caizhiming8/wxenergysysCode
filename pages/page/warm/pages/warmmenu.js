// pages/page/warm/pages/warmmenu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRoomIndex: 0,
    currentBuildIndex: 0
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

  },

  // 进入子菜单对应的页面
  goSubitemMenuPage(e) {
    let cur_info = e.currentTarget.dataset;
    switch (cur_info.index) {
      case "0":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './heatSource/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "1":
        if (this.data.currentRoomIndex == 1) {
          this.setData({
            currentRoomIndex: 0
          })
        } else {
          this.setData({
            currentRoomIndex: 1
          })
        }
        // wx.navigateTo({
        //   url: './heatExchange/index'
        // })
        break;
      case "2":
        if (this.data.currentBuildIndex == 1) {
          this.setData({
            currentBuildIndex: 0
          })
        } else {
          this.setData({
            currentBuildIndex: 1
          })
        }
        break;
      case "3":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './heatBalance/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "4":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './contactWay/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "5":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './heatExchange/heatStation/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "6":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './heatExchange/heatStationData/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "7":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './buildWarm/heatBuildRealData/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "8":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './buildWarm/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
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