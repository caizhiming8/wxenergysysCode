// pages/page/home/pages/homeMenu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curSheBeiState: 0
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
            url: './schoolEle/schoolEle'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "1":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './buildEle/buildEle'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "2":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './subsysEle/subsysEle'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "3":
        if (this.data.curSheBeiState == 1) {
          this.setData({
            curSheBeiState: 0
          })
        } else {
          this.setData({
            curSheBeiState: 1
          })
        }
        break;
      case "4":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './collecteFacility/collecteFacility'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "5":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './eleDeviceState/index'
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