// pages/page/repairs/pages/repairMange/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_activeTab: 0,
    responseData: [],
    reqData: {
      'currentPage': 1,
      'pageSize': 10,
      'roleId': 7
    },
    isBottom: false,
    'showNoContent': false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.data.reqData.status = 2;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': res.result.list,
            'showNoContent': true
          })
          if (res.result.list.length < _this.data.reqData.pageSize) {
            _this.setData({
              isBottom: true
            })
          }
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
   * 切换头部tab
   */
  goChangeTab(e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.index;
    if(_this.data.cur_activeTab == cur_index) {
      return;
    }
    if (cur_index == 3) {
      _this.data.reqData.status = 3;
    } else if (cur_index == 4) {
      _this.data.reqData.status = 4;
    } else {
      _this.data.reqData.status = 2;
    }
    _this.setData({
      'cur_activeTab': cur_index,
      'responseData': [],
      'isBottom': false,
      'showNoContent': false
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': res.result.list,
            'showNoContent': true
          })
          if (res.result.list.length < _this.data.reqData.pageSize) {
            _this.setData({
              isBottom: true
            })
          }
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 下一页
   */
  goGetNextPage() {
    let _this = this;
    if (_this.data.isBottom) {
      return;
    }
    _this.data.reqData.currentPage++;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': _this.data.responseData.concat(res.result.list),
            'showNoContent': true
          })
          if (res.result.list.length < _this.data.reqData.pageSize) {
            _this.setData({
              isBottom: true
            })
          }
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 查看详情
   */
  goLookDetail(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    if (_this.data.cur_activeTab == 0) {
      wx.navigateTo({
        url: `./repairsDetail/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 4) {
      // 评价详情
      wx.navigateTo({
        url: `./delegateDetail/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 3) {
      // 已完成-查看详情
      wx.navigateTo({
        url: `./lookPlan/index?id=${JSON.stringify(cur_info)}`
      })
    }
  },

  /* 
   * 指派人员
   */
  goAssignedPersonnel(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    if (_this.data.cur_activeTab == 0) {
      // 开始维修
      wx.navigateTo({
        url: `./assignedPerson/index?id=${JSON.stringify(cur_info)}&type=1`
      })
    } else if (_this.data.cur_activeTab == 1) {
      // 修改维修人员
      wx.navigateTo({
        url: `./assignedPerson/index?id=${JSON.stringify(cur_info)}&type=2`
      })
    } else if(_this.data.cur_activeTab == 3) {
      // 已完成-查看详情
      wx.navigateTo({
        url: `./lookPlan/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 4) {
      // 已评价-评价详情
      wx.navigateTo({
        url: `./delegateDetail/index?id=${JSON.stringify(cur_info)}`
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})