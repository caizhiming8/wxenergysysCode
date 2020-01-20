// pages/page/energy/pages/energyMenu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRoomIndex: 0,
    currentSubmenu: 0,
    menuArrayList1: [ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getQuotaRankUnitList(null)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          _this.setData({
            'menuArrayList1': res.result.infos
          })
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000,false);
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

  /* 
   * goSubitemMenuPage
   */
  goSubitemMenuPage(e) {
    let _this = this,
      cur_info = e.currentTarget.dataset;
    switch (cur_info.index) {
      case "0":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          wx.navigateTo({
            url: './quotaContrast/index'
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
      case "1":
        if(app.globalFun.authDetecte(cur_info.auth)) {
          if (_this.data.currentRoomIndex == 1) {
            _this.setData({
              currentRoomIndex: 0
            })
          } else {
            _this.setData({
              currentRoomIndex: 1
            })
          }
          _this.setData({
            currentSubmenu: 0
          })
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
        break;
    }
  },

  /* 
   子菜单展开
   */
  goUnfoldSubitemMenu(e) {
    let _this = this,
      cur_info = e.currentTarget.dataset;
      console.log(e)
    if (cur_info.index == _this.data.currentSubmenu) {
      _this.setData({
        currentSubmenu: 0
      })
    }else{
      _this.setData({
        currentSubmenu: cur_info.index
      })
    }
  },

  /* 
   子菜单子菜单的页面
   */
  goSubSubMenuItem(e) {
    let cur_info = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `./rankUnit/index?info=${JSON.stringify(cur_info)}`
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