// pages/page/my/pages/password.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: {
      'oldPassword': '',
      'password': '',
      'uid': app.globalUserData.User_Info.userId,
      'uproject': app.globalUserData.User_Info.projectId,
      'flag': false
    },
    next_newPas: ''
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

  /* 
    获取新密码输入-触发事件
   */
  getOldPassEnvet(e) {
    let cur_value = e.detail.value;
    this.data.reqData.oldPassword = cur_value;
  },

  getNewPassEnvet(e) {
    let cur_value = e.detail.value;
    this.data.reqData.password = cur_value;
  },

  getNextNewPassEnvet(e) {
    let cur_value = e.detail.value;
    this.data.next_newPas = cur_value;
  },

  /* 
   * 修改密码
   */
  goChangePassword() {
    let _this = this;
    if (!_this.data.reqData.oldPassword) {
      app.globalObj.apiConfig.goShowToast('旧密码不能为空', 'none', 2000, false);
      return;
    }
    if (!_this.data.reqData.password) {
      app.globalObj.apiConfig.goShowToast('新密码不能为空', 'none', 2000, false);
      return;
    }
    if (_this.data.reqData.password != _this.data.next_newPas) {
      app.globalObj.apiConfig.goShowToast('两次密码不一致', 'none', 2000);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getChangePass(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast(res.result, 'none', 2000, false);
          setTimeout(()=> {
            wx.navigateBack({ })
          },2000)
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