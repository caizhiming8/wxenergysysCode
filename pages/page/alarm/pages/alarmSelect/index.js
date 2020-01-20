// pages/page/alarm/pages/alarmSelect/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowMange: false,
    isShowUser: false,
    isShowWork: false,
    activeSel: 1,
    optionId: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.optionId = options.id;
    this.setData({
      isShowUser: app.globalUserData.User_Info.roleId.indexOf('4')>-1?true:false,
      isShowWork: app.globalUserData.User_Info.roleId.indexOf('7')>-1?true:false
    })
    if(app.globalUserData.User_Info.roleId.indexOf('1')>-1||app.globalUserData.User_Info.roleId.indexOf('2')>-1||app.globalUserData.User_Info.roleId.indexOf('3')>-1) {
      this.setData({
        isShowMange: true
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

  goLookPage(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    if(cur_info == 4) {
      if(_this.data.activeSel == 1) {
        wx.navigateTo({
          // 管理员
          url: `../index?id=${_this.data.optionId}&roleId=1`
          // 普通用户
          // url: '/pages/page/repairsUser/pages/repairMange/index'
          // 工人
          // url: '/pages/page/repairsWork/pages/repairMange/index'
        })
      }else if(_this.data.activeSel == 2) {
        wx.navigateTo({
          // 管理员
          // url: '/pages/page/repairs/pages/repairMange/repairSelect/index'
          // 普通用户
          url: `../index?id=${_this.data.optionId}&roleId=1`
          // 工人
          // url: '/pages/page/repairsWork/pages/repairMange/index'
        })
      }else {
        wx.navigateTo({
          // 管理员
          // url: '/pages/page/repairs/pages/repairMange/repairSelect/index'
          // 普通用户
          // url: '/pages/page/repairsUser/pages/repairMange/index'
          // 工人
          url: `../index?id=${_this.data.optionId}&roleId=7`
        })
      }
    }else {
      _this.setData({
        activeSel: cur_info
      })
    }
  }
})