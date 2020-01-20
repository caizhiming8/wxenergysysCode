// pages/page/energy/pages/quotaContrast/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    responseData: [ ],
    reqData: {
      'depart': '',
      'currentPage': 1,
      'pageSize': 100
    },
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getQuotaContrastDataList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          _this.setData({
            'responseData': res.result.quotaList,
            'showNoContent': true
          })
        }else{
          _this.setData({
            'responseData': []
          })
        }
        app.globalObj.apiConfig.goHideToast();
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
    输入框事件
   */
  goInputEvent(e) {
    let _this = this;
    _this.data.reqData.depart = e.detail.value;
  },

  /* 
    搜索按钮
   */
  go: function () {
    let _this = this;
    if (!_this.data.reqData.depart) {
      return;
    }
    _this.setData({
      'showNoContent': false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getQuotaContrastDataList(_this.data.reqData)
      .then(res => {
        _this.setData({
          'responseData': res.result.quotaList,
          'showNoContent': true
        })
        app.globalObj.apiConfig.goHideToast();
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})