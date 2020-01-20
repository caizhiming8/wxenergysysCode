// pages/page/repairsUser/pages/repairMange/lookComment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDetailInfo: {

    },
    flag: 0,
    pingjiaText: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_info = JSON.parse(options.id);
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsLookDetail({ id: cur_info.id })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          console.log(res)
          _this.setData({
            'curDetailInfo': res.result.list[0]
          })
          _this['changeColor' + res.result.list[0].result]();
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
   * 指派人员
   */
  goZhiPai(e) {
    let _this = this;
    wx.navigateTo({
      url: `../assignedPerson/index?id=${JSON.stringify(_this.data.cur_info)}`
    })
  },

  /* 
   * 改变评价的星级
   */
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1,
      pingjiaText: '极差'
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2,
      pingjiaText: '失望'
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3,
      pingjiaText: '一般'
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4,
      pingjiaText: '满意'
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5,
      pingjiaText: '惊喜'
    });
  },
})