// pages/page/repairs/pages/repairMange/lookPlan/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curInfo: {},
    curDetailInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_info = JSON.parse(options.id);
    _this.data.curInfo = cur_info;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsLookDetail({ id: cur_info.id })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          console.log(res)
          _this.setData({
            'curDetailInfo': res.result.list[0]
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
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
   * 去评价
   */
  goPingJia() {
    let _this = this;
    wx.navigateTo({
      url: '../appraiseView/index?id=' + JSON.stringify(_this.data.curInfo)
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

  }
})