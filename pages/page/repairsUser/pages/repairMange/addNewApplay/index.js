// pages/page/repairsUser/pages/repairMange/addNewApplay/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 项目的数组
    personArray: [{
      id: 0,
      label: '请选择'
    }],
    // 设备名称的数组
    deviceNameArray: [{
      deviceId: 0,
      name: '请选择'
    }],
    areasArray: [ ],
    // 地点数组
    siteArray: [{
      id: -1,
      label: '请选择'
    }],
    // 类型的数组
    typeArray: [ ],
    // 当前区域
    cur_personIndex: 0,
    // 当前地点
    cur_siteIndex: 0,
    cur_areaIndex: 0,
    cur_typeIndex: 0,
    // 当前设备名称
    cur_deviceNameIndex: 0,
    reqData: {
      areaId: '',
      siteId: '',
      projectId: '',
      typeId: '',
      deviceId: '',
      phone: '',
      repairImg: '',
      detail: '',
      userId: app.globalUserData.User_Info.userId
    },
    textLength: 0,
    upLoadSuccess: false,
    isShowManualInput: false,
    isShowDeviceName: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , cur_type = options.type;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsAllAreasList(null)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            id: 0,
            label: '请选择'
          })
          _this.setData({
            'areasArray': res.result.list
          })
          _this.data.reqData.areaId = res.result.list[0].id;
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getRepairsAllTypeList(null)
      .then(res => {
        console.log(res)
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            value: 0,
            label: '请选择'
          })
          _this.setData({
            'typeArray': res.result.list
          })
          _this.data.reqData.projectId = res.result.list[0].value;
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
   * 放大图片
   */

  /* 
   * 切换项目
   */
  goBindPickerChangePerson(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_personIndex) {
      return;
    }
    _this.setData({
      cur_personIndex: cur_index
    })
    _this.data.reqData.projectId = _this.data.personArray[cur_index].value;
    if(_this.data.personArray[cur_index].flag == 1) {
      _this.setData({
        isShowDeviceName: true
      })
    }else {
      _this.setData({
        isShowDeviceName: false
      })
      _this.data.reqData.deviceId = '';
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsQueryDeviceName({ deviceType: _this.data.personArray[cur_index].deviceType })
      .then(res => {
        console.log(res)
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            value: 0,
            name: '请选择'
          })
          _this.setData({
            'deviceNameArray': res.result.list
          })
          // _this.data.reqData.projectId = res.result.list[0].value;
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
   * 切换设备名称
   */
  goBindPickerDeviceName(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_personIndex) {
      return;
    }
    _this.setData({
      cur_deviceNameIndex: cur_index
    })
    _this.data.reqData.deviceId = _this.data.deviceNameArray[cur_index].deviceId;
  },

  /* 
   * 切换地点
   */
  goBindPickerChangeSite(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_siteIndex) {
      return;
    }
    _this.setData({
      cur_siteIndex: cur_index
    })
    if(cur_index == 0) {
      _this.data.reqData.siteId = '';
    }else {
      _this.data.reqData.siteId = _this.data.siteArray[cur_index].label;
    }
    if(_this.data.siteArray[cur_index].id == -2) {
      _this.setData({
        'isShowManualInput': true
      })
    } else {
      _this.setData({
        'isShowManualInput': false
      })
    }
  },

  /* 
   * 输入地点
   */
  goInputLocation(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.siteId = cur_info;
  },

  /* 
   * 切换区域
   */
  goBindPickerChangeArea(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_areaIndex) {
      return;
    }
    _this.setData({
      cur_areaIndex: cur_index
    })
    _this.data.reqData.areaId = _this.data.areasArray[cur_index].id;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsAllSiteList({ buildingId: _this.data.areasArray[cur_index].id})
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            id: 0,
            label: '请选择'
          });
          res.result.list.push({
            id: '-2',
            label: '其他地点'
          });
          _this.setData({
            'siteArray': res.result.list
          })
          _this.data.reqData.siteId = res.result.list[0].id;
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
   * 切换类型
   */
  goBindPickerChangeType(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_typeIndex) {
      return;
    }
    _this.setData({
      cur_typeIndex: cur_index
    })
    _this.data.reqData.typeId = _this.data.typeArray[cur_index].value;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsAllItemsList({ typeId: _this.data.typeArray[cur_index].value })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            value: 0,
            label: '请选择'
          })
          _this.setData({
            'personArray': res.result.list
          })
          _this.data.reqData.projectId = res.result.list[0].value;
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 上传图片
  goUpLoadImg() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const imgSize = res.tempFiles[0].size;
        if (imgSize > 5242880) {
          app.globalObj.apiConfig.goShowToast('图片大小已超10M', 'none', 1500, true);
        } else {
          wx.uploadFile({
            url: app.globalObj.apiConfig.testHost + '/repair/uploadPicture', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'Authorization': app.globalUserData.Token
            },
            success(res) {
              try{
                let cur_info = JSON.parse(res.data);
                if (cur_info.success) {
                  _this.data.reqData.repairImg = cur_info.result.filename;
                  _this.setData({
                    'uploadImgSrc': 'data:image/jpeg;base64,'
                      + wx.getFileSystemManager().readFileSync(tempFilePaths[0], 'base64'),
                    'upLoadSuccess': true
                  })
                }
              }catch(err) {
                console.log(err)
                app.globalObj.apiConfig.goShowToast('出错了', 'none', 1500, true);
              }
            },
            fail(res) {
              app.globalObj.apiConfig.goShowToast('上传失败', 'none', 1500, true);
            }
          })
        }
      }
    })
  },

  // 放大图片
  goBigImg(e) {
    console.log(e)
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    wx.previewImage({
      urls: [cur_info]
    })
  },

  // 删除图片
  goDeleteImg(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    _this.setData({
      'uploadImgSrc': '',
      'upLoadSuccess': false
    })
    _this.data.reqData.repairImg = '';
  },

  /* 
   * 输入联系方式
   */
  goInputPhone(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.phone = cur_info;
  },

  /* 
   * 输入详细描述
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.detail = cur_info;
    _this.setData({
      'textLength': cur_info.length
    })
  },

  /* 
   * 切换时间控件
   */
  goBindDateChange(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.setData({
      'cur_timeData': cur_info
    })
    _this.data.reqData.finishedData = cur_info;
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , subData = _this.data.reqData;
    if (!subData.areaId) {
      app.globalObj.apiConfig.goShowToast('请选择区域', 'none', 1500, true);
      return;
    }
    if (subData.siteId < 0) {
      app.globalObj.apiConfig.goShowToast('请选择地点', 'none', 1500, true);
      return;
    }
    if (!subData.typeId) {
      app.globalObj.apiConfig.goShowToast('请选择类型', 'none', 1500, true);
      return;
    }
    if (!subData.projectId) {
      app.globalObj.apiConfig.goShowToast('请选择项目', 'none', 1500, true);
      return;
    }
    if (!subData.phone) {
      app.globalObj.apiConfig.goShowToast('请填写联系电话', 'none', 1500, true);
      return;
    }
    // console.log(_this.data.reqData)
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsNewApplay(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('申请成功', 'none', 1500, true);
          setTimeout(()=> {
            wx.navigateBack({})
          },1500)
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