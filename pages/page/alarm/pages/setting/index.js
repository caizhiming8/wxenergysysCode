// pages/page/alarm/pages/setting/index.js
const app = getApp();
var startX
var startY
class touch {

  constructor() {
  }

  _touchstart(e, items) {
    //开始触摸时 重置所有删除
    items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY

    return items
  }

  _touchmove(e, items) {
    var index = e.currentTarget.dataset.index, //当前索引
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this._angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    return items
  }

  _angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
}
const Touch = new touch();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curSystemId: 0,
    deviceTypeArrList: [
      {
        id: 0,
        label: "请选择分类",
        systemId: 0
      }
    ],
    cur_devicetype: 0,
    deviceArrList: [
      {
        id: 0,
        label: "请选择设备",
        deviceType: 0
      }
    ],
    cur_device: 0,
    responseDataList: [],
    reqData: {
      deviceId: 0,
      deviceType: 0,
      systemId: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data;
    data.curSystemId = options.id;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    if (data.curSystemId == 1) {
      data.curSystemId = 2;
    } else if (data.curSystemId == 2) {
      data.curSystemId = 1;
    }
    data.reqData.systemId = data.curSystemId;
    app.globalObj.apiConfig.getAllDeviceTypeList({ systemId: data.curSystemId })
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            res.result.unshift({
              id: 0,
              label: "请选择分类",
              systemId: 0
            })
            _this.setData({
              deviceTypeArrList: res.result
            })
          }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
      , data = this.data;
    if (data.reqData.deviceId == 0) {
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getQueryDeviceWarnList(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          if (res.result) {
            _this.setData({
              responseDataList: res.result
            })
          }
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
   * picker切换
   */
  goBindPickerChangeType(e) {
    let _this = this
      , cur_value = e.detail.value
      , cur_index = e.target.dataset.id
      , data = this.data;
    if (cur_index == 1) {
      // 选择设备
      if (cur_value == data.cur_devicetype) {
        return;
      }
      _this.setData({
        cur_devicetype: cur_value,
        cur_device: 0
      })
      data.reqData.deviceType = data.deviceTypeArrList[cur_value].id;
      data.reqData.deviceId = 0;
      if (data.deviceTypeArrList[cur_value].children && data.deviceTypeArrList[cur_value].children.length>0) {
        if (data.deviceTypeArrList[cur_value].children[0].label != '请选择设备') {
          data.deviceTypeArrList[cur_value].children.unshift({
            id: 0,
            label: "请选择设备",
            deviceType: 0
          })
        }
        _this.setData({
          deviceArrList: data.deviceTypeArrList[cur_value].children
        })
      }else{
        _this.setData({
          deviceArrList: [
            {
              id: 0,
              label: "请选择设备",
              deviceType: 0
            }
          ]
        })
      }
    } else if (cur_index == 2) {
      // 选择告警级别
      if (cur_value == data.cur_device) {
        return;
      }
      _this.setData({
        cur_device: cur_value
      })
      data.reqData.deviceId = data.deviceArrList[cur_value].id;
      if (data.reqData.deviceId == 0) {
        return;
      }
      app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
      app.globalObj.apiConfig.getQueryDeviceWarnList(data.reqData)
        .then(res => {
          if (res.success) {
            app.globalObj.apiConfig.goHideToast();
            if (res.result) {
              _this.setData({
                responseDataList: res.result
              })
            }
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
   * 告警设定
   */
  goAddProject() {
    let _this = this;
    if (_this.data.reqData.deviceId == 0) {
      app.globalObj.apiConfig.goShowToast('请先选择设备', 'none', 2000, false);
      return;
    }
    wx.navigateTo({
      url: './addSet/index?id=' + JSON.stringify(_this.data.reqData)
    })
  },

  /* 
   * 修改告警
   */
  goModifyDevive(e) {
    let _this = this
      , data = this.data
      , cur_value = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './modifySet/index?id=' + JSON.stringify(cur_value)
    })
    
  },


  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = Touch._touchstart(e, this.data.responseDataList)
    this.setData({
      responseDataList: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = Touch._touchmove(e, this.data.responseDataList)
    this.setData({
      responseDataList: data
    })
  },

  //删除事件
  del: function (e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.index
      , cur_arr = this.data.responseDataList;
    wx.showModal({
      title: '提示',
      content: '确认要删除此设备吗？',
      success: function (res) {
        if (res.confirm) {
          cur_arr.splice(cur_index, 1)
          _this.setData({
            responseDataList: cur_arr
          })
          wx.setStorage({
            key: 'SELECT_DEVICE',
            data: JSON.stringify(cur_arr)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})