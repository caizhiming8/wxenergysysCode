// pages/tabBar/my/my.js
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow2: false,
    showItem2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'userInfo': app.globalUserData.User_Info
    })
    // console.log(app.globalUserData.User_Info)
  },

  pageLifetimes: {
    show: function () {
      let _this = this;
      let a = setInterval(() => {
        _this.data.isShow2 = true;
        _this.setData({
          'userInfo': app.globalUserData.User_Info
        })
        if (app.globalUserData.User_Info.projectId == 1) {
          _this.setData({
            'showItem2': true
          })
        }
        if(app.globalUserData.User_Info) {
          clearInterval(a)
        }
      },1000)
    }
  },

  methods: {
    /* 
     * 进入下一个页面事件
     */
    goNextPage(e) {
      let _this = this,
        cur_index = e.currentTarget.dataset.index;
      switch (cur_index) {
        case '1':
          wx.navigateTo({
            url: '/pages/page/my/pages/password'
          })
          break;
        case '2':
          wx.navigateTo({
            url: '/pages/page/my/pages/switchProject/index'
          })
          break;
        case '3':
          app.globalObj.apiConfig.goShowToast('清除成功！', 'none', 1500, false);
          break;
        case '4':
          wx.navigateTo({
            url: '/pages/page/my/pages/benefit/index'
          })
          break;
      }
    },

    // 退出系统
    goOutSystem() {
      let _this = this;
      wx.showModal({
        title: '提示',
        content: '是否退出？',
        success(res) {
          if (res.confirm) {
            app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
            app.globalObj.apiConfig.getUserOutSystem({ 'loginName': _this.data.userInfo.loginName })
              .then(res => {
                if (res.success) {
                  wx.removeStorage({
                    key: 'token',
                    success(res) {
                      console.log(res)
                    }
                  })
                  wx.reLaunch({
                    url: '../../page/login/index'
                  })
                } else {
                  app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
                }
              })
              .catch(err => {
                app.globalObj.apiConfig.goHideToast();
                console.log(err)
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    // 获取权限
    getRoot() {
      let _this = this;
      const templateId = 'SpvxeGwYyz-MR1eUZvvru5QiSrJgEmlkb7NxUwz-oQk'; // 设备告警提醒
      const templateId2 = '4hT_W25HleQ_Oj4fCQih4mlW1jCsKpc0wdGyi2Tqkr0'; // 收到留言通知
      const templateId3 = '65sH61Z0YcMroBPYB_pr85oUsXvgzRbnbaiWJJDFPuw'; // 告警处理通知
      wx.requestSubscribeMessage({
        tmplIds: [templateId, templateId2, templateId3],
        success(res) {
          wx.redirectTo({
            url: '../../tabBar/index/index'
          })
        },
        fail(res) {
          wx.showToast({
            title: '订阅失败'
          })
        },
        complete(res) {
          console.log(res)
        }
      })
    }
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