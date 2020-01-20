// pages/tabBar/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    isIpx: app.globalObj.isIpx ? true : false,
    //这里只做tab名和显示图标
    items: [
      {
        "text": "首页",
        "iconPath": "/images/icon_home_nor@2x.png",
        "selectedIconPath": "/images/icon_home_set@2x.png",
        "showMark": false,
        "num": 0
      },
      {
        "text": "告警",
        "iconPath": "/images/icon_gaojing_nor@2x.png",
        "selectedIconPath": "/images/icon_gaojing_set@2x.png",
        "showMark": true,
        "num": 0,
        'auth': '1-5,2-3,3-6,5-3-1'
      },
      {
        "text": "消息",
        "iconPath": "/images/icon_xiaoxi_nor.png",
        "selectedIconPath": "/images/icon_xiaoxi_nor.png",
        "showMark": false,
        "showMark2": true,
        "num": 0,
        'auth': '11'
      },
      {
        "text": "我的",
        "iconPath": "/images/icon_personal_nor@2x.png",
        "selectedIconPath": "/images/icon_personal_set@2x.png",
        "showMark": false,
        "num": 0
      }
    ],
    numTimer: null
  },
  swichNav: function (e) {
    let _this = this
      , cur_info = e.currentTarget.dataset;
    if (this.data.currentTab === cur_info.current) {
      return false;
    } else {
      if (cur_info.current == 1) {
        let a = cur_info.auth.split(',');
        for(let i =0; i<a.length; i++) {
          if(app.globalFun.authDetecte(a[i])) {
            wx.navigateTo({
              url: '../alarm/alarm',
            })
            return;
          }
        }
        app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
      } else if (cur_info.current == 2) {
        if(app.globalFun.authDetecte(cur_info.auth)) {
          if (app.globalUserData.User_Info.projectId == 1) {
            wx.navigateTo({
              url: '../../page/message/pages/index',
            })
          }else {
            wx.navigateTo({
              url: '../../page/messageuser/pages/index',
            })
          }
        }else {
          app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
        }
      } else {
        _this.setData({
          currentTab: cur_info.current
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (app.globalUserData.Token) {
      app.globalObj.apiConfig.getAlarmAllNum(null)
        .then(res => {
          if (res.success) {
            let a = 'items[1].num'
              , b = 'items[2].num';
            if (res.result.list.length > 0) {
              _this.setData({
                [a]: res.result.all.num,
                [b]: res.result.all.num
              })
            }else {
              _this.setData({
                [a]: 0,
                [b]: 0
              })
            }
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else {
      setTimeout(() => {
        app.globalObj.apiConfig.getAlarmAllNum(null)
          .then(res => {
            if (res.success) {
              let a = 'items[1].num'
                , b = 'items[2].num';
              if (res.result.list.length > 0) {
                _this.setData({
                  [a]: res.result.all.num,
                  [b]: res.result.all.num
                })
              }else {
                _this.setData({
                  [a]: 0,
                  [b]: 0
                })
              }
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      }, 2000)
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

  },

  onMyEvent(e) {
    console.log(e)
  }
})