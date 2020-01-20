// pages/page/message/pages/addNew/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前所在项目
    cur_myinproject: app.globalUserData.User_Info.preprojectId,
    // 项目的数组
    personArray: [{
      Id: 0,
      username: '请选择'
    }],
    // 当前接收人
    cur_personIndex: 0,
    // 所有项目数组
    projectArray: [{
      id: -1,
      name: '请选择'
    }],
    // 当前项目
    cur_projectIndex: 0,
    // 当前项目
    cur_projectId: app.globalUserData.User_Info.preprojectId,
    reqData: {
      content: '',
      name: '',
      fromName: app.globalUserData.User_Info.roleName,
      userArray: [],
      // wx_code: '',
      creatUserId: app.globalUserData.User_Info.userId
    },
    textLength: 0,
    checkedPersonArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_type = options.type;
    _this.data.cur_projectId = app.globalUserData.User_Info.preprojectId;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getSystemAllPro()
      .then(res => {
        if (res.success) {
          _this.setData({
            'projectArray': res.result
          })
          let a = _this.data.cur_myinproject;
          res.result.forEach((item, index) => {
            if (item.id == a) {
              _this.setData({
                'cur_projectIndex': index
              })
            }
          })
          app.globalObj.apiConfig.goHideToast();
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getMessageQueryPerson({ project_id: _this.data.cur_myinproject })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.userList.unshift({
            id: 0,
            username: '请选择'
          })
          _this.setData({
            'personArray': res.result.userList
          })
          // _this.data.reqData.uid = res.result.userList[0].Id;
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /* 
   * 切换选择接收人
   */
  goBindPickerChangeSite(e) {
    let _this = this
      , cur_index = e.detail.value
      , data = this.data;
    if (cur_index == data.cur_siteIndex) {
      return;
    }
    if (data.cur_projectId != data.projectArray[data.cur_projectIndex].id) {
      app.globalObj.apiConfig.goShowToast('请选择相同项目用户', 'none', 1500, true);
      return;
    }
    _this.setData({
      cur_personIndex: cur_index
    })
    if(cur_index>0) {
      for(let i = 0; i<data.checkedPersonArr.length; i++) {
        let a = data.checkedPersonArr[i];
        if (a.Id == data.personArray[cur_index].Id) {
          return;
        }
      }
      data.checkedPersonArr.push(data.personArray[cur_index]);
      _this.setData({
        checkedPersonArr: data.checkedPersonArr
      })
    }
  },

  // 删除人员
  goDeleteItemPerson(e) {
    let _this = this
      , data = this.data
      , cur_info = e.currentTarget.dataset.id;
    for (let i = 0; i < data.checkedPersonArr.length; i++) {
      let a = data.checkedPersonArr[i];
      if (cur_info.Id == a.Id) {
        data.checkedPersonArr.splice(i,1)
        break;
      }
    }
    _this.setData({
      checkedPersonArr: data.checkedPersonArr
    })
  },

  /* 
   * 输入联系方式
   */
  goInputPhone(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.name = cur_info;
  },

  /* 
   * 切换接收人所在项目
   */
  goBindPickerChangeArea(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_areaIndex) {
      return;
    }
    if (_this.data.cur_projectId>0&&_this.data.checkedPersonArr.length>0) {
      console.log('不可替换')
    } else {
      _this.data.cur_projectId = _this.data.projectArray[cur_index].id;
    }
    _this.setData({
      cur_projectIndex: cur_index, 
      cur_personIndex: 0
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getMessageQueryPerson({
       project_id: _this.data.projectArray[cur_index].id,
       cruLoginName: app.globalUserData.User_Info.loginName })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.userList.unshift({
            id: 0,
            username: '请选择'
          })
          _this.setData({
            'personArray': res.result.userList
          })
          // _this.data.reqData.uid = res.result.userList[0].Id;
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 输入详细描述
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.content = cur_info;
    _this.setData({
      'textLength': cur_info.length
    })
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , subData = _this.data.reqData;
    if (!subData.name) {
      app.globalObj.apiConfig.goShowToast('请填写消息标题', 'none', 1500, true);
      return;
    }
    if (!subData.content) {
      app.globalObj.apiConfig.goShowToast('请填写详细内容', 'none', 1500, true);
      return;
    }
    if (!_this.data.checkedPersonArr.length) {
      app.globalObj.apiConfig.goShowToast('这里调用给整个系统人发消息的接口', 'none', 1500, true);
      return;
    }
    _this.data.reqData.userArray = JSON.stringify(_this.data.checkedPersonArr);
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getMessageCreatNew(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('发送成功', 'none', 1500, true);
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

  }
})