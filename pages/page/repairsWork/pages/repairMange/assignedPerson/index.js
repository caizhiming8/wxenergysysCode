// pages/page/repairs/pages/repairMange/assignedPerson/index.js
var datapicker = require('../../../../../../utils/datapicker.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray: [],
    cur_personIndex: 0,
    // 开始时间
    cur_startTimeData:'',
    // 结束时间
    cur_endTimeData:'',
    reqData: {
      deviceId: '',
      startTime: '',
      endTime: '',
      costTime: '',
      deviceused: '',
      costMoney: '',
      flag: 2,
      id: '',
      login_name: app.globalUserData.User_Info.loginName
    },
    dateTimeArray: null,
    dateTimeArray1: null,
    dateTime: null,
    dateTime1: null,
    startYear: 2018,
    endYear: 2050,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_type = JSON.parse(options.id);
    _this.data.reqData.id = cur_type.id;
    _this.data.reqData.userId = cur_type.commitPerson;
    _this.data.reqData.type_comment = cur_type.typeComment;
    _this.data.reqData.projectId = app.globalUserData.User_Info.preprojectId;
    var obj1 = datapicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTimeArray: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateTime: obj1.dateTime
    });
    let dateTime = this.data.dateTime
      , dateTimeArray = this.data.dateTimeArray
      , dateTime1 = this.data.dateTime1
      , dateTimeArray1 = this.data.dateTimeArray1;
    this.data.reqData.startTime = `${dateTimeArray[0][dateTime[0]]}-${dateTimeArray[1][dateTime[1]]}-${dateTimeArray[2][dateTime[2]]} ${dateTimeArray[3][dateTime[3]]}:${dateTimeArray[4][dateTime[4]]}`;
    this.data.reqData.endTime = `${dateTimeArray1[0][dateTime1[0]]}-${dateTimeArray1[1][dateTime1[1]]}-${dateTimeArray1[2][dateTime1[2]]} ${dateTimeArray1[3][dateTime1[3]]}:${dateTimeArray1[4][dateTime1[4]]}`;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /* 
   * 切换开始时间
   */
  goBindStartDateChange(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.setData({
      'cur_startTimeData': cur_info
    })
    _this.data.reqData.startTime = cur_info;
  },
  changeDateTime(e) {
    let cur_val = e.detail.value;
    this.setData({ dateTime: cur_val });
    let dateTime = this.data.dateTime
      , dateTimeArray = this.data.dateTimeArray;
    this.data.reqData.startTime = `${dateTimeArray[0][dateTime[0]]}-${dateTimeArray[1][dateTime[1]]}-${dateTimeArray[2][dateTime[2]]} ${dateTimeArray[3][dateTime[3]]}:${dateTimeArray[4][dateTime[4]]}`
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = datapicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr
    });
  },

  /* 
   * 切换结束时间
   */
  goBindEndDateChange(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.setData({
      'cur_endTimeData': cur_info
    })
    _this.data.reqData.endTime = cur_info;
  },
  changeDateTime2(e) {
    let cur_val = e.detail.value;
    this.setData({ dateTime1: cur_val });
    let dateTime1 = this.data.dateTime1
      , dateTimeArray1 = this.data.dateTimeArray1;
    this.data.reqData.endTime = `${dateTimeArray1[0][dateTime1[0]]}-${dateTimeArray1[1][dateTime1[1]]}-${dateTimeArray1[2][dateTime1[2]]} ${dateTimeArray1[3][dateTime1[3]]}:${dateTimeArray1[4][dateTime1[4]] }`
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = datapicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr
    });
  },

  /* 
   * 切换维修人员
   */
  goBindPickerChangePerson(e) {
    let _this = this
      ,cur_index = e.detail.value;
    if(cur_index == _this.data.cur_personIndex) {
      return;
    }
    _this.setData({
      cur_personIndex: cur_index
    })
    _this.data.reqData.personId = _this.data.personArray[cur_index].id;
  },

  /* 
   * 输入工时
   */
  goInputWorkHour(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.costTime = cur_info;
  },

  /* 
   * 输入配件名称
   */
  goInputPartsName(e) {
    let _this = this
      ,cur_info = e.detail.value;
    _this.data.reqData.deviceused = cur_info;
  },

  /* 
   * 输入金额
   */
  goInputPartsMoney(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.costMoney = cur_info;
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , data = this.data;
    if (!data.reqData.startTime) {
      app.globalObj.apiConfig.goShowToast('开始时间不能为空', 'loading', 15000);
      return;
    }
    if (!data.reqData.endTime) {
      app.globalObj.apiConfig.goShowToast('结束时间不能为空', 'loading', 15000);
      return;
    }
    if (!data.reqData.costTime) {
      app.globalObj.apiConfig.goShowToast('工时不能为空', 'loading', 15000);
      return;
    }
    // if (!data.reqData.deviceused) {
    //   app.globalObj.apiConfig.goShowToast('配件名称不能为空', 'loading', 15000);
    //   return;
    // }
    // if (!data.reqData.costMoney) {
    //   app.globalObj.apiConfig.goShowToast('金额不能为空', 'loading', 15000);
    //   return;
    // }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsUpdateApplyList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('完成维修', 'none', 1500, true);
          setTimeout(() => {
            wx.navigateBack({})
          }, 1500)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
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

  }
})