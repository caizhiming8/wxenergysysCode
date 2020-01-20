// pages/page/alarm/pages/setting/addSet/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDevice: {},
    deviceArrList: [
      {
        typeComment: '请选择告警类型',
        dataType: 0
      }
    ],
    cur_device: 0,
    alarmLevelArrList: [
      {
        degree: 0,
        message: "请选择告警级别"
      }
    ],
    cur_alarmlevel: 0,
    // 开始时间
    cur_startTimeData: '请选择开始时间',
    // 结束时间
    cur_endTimeData: '请选择结束时间',
    reqData: {
      deviceType: 0,
      deviceId: 0,
      systemId: 0,
      dataType: 0,
      maxNum: '',
      minNum: '',
      startTime: '',
      endTime: '',
      degree: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data;
    data.curDevice = JSON.parse(options.id);
    data.reqData.deviceType = data.curDevice.deviceType;
    data.reqData.deviceId = data.curDevice.deviceId;
    data.reqData.systemId = data.curDevice.systemId;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getQueryDeviceWarnTypeList(data.curDevice)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.unshift({
            typeComment: '请选择告警类型',
            dataType: 0
          })
          if (res.result) {
            _this.setData({
              deviceArrList: res.result
            })
          }
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getAlarmAllRank()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.unshift({
            degree: 0,
            message: "请选择告警级别"
          })
          if (res.result) {
            _this.setData({
              alarmLevelArrList: res.result
            })
          }
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
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
   * 切换类型
   */
  goBindPickerChangeType(e) {
    let _this = this
      , cur_value = e.detail.value
      , cur_index = e.target.dataset.id
      , data = this.data;
    if (cur_index == 1) {
      // 选择设备
      if (cur_value == data.cur_device) {
        return;
      }
      _this.setData({
        cur_device: cur_value
      })
      data.reqData.dataType = data.deviceArrList[cur_value].dataType;
    } else if (cur_index == 2) {
      // 选择告警级别
      if (cur_value == data.cur_alarmlevel) {
        return;
      }
      _this.setData({
        cur_alarmlevel: cur_value
      })
      data.reqData.degree = data.alarmLevelArrList[cur_value].degree;
    } else if (cur_index == 3) {
      // 选择开始时间
      _this.setData({
        cur_startTimeData: cur_value
      })
      data.reqData.startTime = cur_value;
    } else if (cur_index == 4) {
      // 选择结束时间
      _this.setData({
        cur_endTimeData: cur_value
      })
      data.reqData.endTime = cur_value;
    }
  },

  /* 
   * 文本输入
   */
  goInputCont(e) {
    let _this = this
      , cur_id = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , cur_data = this.data.reqData;
    if (cur_id == 1) {
      cur_data.maxNum = cur_value;
    } else if (cur_id == 2) {
      cur_data.minNum = cur_value;
    }
  },

  // 提交数据
  goSubmitForm() {
    let _this = this
      , data = this.data
      , reqData = this.data.reqData;
    console.log(reqData)
    if(reqData.dataType == 0) {
      app.globalObj.apiConfig.goShowToast('请选择设备', 'none', 2000, false);
      return;
    }
    if (reqData.maxNum == '') {
      app.globalObj.apiConfig.goShowToast('请填写上限', 'none', 2000, false);
      return;
    }
    if (reqData.minNum == '') {
      app.globalObj.apiConfig.goShowToast('请填写下限', 'none', 2000, false);
      return;
    }
    if (reqData.degree == 0) {
      app.globalObj.apiConfig.goShowToast('请选择告警级别', 'none', 2000, false);
      return;
    }
    if (reqData.startTime == '') {
      app.globalObj.apiConfig.goShowToast('请选择开始时间', 'none', 2000, false);
      return;
    }
    if (reqData.endTime == '') {
      app.globalObj.apiConfig.goShowToast('请选择结束时间', 'none', 2000, false);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAddDeviceWarnList(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast('增加成功', 'none', 2000, false);
          setTimeout(()=> {
            wx.navigateBack({
              detail: 1
            })
          }, 2000)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})