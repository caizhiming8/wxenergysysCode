// pages/page/repairs/pages/repairMange/assignedPerson/index.js
const app = getApp();
const dateObj = new Date();
var curTime = dateObj.getFullYear() + '-' + (Number(dateObj.getMonth()) + 1) + '-' + dateObj.getDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray: [],
    cur_personIndex: 0,
    cur_timeData: curTime,
    reqData: {
      completeTime: curTime,
      login_name: app.globalUserData.User_Info.loginName,
      repairPerson: '',
      repairPersonPhone: '',
      flag: 1,
      id: '',
      type_comment: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_type = options.type
      , cur_info = JSON.parse(options.id);
    console.log(cur_info)
    if (cur_type == 2) {
      wx.setNavigationBarTitle({
        title: '修改人员'
      })
    }
    _this.data.reqData.id = cur_info.id;
    _this.data.reqData.type_comment = cur_info.typeComment;
    _this.data.reqData.projectId = app.globalUserData.User_Info.preprojectId;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsPeopleList()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            id: 0,
            personName: "请选择",
          })
          _this.setData({
            'personArray': res.result.list
          })
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
   * 切换维修人员
   */
  goBindPickerChangePerson(e) {
    let _this = this
      ,cur_index = e.detail.value;
    if(cur_index == _this.data.cur_personIndex) {
      return;
    }
    _this.setData({
      cur_personIndex: cur_index,
      cur_phone: _this.data.personArray[cur_index].phone
    })
    _this.data.reqData.repairPerson = _this.data.personArray[cur_index].id;
    _this.data.reqData.repairPersonPhone = _this.data.personArray[cur_index].phone;
  },

  /* 
   * 输入联系方式
   */
  goInputPhone(e) {
    let _this = this
      ,cur_info = e.detail.value;
    _this.data.reqData.repairPersonPhone = cur_info;
  },

  /* 
   * 切换时间控件
   */
  goBindDateChange(e) {
    let _this = this
      ,cur_info = e.detail.value;
    _this.setData({
      'cur_timeData': cur_info
    })
    _this.data.reqData.completeTime = cur_info;
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this;
    if (!_this.data.reqData.repairPerson) {
      app.globalObj.apiConfig.goShowToast('请选择维修人员', 'none', 1500, true);
      return;
    }
    if (!_this.data.reqData.completeTime) {
      app.globalObj.apiConfig.goShowToast('请选择完成时间', 'none', 1500, true);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsUpdateApplyList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('指派成功', 'none', 1500, true);
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