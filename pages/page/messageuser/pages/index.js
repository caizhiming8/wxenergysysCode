// pages/page/messageuser/pages/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: app.globalObj.isIpx ? true : false,
    newViewPosition: {
      'newRight': 30,
      'newBottom': 160
    },
    responceData: [],
    showAddBtn: app.globalUserData.User_Info.projectId == 1 ? true : false,
    activeNav: 1,
    reqData: {
      preprojectId: app.globalUserData.User_Info.projectId,
      projectId: app.globalUserData.User_Info.preprojectId,
      login_name: app.globalUserData.User_Info.loginName,
    },
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if(options.options) {
      if(options.options == 2) {
        _this.setData({
          activeNav: 2,
          responceData: [],
          showNoContent: false
        })
      }else {
        _this.setData({
          activeNav: 1,
          responceData: [],
          showNoContent: false
        })
      }
      _this.onShow();
    }
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
    let _this = this
      , data = this.data;
    if(app.globalUserData.Token) {
      _this.getInfoData();
    }else {
      wx.login({
        success(res) {
          if (res.code) {
            app.globalObj.apiConfig.getUserWXLogin({ 'code': res.code })
              .then(res => {
                if (res.success) {
                  if (res.result == 'unbind') {
                    app.globalObj.apiConfig.goHideToast();
                    // 去绑定
                    wx.redirectTo({
                      url: '../../page/login/index'
                    })
                  } else {
                    app.globalUserData.User_Info = res.result;
                    app.globalUserData.AuthDetecte = res.result.pagelist;
                    _this.onShow();
                  }
                } else {
                  app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
                }
              })
              .catch(err => {
                app.globalObj.apiConfig.goHideToast();
                console.log(err)
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail(err) {
          app.globalObj.apiConfig.goHideToast();
          if (err.errMsg == "login:fail getaddrinfo ENOTFOUND servicewechat.com servicewechat.com:443") {

          }
        }
      })
    }
  },

  /* 
   * 查看详情
   */
  goLookDetail(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/page/alarm/pages/alarmDetail/index?id=${JSON.stringify(cur_info)}`
    })
  },

  // 查看我的消息详情
  goLookMyInfoDetail(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `./messDetail/index?id=${JSON.stringify(cur_info)}`
    })
  },

  /* 
   * 新建消息
   */
  goAddProject() {
    wx.navigateTo({
      url: `./addNew/index`
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
  },

  // 底部按钮
  goTabPage(e) {
    let _this = this
      , cur_value = e.currentTarget.dataset.id
      , data = this.data;
    if (cur_value == data.activeNav) {
      return;
    }
    _this.setData({
      activeNav: cur_value,
      responceData: [],
      showNoContent: false
    })
    _this.getInfoData();
  },

  // 获取消息列表
  getInfoData() {
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    if (data.activeNav == 1) {
      // 告警消息
      app.globalObj.apiConfig.getMessageWarnNotify(data.reqData)
        .then(res => {
          if (res.success) {
            app.globalObj.apiConfig.goHideToast();
            _this.setData({
              'responceData': res.result.messageList,
              'showNoContent': true
            })
          } else {
            _this.setData({
              'responceData': [],
              'showNoContent': true
            })
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          _this.setData({
            'responceData': [],
            'showNoContent': true
          })
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else {
      // 我的消息
      app.globalObj.apiConfig.getMessageList_receive({ projectId: app.globalUserData.User_Info.preprojectId, login_name: app.globalUserData.User_Info.loginName })
        .then(res => {
          if (res.success) {
            app.globalObj.apiConfig.goHideToast();
            _this.setData({
              'responceData': res.result.messageList,
              'showNoContent': true
            })
          } else {
            _this.setData({
              'responceData': [],
              'showNoContent': true
            })
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          _this.setData({
            'responceData': [],
            'showNoContent': true
          })
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
  }
})