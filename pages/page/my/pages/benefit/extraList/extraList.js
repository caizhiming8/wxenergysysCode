// pages/page/my/pages/benefit/extraList/extraList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newViewPosition: {
      'newRight': 30,
      'newBottom': 160
    },
    reqData1: {
      year: '',
      month: '',
      queryFlag: 1,
      pageSize: 100,
      currentPage: 1,
      projectId: app.globalUserData.User_Info.preprojectId
    },
    responseData: [],
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
      key: 'ADD_APPLAY',
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
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 5000);
    app.globalObj.apiConfig.getBenefitExtraListData(_this.data.reqData1)
      .then(res => {
        if (res.success) {
          if(res.result.list.length>0) {
            _this.setData({
              responseData: res.result.list,
              showNoContent: true
            })
          }
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

  /* 
   * 增加新的超额记录
   */
  goAddNewExtra() {
    wx.navigateTo({
      url: '../addNewExtra/index',
    })
  },
  /* 
   * 拖动
   */
  goViewTouchMove(e) {
    let _this = this
      , winHeight = this.data.systemView.windowHeight
      , winWidth = this.data.systemView.windowWidth
      , newBottom = _this.data.systemView.windowHeight - e.touches[0].clientY - 22
      , right = 0
      , bottom = 0;
    if (winHeight - newBottom <= 22) {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = winHeight - 22;
    } else if (newBottom <= 0) {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = 0;
    } else {
      right = _this.data.systemView.windowWidth - e.touches[0].clientX - 22;
      bottom = _this.data.systemView.windowHeight - e.touches[0].clientY - 22;
    }
    this.setData({
      newViewPosition: {
        'newRight': right,
        'newBottom': bottom
      }
    })
    wx.setStorage({
      key: 'ADD_APPLAY',
      data: JSON.stringify({
        'right': right,
        'bottom': bottom
      })
    })
  },

  // 查看详情
  goLookDetail(e) {
    let _this = this
      , data = this.data
      , cur_info = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../extraDetail/index?info=${JSON.stringify(cur_info)}`,
    })
  }
})