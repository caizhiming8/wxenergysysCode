// pages/page/repairs/pages/repairMange/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_activeTab: 0,
    newViewPosition: {
      'newRight': 30,
      'newBottom': 160
    },
    responseData: [],
    reqData: {
      'currentPage': 1,
      'pageSize': 10,
      'roleId': 1
    },
    isBottom: false,
    showNoContent: false,
    isShowZhiPai: false,
    isShowXiuGai: false,
    isShowCreatNew: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.data.reqData.status = 1;
    wx.getSystemInfo({
      success: function (e) {
        _this.setData({
          systemView: {
            'windowHeight': e.windowHeight,
            'windowWidth': e.windowWidth
          }
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
    wx.getStorage({
      key: 'ADD_APPLAY',
      success: function (res) {
        if (res) {
          let a = JSON.parse(res.data);
          _this.setData({
            newViewPosition: {
              'newRight': a.right,
              'newBottom': a.bottom
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
    _this.setData({
      'isShowZhiPai': app.globalFun.authDetecte('7-2-2'),
      'isShowXiuGai': app.globalFun.authDetecte('7-2-2'),
      'isShowCreatNew': app.globalFun.authDetecte('7-2-1')
    })
  },

  /* 
   * 下一页
   */
  goGetNextPage() {
    let _this = this;
    if(_this.data.isBottom) {
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
              'isBottom': true
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
    let _this = this;
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
              'isBottom': true
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
   * 切换头部tab
   */
  goChangeTab(e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.index;
    if(_this.data.cur_activeTab == cur_index) {
      return;
    }
    if (cur_index == 1) {
      _this.data.reqData.status = 2;
    } else if (cur_index == 3) {
      _this.data.reqData.status = 3;
    } else if (cur_index == 4) {
      _this.data.reqData.status = 4;
    } else {
      _this.data.reqData.status = 1;
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
              'isBottom': true
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
    } else if (_this.data.cur_activeTab == 1) {
      wx.navigateTo({
        url: `./delegateDetail/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 3) {
      // 查看进度
      wx.navigateTo({
        url: `./lookPlan/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 4) {
      // 查看评价
      wx.navigateTo({
        url: `./lookComment/index?id=${JSON.stringify(cur_info)}`
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
      // 指派维修人员
      wx.navigateTo({
        url: `./assignedPerson/index?id=${JSON.stringify(cur_info)}&type=1`
      })
    } else if (_this.data.cur_activeTab == 1) {
      // 修改维修人员
      wx.navigateTo({
        url: `./assignedPerson/index?id=${JSON.stringify(cur_info)}&type=2`
      })
    } else if(_this.data.cur_activeTab == 3) {
      // 查看进度
      wx.navigateTo({
        url: `./lookPlan/index?id=${JSON.stringify(cur_info)}`
      })
    } else if (_this.data.cur_activeTab == 4) {
      // 查看评价
      wx.navigateTo({
        url: `./lookComment/index?id=${JSON.stringify(cur_info)}`
      })
    }
  },

  /* 
   * 新申请
   */
  goAddProject() {
    wx.navigateTo({
      url: `../../../repairsUser/pages/repairMange/addNewApplay/index`
    })
  },

  /* 
   * 拖动
   */
  goViewTouchMove(e) {
    let _this = this
      , winHeight = this.data.systemView.windowHeight
      , winWidth = this.data.systemView.windowWidth
      , newBottom = _this.data.systemView.windowHeight - e.touches[0].clientY - 22
      , right = 0
      , bottom = 0;
    if (winHeight - newBottom <= 22) {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = winHeight - 22;
    } else if (newBottom <= 0) {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = 0;
    } else {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = _this.data.systemView.windowHeight - e.touches[0].clientY - 22;
    }
    this.setData({
      newViewPosition: {
        'newRight': right,
        'newBottom': bottom
      }
    })
    wx.setStorage({
      key: 'ADD_APPLAY',
      data: JSON.stringify({
        'right': right,
        'bottom': bottom
      })
    })
  }

})