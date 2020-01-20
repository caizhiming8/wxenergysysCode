// pages/page/equipeManage/pages/pollTable/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: app.globalObj.isIpx ? true : false,
    showHeader: false,
    // 是否已经全选
    isSelectAll: false,
    reqData: {
      period_flag: '',
      Uid: '',
      planName: '',
      currentPage: 1,
      pageSize: 15
    },
    responseData: [],
    isBottom: false,
    newViewPosition: {
      'newRight': 30,
      'newBottom': 160
    },
    systemView: {
      'windowHeight': 0,
      'windowWidth': 0,
    },
    isSelectedIdArr: [],
    showNoContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getSystemInfo({
      success: function (e) {
        _this.setData({
          systemView: {
            'windowHeight': e.windowHeight,
            'windowWidth': e.windowWidth
          }
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
    wx.getStorage({
      key: 'ADD_PLAN',
      success: function (res) {
        if (res) {
          let a = JSON.parse(res.data);
          _this.setData({
            newViewPosition: {
              'newRight': a.right,
              'newBottom': a.bottom
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    _this.setData({
      showHeader: false,
      isSelectedIdArr: []
    })
    _this.data.reqData.currentPage = 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipePollList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': res.result.resultList,
            'showNoContent': true
          })
          if (res.result.resultList.length < _this.data.reqData.pageSize) {
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
  },

  /* 
   * 查看详情
   */
  goLookDetail(e) {
    let cur_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `./tableDetail/index?id=${JSON.stringify(cur_id)}`
    })
  },

  /* 
   * 设置设备状态-启用
   */
  goSetDeviceState(e) {
    let _this = this
      , data = this.data
      , reqObj = {
        value: ''
      };
    reqObj.value = 1;
    if(data.isSelectedIdArr.length == 0) {
      app.globalObj.apiConfig.goShowToast('请先选择巡检', 'none', 2000);
      return;
    }
    reqObj.ids = JSON.stringify(data.isSelectedIdArr)
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipePollState(reqObj)
      .then(res => {
        if (res.success) {
          wx.showToast({
            title: '启用成功',
            image: '/images/icon_qy.png',
            duration: 2000
          })
          data.isSelectedIdArr = [];
          setTimeout(()=> {
            _this.onShow();
          }, 2000)
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
   * 设置设备状态-禁用
   */
  goSetDeviceState2(e) {
    let _this = this
      , data = this.data
      , reqObj = {
        value: ''
      };
    reqObj.value = 0;
    if(data.isSelectedIdArr.length == 0) {
      app.globalObj.apiConfig.goShowToast('请先选择巡检', 'none', 2000);
      return;
    }
    reqObj.ids = JSON.stringify(data.isSelectedIdArr)
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipePollState(reqObj)
      .then(res => {
        if (res.success) {
          wx.showToast({
            title: '禁用成功',
            image: '/images/icon_jy.png',
            duration: 2000
          })
          data.isSelectedIdArr = [];
          setTimeout(() => {
            _this.onShow();
          }, 2000)
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
   * 删除巡检
   */
  goDeletePoll(e) {
    let _this = this
      , data = this.data
      , reqObj = {};
    if(data.isSelectedIdArr.length == 0) {
      app.globalObj.apiConfig.goShowToast('请先选择巡检', 'none', 2000);
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定删除该记录',
      success(res) {
        if (res.confirm) {
          reqObj.ids = JSON.stringify(data.isSelectedIdArr)
          app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
          app.globalObj.apiConfig.getEquipePollDelete(reqObj)
            .then(res => {
              if (res.success) {
                data.isSelectedIdArr = [];
                _this.onShow();
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
   * 下一页
   */
  goNextPage(e) {
    let _this = this;
    if (_this.data.isBottom) {
      return;
    }
    _this.data.reqData.currentPage += 1;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipePollList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          _this.setData({
            'responseData': _this.data.responseData.concat(res.result.resultList)
          })
          if (res.result.resultList.length < _this.data.reqData.pageSize) {
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
  },

  /* 
   * 新建巡检计划
   */
  goAddProject(e) {
    wx.navigateTo({
      url: '../addApply/index',
    })
  },

  /* 
   * 去执行
   */
  goExecute(e) {
    let cur_index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../executeForm/index?id=' + JSON.stringify(cur_index),
    })
  },

  /* 
   * 全选
   */
  goSelectAll() {
    let _this = this
      , data = this.data;
    if (data.isSelectAll) {
      data.responseData.forEach((item, index) => {
        item.state = false;
        _this.setData({
          [`responseData[${index}]`]: item
        })
      })
      this.setData({
        isSelectAll: false,
        isSelectedIdArr: []
      })
    }else {
      const a = []
      data.responseData.forEach((item, index) => {
        item.state = true;
        _this.setData({
          [`responseData[${index}]`]: item
        })
        a.push(item.id)
      })
      this.setData({
        isSelectAll: true,
        isSelectedIdArr: a
      })
    }
  },

  /* 
   * 显示操作
   */
  goShowOperation() {
    this.setData({
      showHeader: true,
      isSelectedIdArr: []
    })
  },

  /* 
   * 隐藏操作
   */
  goHideOperation() {
    let _this = this
      , data = this.data;
    _this.setData({
      showHeader: false,
      isSelectAll: false,
      isSelectedIdArr: []
    })
    data.responseData.forEach((item, index) => {
      item.state = false;
      _this.setData({
        [`responseData[${index}]`]: item
      })
    })
  },

  /* 
   * 当前选择的项
   */
  goSelcetCurValue(e) {
    let _this = this
      , cur_value = e.currentTarget.dataset.id
      , cur_index = e.currentTarget.dataset.index
      , data = this.data
      , cur_arr = this.data.selectedDeviceArray;
    if (cur_value.state) {
      cur_value.state = false;
      data.isSelectedIdArr.forEach((item,index)=> {
        if (item == cur_value.id) {
          data.isSelectedIdArr.splice(index,1)
        }
      })
    } else {
      cur_value.state = true;
      data.isSelectedIdArr.push(cur_value.id);
    }
    _this.setData({
      [`responseData[${cur_index}]`]: cur_value
    })
  }
})