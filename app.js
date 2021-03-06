//app.js
var apiConfig = require('utils/config.js');
var NumberAnimate = require('utils/timeAdd.js');
var globalFun = require('utils/util.js');
const app = getApp();
App({
  globalObj: {
    'apiConfig': apiConfig,
    'NumberAnimate': NumberAnimate,
    'isIpx': false
  },
  globalFun: {
    'authDetecte': globalFun.authDetection
  },
  globalUserData: {
    'Token': '',
    'User_Info': '',
    'AuthDetecte': []
  },
  onLaunch: function () {
    let _this = this;
    // token 存储
    wx.getStorage({
      key: 'token',
      success(res) {
        _this.globalUserData.Token = res.data;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取手机型号
    wx.getSystemInfo({
      success(res) {
        let modelmes = res.model;
        if (modelmes.indexOf('iPhone X') != -1 || modelmes.indexOf('iPhone XS') != -1 || modelmes.indexOf('iPhone XS Max') != -1 || modelmes.indexOf('iPhone XR') != -1 || modelmes.indexOf('iPhone 11') != -1 || modelmes.indexOf('iPhone 11 Pro') != -1 || modelmes.indexOf('iPhone 11 Pro Max') != -1) {
          _this.globalObj.isIpx = true;
        }
      }
    })
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })
    
  }
})