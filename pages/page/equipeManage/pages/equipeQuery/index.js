// pages/page/equipeManage/pages/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电系统
    eleSystemArrList: [
      {
        name: '请选择',
        id: 0
      }
    ],
    cur_eleSystem: 0,
    // 水系统
    waterSystemArrList: [
      {
        name: '请选择',
        id: 0
      }
    ],
    cur_waterSystem: 0,
    // 暖系统
    hotSystemArrList: [
      {
        name: '请选择',
        id: 0
      }
    ],
    cur_hotSystem: 0,
    // 空调系统
    airSystemArrList: [
      {
        name: '请选择',
        id: 0
      }
    ],
    cur_airSystem: 0,
    // 类型
    typeArrList: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '未出档'
      },
      {
        id: 2,
        name: '已出档'
      }
    ],
    cur_type: 1,
    // 楼宇查询
    buildingArrList: [],
    cur_building: 0,

    responseData: [],
    reqData: {
      systemId: '',
      subSystemId: '',
      buildingId: '',
      queryFlag: 1,
      currentPage: 1,
      pageSize: 10,
    },
    isBottom: false,
    showBuilding: true,
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data;
    app.globalObj.apiConfig.getAllSystemList(null)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();

          _this.setData({
            'eleSystemArrList': [{
              name: '请选择系统',
              id: 0
            }].concat(res.result)
          })
          return;
          res.result.forEach(item=> {
            if(item.name == '供电系统') {
              data.eleSystemArrList.push(item)
              if (item.children) {
                item.children.forEach(list=> {
                  data.eleSystemArrList.push(list)
                })
              }
              _this.setData({
                'eleSystemArrList': data.eleSystemArrList
              })
            } else if (item.name == '供水系统') {
              data.waterSystemArrList.push(item)
              if (item.children) {
                item.children.forEach(list => {
                  data.waterSystemArrList.push(list)
                })
              }
              _this.setData({
                'waterSystemArrList': data.waterSystemArrList
              })
            } else if (item.name == '暖通系统') {
              data.hotSystemArrList.push(item)
              if (item.children) {
                item.children.forEach(list => {
                  data.hotSystemArrList.push(list)
                })
              }
              _this.setData({
                'hotSystemArrList': data.hotSystemArrList
              })
            } else if (item.name == '中央空调') {
              data.airSystemArrList.push(item)
              if (item.children) {
                item.children.forEach(list => {
                  data.airSystemArrList.push(list)
                })
              }
              _this.setData({
                'airSystemArrList': data.airSystemArrList
              })
            }
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
            buildName: '选择楼宇',
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
    // _this.getData();
  },

  /* 
   * 获取数据
   */
  getData() {
    let _this = this;
    _this.data.reqData.currentPage = 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeAllList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result.deviceList) {
            _this.setData({
              responseData: res.result.deviceList,
              showNoContent: true
            })
            if (res.result.deviceList.length < _this.data.reqData.pageSize) {
              _this.setData({
                isBottom: true
              })
            }
          }else {
            _this.setData({
              responseData: [],
              isBottom: true
            })
            app.globalObj.apiConfig.goShowToast('查询结果为空', 'none', 2000, false);
          }
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
    下一页
   */
  goLoadNextPage(e) {
    let _this = this;
    if (_this.data.isBottom) {
      return;
    }
    _this.data.reqData.currentPage += 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeAllList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if(res.result.deviceList) {
            _this.setData({
              responseData: _this.data.responseData.concat(res.result.deviceList)
            })
            if (res.result.deviceList.length < _this.data.reqData.pageSize) {
              _this.data.isBottom = true;
            }
          }else {
            _this.setData({
              isBottom: true
            })
            app.globalObj.apiConfig.goShowToast('查询结果为空', 'none', 2000, false);
          }
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
   * 出档
   */
  goOut(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '使该设备出档？',
      success(res) {
        if (res.confirm) {
          app.globalObj.apiConfig.getEquipeDeviceOut({ id: cur_info.id  })
            .then(res => {
              if (res.success) {
                app.globalObj.apiConfig.goHideToast();
                console.log(res)
                _this.setData({
                  responseData: res.result.deviceList
                })
                if (res.result.deviceList.length < _this.data.reqData.pageSize) {
                  _this.data.isBottom = true;
                }
              } else {
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
              }
            })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /* 
   * 更新
   */
  goUpdate(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `./updateEquipe/index?id=${JSON.stringify(cur_info)}`,
    })
  },

  /* 
   * 模态框切换事件
   */
  goBindDateChange(e) {
    let _this = this
      , data = this.data
      , cur_value = e.detail.value
      , cur_id = e.currentTarget.dataset.id
      , cur_obj = this.data.reqData;
    if (cur_id == 1) {
      if (cur_value == _this.data.cur_eleSystem) {
        return;
      }
      _this.setData({
        cur_eleSystem: cur_value,
        isBottom: false,
        showNoContent: false
      })
      if (cur_value > 0) {
        // console.log(data.eleSystemArrList[data.cur_eleSystem])
        let a = data.eleSystemArrList[data.cur_eleSystem];
        if(a.children) {
          _this.setData({
            cur_waterSystem: 0,
            showSubSystem: true,
            showBuilding: true,
            waterSystemArrList: [{
              name: '请选择子系统',
              id: 0
            }].concat(a.children)
          })
        }else {
          _this.setData({
            cur_waterSystem: 0,
            showSubSystem: false,
            showBuilding: true,
            waterSystemArrList: [{
              name: '请选择子系统',
              id: 0
            }]
          })
        }
        cur_obj.subSystemId = '';
        cur_obj.systemId = data.eleSystemArrList[data.cur_eleSystem].systemId;
        // if (data.eleSystemArrList[data.cur_eleSystem].subsystemId) {
        //   _this.setData({
        //     showBuilding: false,
        //     cur_building: 0,
        //     cur_waterSystem: 0,
        //     cur_hotSystem: 0,
        //     cur_airSystem: 0
        //   })
        //   cur_obj.buildingId = '';
        //   cur_obj.systemId = data.eleSystemArrList[data.cur_eleSystem].systemId;
        //   cur_obj.subSystemId = data.eleSystemArrList[data.cur_eleSystem].subsystemId;
        // } else {
        //   _this.setData({
        //     showBuilding: true,
        //     cur_waterSystem: 0,
        //     cur_hotSystem: 0,
        //     cur_airSystem: 0
        //   })
        //   cur_obj.subSystemId = '';
        //   cur_obj.systemId = data.eleSystemArrList[data.cur_eleSystem].systemId;
        // }
      } else {
        _this.setData({
          cur_waterSystem: 0,
          showSubSystem: false,
          showBuilding: true,
          waterSystemArrList: [{
            name: '请选择子系统',
            id: 0
          }]
        })
        cur_obj.systemId = '';
      }
    } else if (cur_id == 2) {
      if (cur_value == _this.data.cur_waterSystem) {
        return;
      }
      _this.setData({
        cur_waterSystem: cur_value,
        isBottom: false,
        showBuilding: false,
      })
      if (cur_value > 0) {
        // if (data.waterSystemArrList[data.cur_waterSystem].subsystemId) {
        //   _this.setData({
        //     showBuilding: false,
        //     cur_building: 0,
        //     cur_eleSystem: 0,
        //     cur_hotSystem: 0,
        //     cur_airSystem: 0
        //   })
        //   cur_obj.buildingId = '';
        //   cur_obj.systemId = data.waterSystemArrList[data.cur_waterSystem].systemId;
        //   cur_obj.subSystemId = data.waterSystemArrList[data.cur_waterSystem].subsystemId;
        // } else {
        //   _this.setData({
        //     showBuilding: true,
        //     cur_eleSystem: 0,
        //     cur_hotSystem: 0,
        //     cur_airSystem: 0
        //   })
        //   cur_obj.subSystemId = '';
        //   cur_obj.systemId = data.waterSystemArrList[data.cur_waterSystem].systemId;
        // }
        cur_obj.subSystemId = data.waterSystemArrList[data.cur_waterSystem].subsystemId;
      } else {
        // cur_obj.systemId = '';
        cur_obj.subSystemId = '';
      }
    } else if (cur_id == 3) {
      if (cur_value == _this.data.cur_hotSystem) {
        return;
      }
      _this.setData({
        cur_hotSystem: cur_value,
        isBottom: false
      })
      if (cur_value > 0) {
        if (data.hotSystemArrList[data.cur_hotSystem].subsystemId) {
          _this.setData({
            showBuilding: false,
            cur_building: 0,
            cur_eleSystem: 0,
            cur_waterSystem: 0,
            cur_airSystem: 0
          })
          cur_obj.buildingId = '';
          cur_obj.systemId = data.hotSystemArrList[data.cur_hotSystem].subSystemId;
          cur_obj.subSystemId = data.hotSystemArrList[data.cur_hotSystem].subsystemId;
        } else {
          _this.setData({
            showBuilding: true,
            cur_eleSystem: 0,
            cur_waterSystem: 0,
            cur_airSystem: 0
          })
          cur_obj.subSystemId = '';
          cur_obj.systemId = data.hotSystemArrList[data.cur_hotSystem].systemId;
        }
      } else {
        cur_obj.systemId = '';
      }
    } else if (cur_id == 4) {
      if (cur_value == _this.data.cur_airSystem) {
        return;
      }
      _this.setData({
        cur_airSystem: cur_value,
        isBottom: false
      })
      if (cur_value > 0) {
        if (data.airSystemArrList[data.cur_airSystem].subsystemId) {
          _this.setData({
            showBuilding: false,
            cur_building: 0,
            cur_eleSystem: 0,
            cur_waterSystem: 0,
            cur_hotSystem: 0
          })
          cur_obj.buildingId = '';
          cur_obj.systemId = data.airSystemArrList[data.cur_airSystem].systemId;
          cur_obj.subSystemId = data.airSystemArrList[data.cur_airSystem].subsystemId;
        } else {
          _this.setData({
            showBuilding: true,
            cur_eleSystem: 0,
            cur_waterSystem: 0,
            cur_hotSystem: 0
          })
          cur_obj.subSystemId = '';
          cur_obj.systemId = data.airSystemArrList[data.cur_airSystem].systemId;
        }
      }else {
        cur_obj.systemId = '';
      }
    } else if (cur_id == 5) {
      if (cur_value == _this.data.cur_type) {
        return;
      }
      _this.setData({
        cur_type: cur_value,
        isBottom: false
      })
      cur_obj.queryFlag = data.typeArrList[data.cur_type].id;
    } else if (cur_id == 6) {
      if (cur_value == _this.data.cur_building) {
        return;
      }
      _this.setData({
        cur_building: cur_value,
        isBottom: false
      })
      cur_obj.buildingId = cur_value > 0 ? data.buildingArrList[data.cur_building].buildId : '';
    }
    _this.getData();
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
    this.getData();
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})