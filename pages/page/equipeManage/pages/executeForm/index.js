// pages/page/equipeManage/pages/executeForm/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planObj: {},
    responseData: [],
    reqData: {
      result: '',
      id: '',
      code: "",
      deviceList: []
    },
    textareaLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_info = JSON.parse(options.id);
    _this.setData({
      planObj: cur_info
    })
    _this.data.reqData.id = cur_info.id;
    _this.data.reqData.code = cur_info.code;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeExecuteList({ id: cur_info.id})
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          console.log(res)
          res.result.infoList.forEach(item=> {
            item.checked = 1;
          })
          _this.setData({
            'responseData': res.result.infoList
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
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
   * radio 切换
   */
  goRadioChange(e) {
    let _this = this
      , cur_value = e.detail.value;
    let obj = cur_value.split('-');
    let arrIndex = obj[1],
      curValue = obj[0];
    _this.data.responseData[arrIndex].checked = curValue;
    if (curValue == 2) {
      wx.showModal({
        title: '提示',
        content: '是否报修？',
        cancelText: '暂不',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/page/repairsUser/pages/repairMange/addNewApplay/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /* 
   * textarea 文本框的输入
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.result = cur_info;
    _this.setData({
      'textareaLength': cur_info.length
    })
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , cur_obj = this.data.reqData
      , data = this.data;
    if(!cur_obj.result) {
      app.globalObj.apiConfig.goShowToast('请输入检查结果', 'none', 2000, false);
      return;
    }
    data.responseData.forEach(item=> {
      if(!item.checked) {
        app.globalObj.apiConfig.goShowToast('请选择设备状态', 'none', 2000, false);
        return;
      }
    })
    cur_obj.deviceList = JSON.stringify(data.responseData);
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeExecute(cur_obj)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('执行成功', 'none', 2000);
          setTimeout(()=> {
            wx.navigateBack({
              detail: 1
            })
          }, 2000)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  }
})