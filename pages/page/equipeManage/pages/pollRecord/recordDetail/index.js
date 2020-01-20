// pages/page/equipeManage/pages/pollRecord/recordDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curObj: {},
    responseData: [],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data;
    data.curObj = JSON.parse(options.id);
    _this.setData({
      curObj: data.curObj
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeExecuteListDetail({ id: data.curObj.id})
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': res.result.infoList,
            'showNoContent': true
          })
        } else {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'showNoContent': true
          })
          // app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})