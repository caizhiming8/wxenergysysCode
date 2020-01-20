// pages/page/equipeManage/pages/pollRecord/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArrList: [
      { label: '查询类型', value: '-1' },
      { label: '年巡检', value: 0 },
      { label: '月巡检', value: 1 },
      { label: '日巡检', value: 2 }
    ],
    curSelectTypeIndex: 0,
    renArrList: [],
    curSelectRenIndex: 0,
    reqData: {
      deviceType: '',
      Uid: '',
      planName: '',
      currentPage: 1,
      pageSize: 15
    },
    responceData: [],
    isBottom: false,
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalObj.apiConfig.getEquipeUserList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          res.result.list.unshift({
            username: '巡检人',
            id: 0
          })
          _this.setData({
            'renArrList': res.result.list
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    app.globalObj.apiConfig.getAllDeviceList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          res.result.deviceTypeList.unshift({
            type_name: '设备类型',
            device_type: 0
          })
          _this.setData({
            'typeArrList': res.result.deviceTypeList
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    _this.goGetData();
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

  // 获取巡检数据
  goGetData() {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeRenPollList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            _this.setData({
              'responceData': res.result.infoList,
              'showNoContent': true
            })
            if (res.result.infoList.length < _this.data.reqData.pageSize) {
              _this.data.isBottom = true;
            }
          }else{
            _this.setData({
              'responceData': [],
              'showNoContent': true
            })
            _this.data.isBottom = true;
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
   * 下一页
   */
  goNextPage(e) {
    let _this = this;
    if (_this.data.isBottom) {
      return;
    }
    _this.data.reqData.currentPage += 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeRenPollList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            _this.setData({
              'responceData': _this.data.responceData.concat(res.result.infoList)
            })
            if (res.result.infoList.length < _this.data.reqData.pageSize) {
              _this.setData({
                isBottom: true
              })
            }
          }else{
            app.globalObj.apiConfig.goShowToast('查询结果为空', 'none', 2000);
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

  /**
   * tab切换
   */
  goChangeDMAtableTime3(e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.id
      , cur_value = e.detail.value;
    if (cur_index == 1) {
      if (cur_value == _this.data.curSelectTypeIndex) {
        return;
      }
      _this.setData({
        curSelectTypeIndex: cur_value,
        showNoContent: false
      })
      _this.data.reqData.deviceType = cur_value ? _this.data.typeArrList[cur_value].device_type : '';
    } else {
      if (cur_value == _this.data.curSelectRenIndex) {
        return;
      }
      _this.setData({
        curSelectRenIndex: cur_value,
        showNoContent: false
      })
      _this.data.reqData.Uid = cur_value > 0 ? _this.data.renArrList[cur_value].id : '';
    }
    _this.goGetData();
  },

  /* 
   * 输入的文字
   */
  goInputCont(e) {
    this.data.reqData.planName = e.detail.value;
  },

  /* 
   * 查看详情
   */
  goPollRecordDetail(e) {
    let _this = this
      , cur_value = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './recordDetail/index?id=' + JSON.stringify(cur_value)
    })
  }
})