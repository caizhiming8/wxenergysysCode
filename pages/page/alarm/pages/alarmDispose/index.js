// pages/page/alarm/pages/alarmDispose/index.js
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
      flag: 3,
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
    data.reqData.id = options.id;
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
   * 输入详细描述
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.solution = cur_info;
  },

  /* 
   * 输入详细描述
   */
  goInputTextareaResult(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.result = cur_info;
  },

  // 提交表单
  goSubmitForm() {
    let _this = this
      , data = this.data
      , reqData = this.data.reqData;
    if (!reqData.solution) {
      app.globalObj.apiConfig.goShowToast('请输入处理方法', 'none', 1500, true);
      return;
    }
    if (!reqData.result) {
      app.globalObj.apiConfig.goShowToast('请输入处理结果', 'none', 1500, true);
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