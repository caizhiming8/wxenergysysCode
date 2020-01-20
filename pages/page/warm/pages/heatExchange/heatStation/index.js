// pages/page/warm/pages/heatExchange/heatStation/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heatSystemList: [
      {
        label: '请选择'
      }
    ],
    curSelectsystemIndex: 0,
    reqData: {
      'systemId': 3,
      'subsystemId': 3
    },
    reqData2: {
      'systemId': 3,
      'subsystemId': 3,
      'query': 0,
      'buildingId': '',
      'number': 1
    },
    // 返回的数据
    responseData: {},
    // 哪一项显示
    activeItemNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;//
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 10000);
    const firstPromise = new Promise((rej) => {
      app.globalObj.apiConfig.getHeatingSystemList(_this.data.reqData)
        .then(res => {
          if (res.success) {
            _this.setData({
              heatSystemList: res.result.list
            })
            _this.data.reqData2.buildingId = res.result.list[0].value;
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
          rej();
        })
        .catch(err => {
          rej();
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    })
    firstPromise
      .then(() => {
        _this.goGetRealData();
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
    切换换热站系统
   */

  goChangeHeatSystem(e) {
    let _this = this,
      cur_index = e.detail.value;
    if (cur_index == _this.data.curSelectsystemIndex) {
      return;
    }
    _this.setData({
      'curSelectsystemIndex': cur_index
    })
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 10000);
    _this.data.reqData2.buildingId = _this.data.heatSystemList[cur_index].value;
    _this.goGetRealData();
  },

  // 活动项隐藏显示点击事件
  goChangeActiveItem(e) {
    let _this = this,
      cur_index = e.currentTarget.dataset.id;
    if (cur_index == _this.data.activeItemNum) {
      return;
    }
    _this.setData({
      'activeItemNum': cur_index
    })
  },

  /* 
   * 请求实时数据
   */
  goGetRealData() {
    let _this = this;
    // 连接
    app.globalObj.apiConfig.getHeatingQueryCityHeatDeviceReal(_this.data.reqData2)
      .then(res => {
        app.globalObj.apiConfig.goHideToast();
        if (res.success) {
          // _this.setData({
          //   responseData: res.result
          // })
          let a = Object.prototype.toString;
          let b = []
            , c = []
            , d = []
            , e = []
            , f = [];
          try {
            for (let i in res.result) {
              let cur_val = res.result[i];
              if (a.call(cur_val) === '[object Object]') {
                if (cur_val.value) {
                  if (cur_val.deviceType == 3) {
                    // 一次侧
                    if(i.indexOf('x2x') < 0) {
                      if (cur_val.dataName.indexOf('一次侧') == 0) {
                        cur_val.dataName = cur_val.dataName.substr(3, cur_val.dataName.length);
                      }else {
                        cur_val.dataName = cur_val.dataName.substr(2, cur_val.dataName.length);
                      }
                      b.push(cur_val)
                    }else {
                      // 二次侧
                      if (cur_val.dataName.indexOf('二次侧') == 0) {
                        cur_val.dataName = cur_val.dataName.substr(3, cur_val.dataName.length);
                      } else {
                        cur_val.dataName = cur_val.dataName.substr(2, cur_val.dataName.length);
                      }
                      c.push(cur_val)
                    }

                  } else if (cur_val.deviceType == 5) {
                    // 循环泵
                    d.push(cur_val)
                  } else if (cur_val.deviceType == 19||cur_val.deviceType == 8) {
                    // 补水泵
                    e.push(cur_val)
                  } else {
                    if (i != 'data1x8x1' && i != 'data7x3x1' && i != 'data3x9x1' && i != 'data1x7x1') {
                      f.push(cur_val)
                    }
                  }
                }
              }
            }
            // let e = b.concat(c);
            // let f = e.concat(d);
            // _this.data.responseRealData2 = f;
            _this.setData({
              'responseRealData': res.result,
              'responseRealData2': b,
              'responseRealData3': c,
              'responseRealData4': d,
              'responseRealData5': e,
            })
          } catch (err) {
            console.log(err);
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
})