// pages/page/warm/pages/buildWarm/heatBuildRealData/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前楼宇
    buildSysList: [
      {
        'id': 0,
        'label': '选择楼宇'
      }
    ],
    curBuildIndex: 0,
    curBuildingId: 0,
    roomSysList: [
      {
        'Id': 0,
        'roomName': '状态'
      },
      {
        'Id': 1,
        'roomName': '在线'
      },
      {
        'Id': 2,
        'roomName': '离线'
      }
    ],
    curRoomIndex: 0,
    reqData2: {
      'systemId': 3,
      'subsystemId': 4,
      'flag': 1
    },
    buildRealDataArr: [],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    const firstPromise = new Promise((rej) => {
      // 查询楼宇列表
      app.globalObj.apiConfig.getQueryAllBuildingList({systemId: 3})
        .then(res => {
          if (res.success) {
            res.result.forEach((item) => {
              if (item.subsystemId == 4) {
                _this.setData({
                  'buildSysList': item.children
                })
              }
            })
            _this.data.curBuildingId = _this.data.buildSysList[0].id;
            rej();
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
    firstPromise
      .then(()=> {
        app.globalObj.apiConfig.getHeatingEnergyData(_this.data.reqData2)
          .then(res => {
            app.globalObj.apiConfig.goHideToast();
            if (res.success) {
              _this.setData({
                'buildEneryDataList': res.result
              })
              let a = [];
              _this.data.buildEneryDataList.forEach(item=>{
                if (item.buildingId == _this.data.curBuildingId) {
                  a.push(item)
                }
              })
              _this.setData({
                'buildRealDataArr': a
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

  // 点击切换楼宇
  goChangeBuildSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curBuildIndex) {
      return;
    }
    this.setData({
      'curBuildIndex': cur_index,
      'curRoomIndex': 0,
      'showNoContent': false
    })
    _this.data.curBuildingId = _this.data.buildSysList[cur_index].id;
    let a = [];
    _this.data.buildEneryDataList.forEach(item => {
      if (item.buildingId == _this.data.curBuildingId) {
        a.push(item)
      }
    })
    _this.setData({
      'buildRealDataArr': a,
      'showNoContent': true
    })
  },

  // 点击切换房间
  goChangeRoomSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curRoomIndex) {
      return;
    }
    console.log(cur_index)
    this.setData({
      'curRoomIndex': cur_index
    })
    _this.setData({
      'buildRealDataArr': _this.data.buildRealDataArr
    })
  },
})