// pages/page/alarm/pages/alarmDetail/setWarn/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDetailInfo: {},
    personDataList: [
      {
        id: 0,
        name: '请选择指派人员',
        phone: '请选择指派人员'
      }
    ],
    cur_person: 0,
    // 时间
    cur_prodTimeData: '请选择完成时间',
    reqData: {
      flag: 1,
      id: '',
      reason: '',
      personId: '',
      phone: '',
      complete: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data;
    data.curDetailInfo = JSON.parse(options.id);
    data.reqData.id = data.curDetailInfo.id;
    // getAlarmQueryWraningPersons
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmQueryWraningPersons(null)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.unshift(
            {
              id: 0,
              name: '请选择指派人员',
              phone: '请选择指派人员'
            }
          )
          _this.setData({
            personDataList: res.result
          })
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
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_person) {
      return;
    }
    _this.setData({
      cur_person: cur_index
    })
    _this.data.reqData.personId = _this.data.personDataList[cur_index].id;
    _this.data.reqData.phone = _this.data.personDataList[cur_index].phone;
  },

  // 切换时间
  goBindDateChange(e) {
    let _this = this
      , cur_value = e.detail.value
      , cur_data = this.data.reqData
      , data = this.data;
    _this.setData({
      cur_prodTimeData: cur_value
    })
    cur_data.complete = cur_value;
  },

  /* 
   * 输入详细描述
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.reason = cur_info;
  },

  // 提交表单
  goSubmitForm() {
    let _this = this
      , data = this.data
      , reqData = this.data.reqData;
    if (reqData.personId == 0) {
      app.globalObj.apiConfig.goShowToast('请选择', 'none', 1500, true);
      return;
    }
    if (!reqData.reason) {
      app.globalObj.apiConfig.goShowToast('请填写告警原因', 'none', 1500, true);
      return;
    }
    if (!reqData.complete) {
      app.globalObj.apiConfig.goShowToast('请选择完成时间', 'none', 1500, true);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAlarmUpdateWarningState(reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast('状态更改成功', 'none', 1500, false);
          setTimeout(() => {
            wx.navigateBack({
              detail: 2
            })
          }, 1500)
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