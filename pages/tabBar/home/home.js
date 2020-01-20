// pages/tabBar/home/home.js
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    swipeHData: [
      {
        id: 1,
        systemName: '供电系统告警',
        num: 0
      },
      {
        id: 2,
        systemName: '供水系统告警',
        num: 0
      },
      {
        id: 3,
        systemName: '供水系统告警',
        num: 0
      }
    ],
    // 滚动条
    homeSwiperObj: {
      autoplay: true,
      interval: 3000,
      vertical: true,
      circular: true,
      num: 2,
      data: [
        {
          id: 1,
          systemName: '供电系统告警',
          num: 0
        },
        {
          id: 2,
          systemName: '供水系统告警',
          num: 0
        },
        {
          id: 2,
          systemName: '供水系统告警',
          num: 0
        }
      ]
    },
    currentTabItem: 0,
    eleObj: {
      today: 0,
      tomonth: 0,
      toyear: 0
    },
    waterObj: {
      today: 0,
      tomonth: 0,
      toyear: 0
    },
    heatObj: {
      today: 0,
      tomonth: 0,
      toyear: 0
    },
    todayWeather: {
      tmp: 0,
      cond_txt: '晴',
      wind_dir: '西北风',
      tmp_min: 0,
      tmp_max: 0,
      img_src: '../../../images/icon_weather/100.png'
    },
    historyWeatherArr: [],
    historyWeather: {
      tmp: 0,
      cond_txt: '晴',
      wind_dir: '西北风',
      tmp_min: 0,
      tmp_max: 0,
      img_src: '../../../images/icon_weather/100.png'
    },
    curWeatherData: null,
    isShow: false,
    showExtraIcon: false,
    getWarningNumTimer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  pageLifetimes: {
    show: function (options) {
      let _this = this;
      if (_this.data.isShow) {
        _this.getNumEvent();
        _this.loginedBackEvent('q');
        _this.getWarningNum();
        _this.getWeatherEvent();
        return;
      }
      app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
      wx.login({
        success(res) {
          if (res.code) {
            app.globalObj.apiConfig.getUserWXLogin({ 'code': res.code })
              .then(res => {
                if (res.success) {
                  if (res.result == 'unbind') {
                    wx.redirectTo({
                      url: '../../page/login/index'
                    })
                    // 去绑定
                  } else {
                    // 登录成功之后调用的接口
                    if (res.result.projectId == 1) {
                      _this.setData({
                        showExtraIcon: true
                      })
                    }
                    app.globalUserData.User_Info = res.result;
                    app.globalUserData.AuthDetecte = res.result.pagelist;
                    // 调用天气的接口
                    _this.getWeatherEvent();
                    _this.loginedBackEvent();
                    _this.getWarningNum();
                    _this.data.isShow = true;
                    app.globalObj.apiConfig.goHideToast();
                  }
                } else {
                  app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
                }
              })
              .catch(err => {
                app.globalObj.apiConfig.goHideToast();
                console.log(err)
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail(err) {
          app.globalObj.apiConfig.goHideToast();
          if (err.errMsg == "login:fail getaddrinfo ENOTFOUND servicewechat.com servicewechat.com:443") {

          }
        }
      })
    }
  },

  methods: {
    //tab切换
    goClickTabItem(e) {
      this.setData({
        currentTabItem: e.currentTarget.dataset.index
      })
    },

    // 首页菜单
    goClickHomeMenu(e) {
      let cur_info = e.currentTarget.dataset;
      switch (cur_info.index) {
        case "0":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/electricity/pages/eleMenu'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "1":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/water/pages/waterMenu'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "2":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/warm/pages/warmmenu'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "3":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/air/pages/airMenu'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "4":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/energy/pages/energyMenu'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "5":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            wx.navigateTo({
              url: '/pages/page/equipeManage/pages/index'
            })
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          // app.globalObj.apiConfig.goShowToast('敬请期待！', 'none', 2000, false);
          break;
        case "6":
          if(app.globalFun.authDetecte(cur_info.auth)) {
            let a = app.globalUserData.User_Info.roleId;
            if(a.length > 1) {
              wx.navigateTo({
                // 选择角色
                url: '/pages/page/repairs/pages/repairMange/repairSelect/index'
              })
            }else {
              if (a == 1 || a == 2 || a == 3) {
                wx.navigateTo({
                  // 管理员
                  url: '/pages/page/repairs/pages/repairMange/index'
                  // 普通用户
                  // url: '/pages/page/repairsUser/pages/repairMange/index'
                  // 工人
                  // url: '/pages/page/repairsWork/pages/repairMange/index'
                })
              } else if (a == 7) {
                wx.navigateTo({
                  // 管理员
                  // url: '/pages/page/repairs/pages/repairMange/index'
                  // 普通用户
                  // url: '/pages/page/repairsUser/pages/repairMange/index'
                  // 工人
                  url: '/pages/page/repairsWork/pages/repairMange/index'
                })
              } else if (a == 4) {
                wx.navigateTo({
                  // 管理员
                  // url: '/pages/page/repairs/pages/repairMange/index'
                  // 普通用户
                  url: '/pages/page/repairsUser/pages/repairMange/index'
                  // 工人
                  // url: '/pages/page/repairsWork/pages/repairMange/index'
                })
              } else {
                app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
              }
            }
          }else {
            app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
          }
          break;
        case "8":
          wx.navigateTo({
            url: '/pages/page/my/pages/benefit/index'
          })
          break;
      }
    },

    // 登录成功之后调用的接口
    loginedBackEvent(e) {
      let _this = this;
      // if(!e) {
      //   app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
      // }
      // ========= 获取电的当年、当月、当日能耗
      app.globalObj.apiConfig.getEleSchoolEnergyData(null)
        .then(res => {
          _this.setData({
            'eleObj': {
              'today': res.result.realTimeConSum.dayCon.toFixed(1),
              'tomonth': res.result.realTimeConSum.monthCon.toFixed(1),
              'toyear': res.result.realTimeConSum.yearCon.toFixed(1)
            }
          })
          app.globalObj.apiConfig.goHideToast();
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
      const secondPromise = new Promise(rej => {
        // ========= 获取水的当年、当月、当日能耗
        app.globalObj.apiConfig.getSchoolWaterDosage()
          .then(res => {
            rej();
            _this.setData({
              'waterObj': {
                'today': res.result.dayconsume.toFixed(1),
                'tomonth': res.result.monthconsume.toFixed(1),
                'toyear': res.result.yearconsume.toFixed(1)
              }
            })
          })
          .catch(err => {
            rej();
            app.globalObj.apiConfig.goHideToast();
            console.log(err);
          })
      })
      secondPromise
        .then(() => {
          // ========= 获取用暖的当年、当月、当日能耗
          app.globalObj.apiConfig.getHeatingSystemEnergy({
            'systemId': 3,
            'subsystemId': 3,
            'query': 1,
          }).then(res => {
            _this.setData({
              'heatObj': {
                'today': res.result.dayconsume.toFixed(1),
                'tomonth': res.result.monthconsume.toFixed(1),
                'toyear': res.result.yearconsume.toFixed(1)
              }
            })
          })
            .catch(err => {
              app.globalObj.apiConfig.goHideToast();
              console.log(err)
            })
        })
      app.globalObj.apiConfig.getSystemAllPro()
        .then(res => {
          if (res.success) {
            let a = app.globalUserData.User_Info.preprojectId;
            res.result.forEach((item, index) => {
              if (item.id == a) {
                wx.setNavigationBarTitle({
                  title: item.name//页面标题为路由参数
                })
              }
            })
            app.globalObj.apiConfig.goHideToast();
          } else {
            app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 2000, false);
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    },

    // 获取告警数量的接口
    getWarningNum() {
      let _this = this;
      if(_this.data.getWarningNumTimer) {
        return;
      }
      _this.getNumEvent();
      _this.data.getWarningNumTimer = setInterval(()=> {
        _this.getNumEvent()
      }, 60000)
    },

    getNumEvent() {
      let _this = this;
      app.globalObj.apiConfig.getAlarmAllNum(null)
        .then(res => {
          if (res.success) {
            if (res.result.list.length > 0) {
              if (res.result.list.length == 1 || res.result.list.length == 2) {
                res.result.list.push(
                  {
                    id: 3,
                    systemName: '系统告警',
                    num: 0
                  },
                  {
                    id: 3,
                    systemName: '告警信息',
                    num: 0
                  }
                )
              }
              let a = 'homeSwiperObj.data';
              _this.setData({
                'curIndex': 0,
                [a]: res.result.list
              })
            }else {
              let a = 'homeSwiperObj.data';
              _this.setData({
                'curIndex': 0,
                [a]: _this.data.swipeHData
              })
            }
          }
          app.globalObj.apiConfig.goHideToast();
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    },

    // 获取天气的接口
    getWeatherEvent() {
      let _this = this;
      // ========= 获取天气的接口
      app.globalObj.apiConfig.getQueryWeather(null)
        .then(res => {
          if(res.success&&res.result.length>0) {
            _this.setData({
              'todayWeather': {
                'wind_dir': res.result[0].wind_dir,
                'tmp': res.result[0].tmp,
                'cond_txt': res.result[0].cond_txt,
                'img_src': `../../../images/icon_weather/${res.result[0].cond_code}.png`,
                'tmp_max': res.result[0].tmp_max,
                'tmp_min': res.result[0].tmp_min
              }
            })
            _this.setData({
              'historyWeather': {
                'wind_dir': res.result[1].wind_dir,
                'tmp': res.result[1].tmp,
                'cond_txt': res.result[1].cond_txt,
                'img_src': `../../../images/icon_weather/${res.result[1].cond_code}.png`,
                'tmp_max': res.result[1].tmp_max,
                'tmp_min': res.result[1].tmp_min
              }
            })
            wx.setStorage({
              key: "WEATHERDATA",
              data: JSON.stringify(res.result)
            })
          }else {
            _this.historyWeatherDispose()
          }
        })
        .catch(err => {
          app.globalObj.apiConfig.goHideToast();
          console.log(err)
        })
    },

    // 历史天气的处理
    historyWeatherDispose() {
      let _this = this;
      try {
        wx.getStorage({
          key: 'WEATHERDATA',
          success(res) {
            let a = JSON.parse(res.data);
            _this.setData({
              'todayWeather': {
                'wind_dir': a[0].wind_dir,
                'tmp': a[0].tmp,
                'cond_txt': a[0].cond_txt,
                'img_src': `../../../images/icon_weather/${a[0].cond_code}.png`,
                'tmp_max': a[0].tmp_max,
                'tmp_min': a[0].tmp_min
              },
              'historyWeather': {
                'wind_dir': a[1].wind_dir,
                'tmp': a[1].tmp,
                'cond_txt': a[1].cond_txt,
                'img_src': `../../../images/icon_weather/${a[1].cond_code}.png`,
                'tmp_max': a[1].tmp_max,
                'tmp_min': a[1].tmp_min
              }
            })
          },
          fail(err) {
            console.log('什么都没有')
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 请求失败 获取本地的天气信息
    historyWeather() {
      let _this = this;
      try {
        wx.getStorage({
          key: 'WEATHERDATA',
          success(res) {
            let a = JSON.parse(res.data);
            // console.log(res);
            let d = a[0];
            let f = a[1];
            let g = ((+d.data.tmp_max) + (+d.data.tmp_min)) / 2;
            let g2 = ((+f.data.tmp_max) + (+f.data.tmp_min)) / 2;
            _this.setData({
              'historyWeather': {
                'wind_dir': d.data.wind_dir,
                'tmp': parseInt(g),
                'cond_txt': d.data.cond_txt_d,
                'tmp_min': d.data.tmp_min,
                'tmp_max': d.data.tmp_max,
                'img_src': `../../../images/icon_weather/${d.data.cond_code_d}.png`
              },
              'tmp_min': d.data.tmp_min,
              'tmp_max': d.data.tmp_max,
              'tmp_min2': f.data.tmp_min,
              'tmp_max2': f.data.tmp_max
            })
          },
          fail(err) {
            
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 查看学校用电
    goLookSchoolEle() {
      wx.navigateTo({
        url: '/pages/page/electricity/pages/schoolEle/schoolEle',
      })
    },
    // 查看学校用水
    goLookSchoolWater() {
      wx.navigateTo({
        url: '/pages/page/water/pages/energy/energy',
      })
    },
    // 查看学校用暖
    goLookSchoolWarm() {
      wx.navigateTo({
        url: '/pages/page/warm/pages/heatExchange/index',
      })
    },
    // 查看消息
    goLookAllMessage(e) {
      let _this = this
        , cur_info = e.currentTarget.dataset;
      if(app.globalFun.authDetecte(cur_info.auth)) {
        let a = app.globalUserData.User_Info.projectId;
        if(a == 1) {
          wx.navigateTo({
            url: '/pages/page/message/pages/index'
            // url: `/pages/page/message/pages/index?options=2&id=1&project_id=3&uid=13&info_flag=1`
          })
        } else {
          wx.navigateTo({
            url: '/pages/page/messageuser/pages/index',
          })
        }
      }else {
        app.globalObj.apiConfig.goShowToast('您没有权限操作', 'none', 2000, false);
      }
    }
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

  }
})