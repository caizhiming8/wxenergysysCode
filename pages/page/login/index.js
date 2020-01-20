// pages/page/login/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: {
      'username': '',
      'password': ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
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
   * 输入用户名
   */
  goInputUserName(e) {
    let _this = this,
      cur_val = e.detail.value;
    _this.data.reqData.username = cur_val;
  },

  /* 
   * 输入密码
   */
  goInputPass(e) {
    let _this = this,
      cur_val = e.detail.value;
    _this.data.reqData.password = cur_val;
  },

  /* 
   * 用户登录
   */
  goUserLogin() {
    let _this = this;
    if(!_this.data.reqData.username) {
      app.globalObj.apiConfig.goShowToast('用户名不能为空', 'none', 1500);
      return;
    }
    if (!_this.data.reqData.password) {
      app.globalObj.apiConfig.goShowToast('密码不能为空', 'none', 1500);
      return;
    }
    wx.login({
      success(res) {
        if (res.code) {
          _this.data.reqData.code = res.code;
          app.globalObj.apiConfig.getUserLogin(_this.data.reqData)
            .then(res => {
              if(res.success) {
                wx.showModal({
                  title: '权限获取',
                  content: '允许获取接收订阅消息通知权限？',
                  success(res) {
                    if (res.confirm) {
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
                          wx.redirectTo({
                            url: '../../tabBar/index/index'
                          })
                        },
                        complete(res) {
                          console.log(res)
                        }
                      })
                    } else if (res.cancel) {
                      wx.redirectTo({
                        url: '../../tabBar/index/index'
                      })
                      console.log('用户点击取消');
                    }
                  }
                })
              }else{
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
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
        if (err.errMsg == "login:fail getaddrinfo ENOTFOUND servicewechat.com servicewechat.com:443") {

        }
      }
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