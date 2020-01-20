// pages/page/air/pages/airGroup/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resBackDataArray: [
      
    ],
    reqData2: {
      'systemId': 4,
      'subsystemId': 1,
      'flag': 2
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 10000);
    app.globalObj.apiConfig.getHeatingEnergyData(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if(res.success) {
          let a = res.result;
          a.forEach(item => {
            item.state = false;
          })
          _this.setData({
            'resBackDataArray': res.result
          })
        }else{
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

  /* 
    展开事件
   */
  goUnfoldItem(e) {
    let cur_item = e.currentTarget.dataset.id,
      cur_index = e.currentTarget.dataset.index;
    let temp = 'resBackDataArray[' + cur_index + '].state';
    this.setData({
      [temp]: true
    })
  },

  /* 
    收起事件
   */
  goPackUpItem(e) {
    let cur_item = e.currentTarget.dataset.id,
      cur_index = e.currentTarget.dataset.index;
    let temp = 'resBackDataArray[' + cur_index + '].state';
    this.setData({
      [temp]: false
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