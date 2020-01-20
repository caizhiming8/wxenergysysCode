// pages/page/my/pages/switchProject/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    responseData: [],
    curActive: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getSystemAllPro()
      .then(res => {
        if (res.success) {
          _this.setData({
            'responseData': res.result
          })
          let a = app.globalUserData.User_Info.preprojectId;
          res.result.forEach((item,index)=> {
            if(item.id == a) {
              _this.setData({
                'curActive': index
              })
            }
          })
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

  // 切换项目
  goSwitchProject(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id
      , cur_index = e.currentTarget.dataset.index;
    if (_this.data.curActive == cur_index) {
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getChangeSystem({ 'projectId': cur_info.id })
      .then(res => {
        if (res.success) {
          app.globalUserData.User_Info.preprojectId = cur_info.id;
          _this.setData({
            curActive: cur_index
          })
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
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