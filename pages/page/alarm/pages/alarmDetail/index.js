// pages/page/alarm/pages/alarmDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDetailInfo: {},
    isShowMange: false,
    isShowWork: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data
      , id = JSON.parse(options.id)
      , roleid = options.roleId;
    _this.setData({
      curDetailInfo: id
    })
    if(id.warningStatus == 2) {
      if(roleid ==7) {
        _this.setData({
          isShowWork: true
        })
      }
    } else if(id.warningStatus == 1) {
      if(roleid !=7) {
        _this.setData({
          isShowMange: true
        })
      }
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

  /* 
   * 设置假告警
   */
  goSetFakeWarning() {
    let _this = this
      , data = this.data;
    wx.showModal({
      title: '提示',
      content: '确定要设置为假告警吗？',
      success(res) {
        if (res.confirm) {
          app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
          app.globalObj.apiConfig.getAlarmUpdateWarningState({ id: data.curDetailInfo.id, flag: 2 })
            .then(res => {
              if (res.success) {
                app.globalObj.apiConfig.goShowToast('状态更改成功', 'none', 1500, false);
                setTimeout(()=> {
                  wx.navigateBack({
                    detail: 1
                  })
                },1500)
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

  /* 
   * 设置告警
   */
  goSetWarning() {
    let _this = this;
    wx.navigateTo({
      url: './setWarn/index?id='+JSON.stringify(_this.data.curDetailInfo),
    })
  },
  /* 
   * 处理
  */
  goSetDispose() {
    let _this = this;
    wx.navigateTo({
      url: '../alarmSelect/index?id='+_this.data.curDetailInfo.id
    })
  }
})