// pages/page/equipeManage/pages/addApply/deviceList/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArrList: [
      {
        name: '选择系统',
        systemId: 0
      }
    ],
    curSelectTypeIndex: 0,
    renArrList: [
      {
        name: '归属子系统',
        id: 0
      }
    ],
    curSelectRenIndex: 0,
    showSubSystem: false,
    reqData: {
      system_id: '',
      subsystem_id: '',
      currentPage: 1,
      pageSize: 10
    },
    responseData: [],
    isBottom: false,
    selectedDeviceArray: []
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
            'typeArrList': res.result
          })
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
    try {
      var value = wx.getStorageSync('SELECT_DEVICE')
      if (value) {
        _this.data.selectedDeviceArray = JSON.parse(value)
      }
      _this.goGetData();
    } catch (e) {
      _this.goGetData();
    }
  },

  /**
   * tab切换
   */
  goChangeDMAtableTime3(e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , data = this.data;
    // console.log(cur_value)
    if (cur_index == 1) {
      if (cur_value == _this.data.curSelectTypeIndex) {
        return;
      }
      _this.setData({
        isBottom: false,
        curSelectTypeIndex: cur_value,
        curSelectRenIndex: 0,
        showSubSystem: data.typeArrList[cur_value].children ? true : false
      })
      if (data.typeArrList[cur_value].children) {
        if (data.typeArrList[cur_value].children[0].name != '选择子系统') {
          data.typeArrList[cur_value].children.unshift({
            name: '选择子系统',
            id: 0
          })
        }
        _this.setData({
          'renArrList': data.typeArrList[cur_value].children
        })
      }
      // else {
        _this.data.reqData.currentPage = 1;
      // }
      _this.data.reqData.system_id = cur_value > 0 ? data.typeArrList[cur_value].systemId : '';
      _this.data.reqData.subsystem_id = '';
      _this.goGetData();
    } else {
      if (cur_value == _this.data.curSelectRenIndex) {
        return;
      }
      _this.setData({
        isBottom: false,
        curSelectRenIndex: cur_value
      })
      _this.data.reqData.subsystem_id = cur_value > 0 ? data.renArrList[cur_value].subsystemId : '';
      _this.data.reqData.currentPage = 1;
      _this.goGetData();
    }
  },

  /* 
   * 获取设备列表的接口
   */
  goGetData() {
    let _this = this;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getAllDeviceInfo(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            let a = res.result.deviceTypeList
              , b = _this.data.selectedDeviceArray;
            for (let i = 0; i < a.length; i++) {
              for (let j = 0; j < b.length; j++) {
                if (b[j].id == a[i].id) {
                  a[i].state = true;
                  break;
                }
              }
            }
            _this.setData({
              'responseData': a
            })
            if(a.length<_this.data.reqData.pageSize) {
              _this.data.isBottom = true;
            }
          } else {
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
    app.globalObj.apiConfig.getAllDeviceInfo(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            let a = res.result.deviceTypeList
              , b = _this.data.selectedDeviceArray;
            for(let i = 0;i<a.length;i++) {
              for (let j = 0; j < b.length;j++) {
                if(b[j].id == a[i].id) {
                  a[i].state = true;
                  break;
                }
              }
            }
            _this.setData({
              'responseData': _this.data.responseData.concat(a)
            })
            if (a.length < _this.data.reqData.pageSize) {
              _this.data.isBottom = true;
            }
          } else {
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
    }else{
      cur_value.state = true;
    }
    _this.setData({
      [`responseData[${cur_index}]`]: cur_value
    })
    for (let i = 0; i < cur_arr.length; i++) {
      if (cur_arr[i].id == cur_value.id) {
        cur_arr.splice(i,1);
        wx.setStorage({
          key: 'SELECT_DEVICE',
          data: JSON.stringify(cur_arr)
        })
        return;
      }
    }
    cur_arr.push(cur_value);
    wx.setStorage({
      key: 'SELECT_DEVICE',
      data: JSON.stringify(cur_arr)
    })
  }

})