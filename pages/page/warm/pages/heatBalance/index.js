// pages/page/warm/pages/heatBalance/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    responseData2: [],
    responseData: [],
    reqData: {
      'currentPage': 1,
      'pageSize': 50,
      'buildingId': ''
    },
    systemArray: [
      {
        buildingId: 0,
        buildingName: '请选择系统',
      }
    ],
    // 当前系统
    cur_index: 0,
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getHeatingSystemList(null)
      .then(res => {
        if (res.success) {
          res.result.list.unshift({
            buildingId: 0,
            buildingName: '请选择系统',
          })
          _this.setData({
            'systemArray': res.result.list,
            'showNoContent': true
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
        app.globalObj.apiConfig.goHideToast();
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
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getHeatingGridBalance(_this.data.reqData)
      .then(res => {
        if(res.success) {
          res.result.list.forEach(item => {
            if (Number(item.dataValue) - Number(item.temperature == undefined ? 1 : item.temperature) - Number(item.secondtem) >= Math.abs(Number(item.threshold == undefined ? 1 : item.threshold))) {
              // 高
              item.state = 1;
            } else if (Number(item.dataValue) - Number(item.temperature == undefined ? 1 : item.temperature) - Number(item.secondtem) <= -(Math.abs(Number(item.threshold == undefined ? 1 : item.threshold)))) {
              // 底
              item.state = 2;
            } else {
              // 正常
              item.state = 3;
            }
          })
          _this.setData({
            'responseData': res.result.list,
            'showNoContent': true
          })
        }else{
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
        app.globalObj.apiConfig.goHideToast();
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 查看列表详情
   */
  goClickItemDetail(e) {
    let cur_index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `./balanceDetail/balanceDetail?info=${encodeURIComponent(JSON.stringify(cur_index))}`,
    })
  },

  // 输入框输入的内容
  goInputInfo(e) {
    console.log(e)
  },

  // 切换系统
  bindPickerChange(e) {
    console.log(e)
    let _this = this,
      cur_index = e.detail.value;
    if (_this.data.cur_index == cur_index) {
      return;
    }
    _this.setData({
      'cur_index': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    _this.data.reqData.buildingId = _this.data.systemArray[cur_index].buildingId ? _this.data.systemArray[cur_index].buildingId: '';
    app.globalObj.apiConfig.getHeatingGridBalance(_this.data.reqData)
      .then(res => {
        if (res.success) {
          res.result.list.forEach(item => {
            if (Number(item.dataValue) - Number(item.temperature == undefined ? 1 : item.temperature) - Number(item.secondtem) >= Math.abs(Number(item.threshold == undefined ? 1 : item.threshold))) {
              // 高
              item.state = 1;
            } else if (Number(item.dataValue) - Number(item.temperature == undefined ? 1 : item.temperature) - Number(item.secondtem) <= -(Math.abs(Number(item.threshold == undefined ? 1 : item.threshold)))) {
              // 底
              item.state = 2;
            } else {
              // 正常
              item.state = 3;
            }
          })
          _this.setData({
            'responseData': res.result.list,
            'showNoContent': true
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
        app.globalObj.apiConfig.goHideToast();
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})