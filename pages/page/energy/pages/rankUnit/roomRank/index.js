// pages/page/energy/pages/rankUnit/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTabActive: 2,
    curSubTabActive: 0,
    cur_unitInfo: null,
    reqData: {
      'depart_id': '',
      'type_id': '',
      'flag': 'real'
    },
    reqData2: {
      'currentPage': 1,
      'pageSize': 100,
      'depart_id': ''
    },
    reqData3: {
      'depart_id': ''
    },
    reqData4: {
      'periodId': '',
      'depart_id': '',
      'building_id': '',
      'floor_id': '',
      'room_id': '',
      'flags': 1,
      'flag': 'real',
      'year': ''
    },
    // 第一部分调接口返回的数据
    resBackDataArray: [],
    // 第二部分调接口返回的数据
    resBackDataArray2: [],
    // 第三部分调接口返回的数据-所有的房间列表
    resBackDataArray3: [],
    // 展示筛选弹窗
    activeShowMask: false,
    // 分类
    classifyDataList: [],
    activeClassify: 0,
    // 楼宇
    buildsDataList: [],
    activeBuild: 0,
    // 房间
    roomsDataList: [],
    activeRoom: 0,
    // 年份
    yearDataList: [{ 'id': 0, 'time_year': '选择' }],
    activeYear: 0,
    // 周期
    periodsDataList: [],
    activePeriod: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this; // getQuotaAllRoomsList
    _this.data.cur_unitInfo = JSON.parse(options.info);
    _this.data.cur_unitid = JSON.parse(options.id);
    let a = _this.data.cur_unitInfo.Id;
    let b = _this.data.cur_unitid;
    _this.data.reqData.depart_id = a;
    _this.data.reqData2.depart_id = a;
    _this.data.reqData3.depart_id = a;
    _this.data.reqData4.depart_id = a;
    _this.data.reqData4.floor_id = b.floor_id;
    _this.data.reqData4.room_id = b.room_Id;
    _this.data.reqData4.building_id = b.buildingId;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    const firstPromise = new Promise(rej => {
      app.globalObj.apiConfig.getQuotaRealTimeData(_this.data.reqData4)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          rej()
          if (res.success) {
            _this.setData({
              'resBackDataArray': res.result.quota_csm_list
            })
            console.log(res);
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          rej()
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    const secondPromise = new Promise(rej => {
      firstPromise
        .then(() => {
          app.globalObj.apiConfig.getQuotaAllRoomsList(_this.data.reqData3)
            .then(res => {
              rej();
              if (res.success) {
                _this.setData({
                  'resBackDataArray3': res.result
                })
                _this.setData({
                  'classifyDataList': res.result
                })
                if (res.result.length > 0) {
                  _this.setData({
                    'buildsDataList': res.result[0].children
                  })
                  if (res.result[0].children.length > 0) {
                    _this.setData({
                      'roomsDataList': res.result[0].children[0].children
                    })
                    let aaa = res.result[0].children[0].children[0];
                    _this.data.reqData4.building_id = aaa ? aaa.buildingId : '';
                    _this.data.reqData4.room_id = aaa ? aaa.id : '';
                    _this.data.reqData4.floor_id = aaa ? aaa.floorId : '';
                  }
                }
              } else {
                app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
              }
            })
            .catch(err => {
              rej();
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
    })
    secondPromise
      .then(() => {
        app.globalObj.apiConfig.getQuotaAllPeriodList(null)
          .then(res => {
            if (res.success) {
              res.result.list.unshift({
                'Id': 0,
                'name': '选择周期'
              })
              _this.setData({
                'periodsDataList': res.result.list
              })
            } else {
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
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
   * 切换Tab
   */
  goChangeTab(e) {
    let _this = this,
      cur_index = e.target.dataset.index;
    if (_this.data.curTabActive == cur_index) {
      return;
    }
    _this.setData({
      'curTabActive': cur_index,
      'resBackDataArray': []
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    if (cur_index == 1) {
      app.globalObj.apiConfig.getQuotaAllRoomsData(_this.data.reqData2)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            _this.setData({
              'resBackDataArray2': res.result.quotaList
            })
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    } else if (cur_index == 2) {
      if (_this.data.reqData4.room_id) {
        _this.goGetRoomEnergyData();
      } else {
        app.globalObj.apiConfig.getQuotaRealTimeData(_this.data.reqData)
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
            if (res.success) {
              _this.setData({
                'resBackDataArray': res.result.quota_csm_list
              })
            } else {
              app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
            }
          })
          .catch(err => {
            app.globalObj.apiConfig.goHideToast();
            console.log(err)
          })
      }
    } else if (cur_index == 0) {
      app.globalObj.apiConfig.getQuotaRealTimeData(_this.data.reqData)
        .then(res => {
          app.globalObj.apiConfig.goHideToast();
          if (res.success) {
            _this.setData({
              'resBackDataArray': res.result.quota_csm_list
            })
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    }
  },

  /* 
   * 确定按钮
   */
  goGetRoomEnergyData() {
    let _this = this;
    _this.setData({
      'activeShowMask': false,
      'resBackDataArray': []
    })
    if (!_this.data.reqData4.room_id) {
      app.globalObj.apiConfig.goShowToast('请选择房间', 'none', 2000);
      return;
    }
    if (_this.data.reqData4.periodId) {
      if (!_this.data.reqData4.year) {
        app.globalObj.apiConfig.goShowToast('请选择日期', 'none', 2000);
        return;
      }
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getQuotaRealTimeData(_this.data.reqData4)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'resBackDataArray': res.result.quota_csm_list
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

  /* 
   * 子菜单切换Tab
   */
  goChangeSubTabl(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (_this.data.curSubTabActive == cur_index) {
      return;
    }
    _this.setData({
      'curSubTabActive': cur_index,
      'resBackDataArray': []
    })
    _this.data.reqData.type_id = cur_index != '0' ? cur_index : '';
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getQuotaRealTimeData(_this.data.reqData)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          _this.setData({
            'resBackDataArray': res.result.quota_csm_list
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

  /* 
   * 显示筛选弹窗
   */
  goShowShaiXuan(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.index;
    if (cur_index == 1) {
      this.setData({
        activeShowMask: true
      })
    } else {
      this.setData({
        activeShowMask: false
      })
    }
  },

  /* 
   * 防穿透事件
   */
  catchtouchmove() {
    return;
  },

  /* 
   * 切换-分类
   */
  goChangeClassify(e) {
    let _this = this,
      cur_index = e.target.dataset.index,
      cur_info = e.target.dataset.info;
    if (cur_index == _this.data.activeClassify) {
      return;
    }
    _this.setData({
      activeClassify: cur_index,
      activeBuild: 0,
      activeRoom: 0
    })
    let cur_class = _this.data.classifyDataList[cur_index];
    // 监测楼宇
    if (cur_class) {
      _this.setData({
        buildsDataList: cur_class.children
      })
      let cur_build = cur_class.children[0];
      _this.data.reqData4.building_id = cur_build?cur_class.children[0].id:'';
      // 监测房间
      if (cur_build) {
        _this.setData({
          roomsDataList: cur_build.children
        })
        _this.data.reqData4.room_id = cur_build.children[0] ? cur_build.children[0].id : '';
        _this.data.reqData4.floor_id = cur_build.children[0] ? cur_build.children[0].floorId : '';
      } else {
        _this.setData({
          roomsDataList: []
        })
        _this.data.reqData4.room_id = '';
        _this.data.reqData4.floor_id = '';
      }
    } else {
      _this.setData({
        buildsDataList: [],
        roomsDataList: []
      })
      _this.data.reqData4.building_id = '';
      _this.data.reqData4.room_id = '';
      _this.data.reqData4.floor_id = '';
    }

  },

  /* 
   * 切换-楼宇
   */
  goChangeBuild(e) {
    let _this = this,
      cur_index = e.target.dataset.index,
      cur_info = e.target.dataset.info;
    if (cur_index == _this.data.activeBuild) {
      return;
    }
    _this.setData({
      activeBuild: cur_index,
      activeRoom: 0
    })
    let cur_build = _this.data.buildsDataList[cur_index];
    // 监测房间
    if (cur_build) {
      _this.setData({
        roomsDataList: cur_build.children
      })
      _this.data.reqData4.room_id = cur_build.children[0] ? cur_build.children[0].id : '';
      _this.data.reqData4.floor_id = cur_build.children[0] ? cur_build.children[0].floorId : '';
    } else {
      _this.setData({
        roomsDataList: []
      })
      _this.data.reqData4.room_id = '';
      _this.data.reqData4.floor_id = '';
    }
  },

  /* 
   * 切换-房间
   */
  goChangeRoom(e) {
    let _this = this,
      cur_index = e.target.dataset.index,
      cur_info = e.target.dataset.info;
    if (cur_index == _this.data.activeRoom) {
      return;
    }
    _this.setData({
      activeRoom: cur_index
    })
    let cur_room = _this.data.roomsDataList[cur_index]
    _this.data.reqData4.room_id = cur_room.id;
    _this.data.reqData4.floor_id = cur_room.floorId;
  },

  /* 
   * 切换-年份
   */
  goChangeYear(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.activeYear) {
      return;
    }
    _this.setData({
      activeYear: cur_index
    })
    if (cur_index == 0) {
      _this.data.reqData4.year = '';
    } else {
      _this.data.reqData4.year = _this.data.yearDataList[cur_index].time_year;
    }
  },

  /* 
   * 切换-周期
   */
  goChangePeriod(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.activePeriod) {
      return;
    }
    _this.setData({
      'activeRoom': 0,
      'activePeriod': cur_index
    })
    _this.data.reqData4.year = '';
    if (cur_index > 0) {
      _this.goGetPeriodYears()
      _this.data.reqData4.periodId = _this.data.periodsDataList[cur_index].Id;
    } else {
      _this.data.reqData4.periodId = '';
      _this.setData({
        'yearDataList': [{
          'id': 0,
          'time_year': '选择'
        }]
      })
    }
  },

  /* 
   * 获取周期下的年份
   */
  goGetPeriodYears(e) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getQuotaAllPeriodYearList({
      'periodId': _this.data.periodsDataList[_this.data.activePeriod].Id
    })
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          res.result.unshift({
            'id': 0,
            'time_year': '选择'
          })
          _this.setData({
            'yearDataList': res.result
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