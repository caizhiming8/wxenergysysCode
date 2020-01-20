// pages/page/equipeManage/pages/equipeIn/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemArrList: [
      {
        name: '选择系统',
        systemId: 0
      }
    ],
    cur_system: 0,
    subSystemArrList: [
      {
        name: '选择归属子系统',
        id: 0
      }
    ],
    cur_subSystem: 0,
    checkPersonArrList: [
      {
        username: '选择责任人',
        id: 0
      }
    ],
    cur_person: 0,
    deviceTypeArrList: [
      {
        device_type: 0,
        type_name: "选择产品类型"
      }
    ],
    cur_deviceType: 0,
    buildingArrList: [
      {
        buildId: 0,
        buildName: "选择安装楼宇"
      }
    ],
    cur_building: 0,
    floorArrList: [
      {
        floor_id: 0,
        floor_name: "选择安装楼层"
      }
    ],
    cur_floor: 0,
    roomArrList: [
      {
        roomId: 0,
        roomName: "选择安装房间"
      }
    ],
    cur_room: 0,
    showSubSystem: false,
    // 生产日期
    cur_prodTimeData: '',
    // 安装时间
    cur_installTimeData: '',
    // 开始使用时间
    cur_startTimeData: '',
    // 结束使用时间
    cur_endTimeData: '',
    reqData: {
      code: '',
      name: '',
      system_id: '',
      id: '',
      device_type: '',
      manufacturer: '',
      model: '',
      pro_date: '',
      inst_date: '',
      life_start: '',
      life_end: '',
      person_liable: '',
      phone: '',
      assets_attribution: '',
      building_id: '',
      floor_id: '',
      room_id: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.getAllSystemList()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.unshift({
            name: '选择系统',
            systemId: 0
          })
          _this.setData({
            'systemArrList': res.result
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    // 楼宇
    app.globalObj.apiConfig.getAllBuildingList()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.buildsList.unshift({
            buildName: '选择安装楼宇',
            buildId: 0
          })
          _this.setData({
            'buildingArrList': res.result.buildsList
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getEquipeUserList()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.list.unshift({
            username: '选择巡检人',
            id: 0
          })
          _this.setData({
            'checkPersonArrList': res.result.list
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getAllDeviceList()
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.deviceTypeList.unshift({
            device_type: 0,
            type_name: "选择产品类型"
          })
          _this.setData({
            deviceTypeArrList: res.result.deviceTypeList
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
   * 文本框的输入事件
   */
  goInputText(e) {
    let _this = this
      , cur_id = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , cur_data = this.data.reqData;
    if (cur_id == 1) {
      // 编码
      cur_data.code = cur_value;
    } else if (cur_id == 2) {
      // 名称
      cur_data.name = cur_value;
    } else if (cur_id == 3) {
      // 型号
      cur_data.model = cur_value;
    } else if (cur_id == 4) {
      // 联系方式
      cur_data.phone = cur_value;
    } else if (cur_id == 5) {
      // 资产归属
      cur_data.assets_attribution = cur_value;
    } else if (cur_id == 6) {
      // 生产厂家
      cur_data.manufacturer = cur_value;
    }
  },

  /* 
   * 模态框的选择变化事件
   */
  goBindDateChange(e) {
    let _this = this
      , cur_id = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , cur_data = this.data.reqData
      , data = this.data;
    if (cur_id == 1) {
      // 归属系统
      if (cur_value == _this.data.cur_system) {
        return;
      }
      _this.setData({
        cur_system: cur_value,
        cur_subSystem: 0,
        showSubSystem: data.systemArrList[cur_value].children ? true : false
      })
      if (data.systemArrList[cur_value].children) {
        if (data.systemArrList[cur_value].children[0].name != '选择归属子系统') {
          data.systemArrList[cur_value].children.unshift({
            name: '选择归属子系统',
            id: 0
          })
        }
        _this.setData({
          'subSystemArrList': data.systemArrList[cur_value].children
        })
      }
      cur_data.system_id = cur_value > 0 ? data.systemArrList[cur_value].systemId : '';
      cur_data.id = '';
    } else if (cur_id == 2) {
      // 归属子系统
      if (cur_value == _this.data.cur_subSystem) {
        return;
      }
      _this.setData({
        'cur_subSystem': cur_value
      })
      cur_data.id = cur_value > 0 ? data.subSystemArrList[cur_value].subsystem_id : '';
    } else if (cur_id == 3) {
      // 产品类型
      if (cur_value == _this.data.cur_deviceType) {
        return;
      }
      _this.setData({
        cur_deviceType: cur_value
      })
      cur_data.device_type = cur_value > 0 ? data.deviceTypeArrList[cur_value].device_type : '';
    } else if (cur_id == 4) {
      // 生产日期
      _this.setData({
        cur_prodTimeData: cur_value
      })
      cur_data.pro_date = cur_value;
    } else if (cur_id == 5) {
      // 安装日期
      _this.setData({
        cur_installTimeData: cur_value
      })
      cur_data.inst_date = cur_value;
    } else if (cur_id == 6) {
      // 安装楼宇
      if (cur_value == _this.data.cur_building) {
        return;
      }
      _this.setData({
        cur_building: cur_value,
        floorArrList: [
          {
            floor_id: 0,
            floor_name: "选择安装楼层"
          }
        ],
        cur_floor: 0, 
        roomArrList: [
          {
            roomId: 0,
            roomName: "选择安装房间"
          }
        ],
        cur_room: 0
      })
      cur_data.building_id = cur_value > 0 ? data.buildingArrList[cur_value].buildId : '';
      _this.getFloorDataList();
    } else if (cur_id == 7) {
      // 安装楼层
      if (cur_value == _this.data.cur_floor) {
        return;
      }
      _this.setData({
        cur_floor: cur_value,
        roomArrList: [
          {
            roomId: 0,
            roomName: "选择安装房间"
          }
        ],
        cur_room: 0
      })
      cur_data.floor_id = cur_value > 0 ? data.floorArrList[cur_value].floor_id : '';
      _this.getRoomDataList();
    } else if (cur_id == 8) {
      // 安装房间
      if (cur_value == _this.data.cur_room) {
        return;
      } 
      _this.setData({
        cur_room: cur_value
      })
      cur_data.room_id = cur_value > 0 ? data.roomArrList[cur_value].roomId : '';
    } else if (cur_id == 9) {
      // 责任人
      if (cur_value == _this.data.cur_person) {
        return;
      }
      _this.setData({
        cur_person: cur_value
      })
      cur_data.person_liable = cur_value > 0 ? data.checkPersonArrList[cur_value].id : '';
    } else if (cur_id == 10) {
      // 使用开始年限
      _this.setData({
        cur_startTimeData: cur_value
      })
      cur_data.life_start = cur_value;
    } else if (cur_id == 11) {
      // 使用结束年限
      _this.setData({
        cur_endTimeData: cur_value
      })
      cur_data.life_end = cur_value;
    }
  },

  /* 
   * 获取楼层信息
   */
  getFloorDataList() {
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAllFloorsList({ building_id: data.reqData.building_id })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.floorInfo.unshift({
            floor_id: 0,
            floor_name: "选择安装楼层"
          })
          _this.setData({
            'floorArrList': res.result.floorInfo
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

  /* 
   * 获取房间信息
   */
  getRoomDataList() {
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAllRoomsList({ building_id: data.reqData.building_id
      , floorId: data.reqData.floor_id })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.roomsInfo.unshift({
            roomId: 0,
            roomName: "选择安装房间"
          })
          _this.setData({
            'roomArrList': res.result.roomsInfo
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
  
  /* 
   * 确定按钮
   */
  goSubmitForm(e) {
    let _this = this
      , data = this.data
      , cur_obj = this.data.reqData;
    if (!cur_obj.code) {
      app.globalObj.apiConfig.goShowToast('请输入编码', 'none', 2000, false);
      return;
    }
    if (!cur_obj.name) {
      app.globalObj.apiConfig.goShowToast('请输入名称', 'none', 2000, false);
      return;
    }
    if (!cur_obj.model) {
      app.globalObj.apiConfig.goShowToast('请输入型号', 'none', 2000, false);
      return;
    }
    if (!cur_obj.manufacturer) {
      app.globalObj.apiConfig.goShowToast('请输入生产厂家', 'none', 2000, false);
      return;
    }
    if (!cur_obj.system_id) {
      app.globalObj.apiConfig.goShowToast('请选择系统', 'none', 2000, false);
      return;
    } else {
      if (cur_obj.system_id > 1 && !cur_obj.id) {
        app.globalObj.apiConfig.goShowToast('请选择归属子系统', 'none', 2000, false);
        return;
      }
    }
    if (!cur_obj.device_type) {
      app.globalObj.apiConfig.goShowToast('请选择产品类型', 'none', 2000, false);
      return;
    }
    if (!cur_obj.pro_date) {
      app.globalObj.apiConfig.goShowToast('请选择生产日期', 'none', 2000, false);
      return;
    }
    if (!cur_obj.inst_date) {
      app.globalObj.apiConfig.goShowToast('请选择安装日期', 'none', 2000, false);
      return;
    }
    if (!cur_obj.building_id) {
      app.globalObj.apiConfig.goShowToast('请选择安装楼宇', 'none', 2000, false);
      return;
    }
    // if (!cur_obj.floor_id) {
    //   app.globalObj.apiConfig.goShowToast('请选择安装楼层', 'none', 2000, false);
    //   return;
    // }
    // if (!cur_obj.room_id) {
    //   app.globalObj.apiConfig.goShowToast('请选择安装房间', 'none', 2000, false);
    //   return;
    // }
    if (!cur_obj.person_liable) {
      app.globalObj.apiConfig.goShowToast('请选择责任人', 'none', 2000, false);
      return;
    }
    if (!cur_obj.phone) {
      app.globalObj.apiConfig.goShowToast('请输入联系方式', 'none', 2000, false);
      return;
    }
    if (!cur_obj.assets_attribution) {
      app.globalObj.apiConfig.goShowToast('请输入资产归属', 'none', 2000, false);
      return;
    }
    if (!cur_obj.life_start) {
      app.globalObj.apiConfig.goShowToast('请选择开始时间', 'none', 2000, false);
      return;
    }
    if (!cur_obj.life_end) {
      app.globalObj.apiConfig.goShowToast('请选择结束时间', 'none', 2000, false);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeInsert(cur_obj)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast('入档成功', 'none', 2000, false);
          setTimeout(() => {
            wx.navigateBack({
              detal: 1
            })
          }, 1500)
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