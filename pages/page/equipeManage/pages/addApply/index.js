// pages/page/equipeManage/pages/addApply/index.js
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
    items: [],
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
        username: '选择巡检人',
        id: 0
      }
    ],
    cur_person: 0,
    // 计划状态
    planStateArrList: [
      {
        name: '启用',
        id: 0
      },
      {
        name: '禁用',
        id: 1
      }
    ],
    cur_planState: 0,
    // 周期
    periodArrList: [
      {
        name: '年',
        id: 0
      },
      {
        name: '月',
        id: 1
      },
      {
        name: '日',
        id: 2
      }
    ],
    cur_period: 0,
    // 巡检时间
    cur_timeData: '',
    reqData: {
      // 周期id
      period: '',
      // 周期的标志
      period_flag: 0,
      // 设备数组
      deviceInfo: [],
      // 计划名称
      name: '',
      system_id: '',
      subsystem_id: '',
      time: '',
      uid: '',
      status: 0
    },
    showSubSystem: false,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /* 
   * 文本输入
   */
  goInputCont(e) {
    let _this = this
      , cur_id = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , cur_data = this.data.reqData;
    if(cur_id == 1) {
      cur_data.name = cur_value;
    }else if(cur_id == 2) {
      cur_data.period = cur_value;
    }
  },

  /* 
   * 选择事件
   */
  goBindDateChange(e) {
    let _this = this
      , cur_id = e.currentTarget.dataset.id
      , cur_value = e.detail.value
      , cur_data = this.data.reqData
      , data = this.data;
    if (cur_id == 1) {
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
      _this.data.reqData.system_id = cur_value > 0 ? data.systemArrList[cur_value].systemId : '';
      _this.data.reqData.subsystem_id = '';
    } else if (cur_id == 2) {
      if (cur_value == _this.data.cur_subSystem) {
        return;
      }
      _this.setData({
        'cur_subSystem': cur_value
      })
      _this.data.reqData.subsystem_id = cur_value > 0 ? data.subSystemArrList[cur_value].subsystemId : '';
    } else if (cur_id == 3) {
      if (cur_value == _this.data.cur_person) {
        return;
      }
      _this.setData({
        'cur_person': cur_value
      })
      _this.data.reqData.uid = cur_value > 0 ? data.checkPersonArrList[cur_value].id : '';
    } else if (cur_id == 4) {
      if (cur_value == _this.data.cur_planState) {
        return;
      }
      _this.setData({
        'cur_planState': cur_value
      })
      _this.data.reqData.status = data.planStateArrList[cur_value].id;
    } else if (cur_id == 5) {
      if (cur_value == _this.data.cur_period) {
        return;
      }
      _this.setData({
        'cur_period': cur_value
      })
      _this.data.reqData.period_flag = data.periodArrList[cur_value].id;
    } else if (cur_id == 6) {
      _this.setData({
        cur_timeData: cur_value
      })
      _this.data.reqData.time = cur_value;
    }
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , data = this.data;
    if(!data.reqData.name) {
      app.globalObj.apiConfig.goShowToast('请输入计划名称', 'none', 2000);
      return;
    }
    if (!data.reqData.system_id) {
      app.globalObj.apiConfig.goShowToast('请选择系统', 'none', 2000);
      return;
    }else{
      if (data.reqData.system_id > 1 && !data.reqData.subsystem_id) {
        app.globalObj.apiConfig.goShowToast('请选择归属子系统', 'none', 2000);
        return;
      }
    }
    if (!data.reqData.period) {
      app.globalObj.apiConfig.goShowToast('请输入周期时长', 'none', 2000);
      return;
    }
    if (!data.reqData.time) {
      app.globalObj.apiConfig.goShowToast('请选择巡检事件', 'none', 2000);
      return;
    }
    if (data.items.length <= 0) {
      app.globalObj.apiConfig.goShowToast('请选择巡检设备', 'none', 2000);
      return;
    }
    data.reqData.deviceInfo = JSON.stringify(data.items);
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getEquipeAddApply(data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast('创建成功', 'none', 2000);
          wx.removeStorageSync('SELECT_DEVICE');
          setTimeout(()=> {
            wx.navigateBack({
              detal: 1
            })
          },1500)
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    try {
      var value = wx.getStorageSync('SELECT_DEVICE')
      if (value) {
        _this.setData({
          items: JSON.parse(value)
        })
      }else {
        _this.setData({
          items: []
        })
      }
    } catch (e) {
      _this.goGetData();
    }
  },

  /* 
   * 选择设备
   */
  goSelectDevice() {
    wx.navigateTo({
      url: './deviceList/index',
    })
  },


  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = Touch._touchstart(e, this.data.items)
    this.setData({
      items: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = Touch._touchmove(e, this.data.items)
    this.setData({
      items: data
    })
  },

  //删除事件
  del: function (e) {
    let _this = this
      , cur_index = e.currentTarget.dataset.index
      , cur_arr = this.data.items;
    wx.showModal({
      title: '提示',
      content: '确认要删除此设备吗？',
      success: function (res) {
        if (res.confirm) {
          cur_arr.splice(cur_index, 1)
          _this.setData({
            items: cur_arr
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