// pages/page/equipeManage/pages/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRecordIndex: 0,
    currentPollIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 进入子菜单对应的页面
  goSubitemMenuPage(e) {
    let cur_info = e.currentTarget.dataset;
    switch (cur_info.index) {
      case "0":
        if (this.data.currentRecordIndex == 1) {
          this.setData({
            currentRecordIndex: 0
          })
        } else {
          this.setData({
            currentRecordIndex: 1
          })
        }
        break;
      case "1":
        if (this.data.currentPollIndex == 1) {
          this.setData({
            currentPollIndex: 0
          })
        } else {
          this.setData({
            currentPollIndex: 1
          })
        }
        break;
      case "2":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './equipeQuery/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "3":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './equipeIn/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "4":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './equipeProportion/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "5":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './pollTable/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "6":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './pollRecord/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
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

  }
})