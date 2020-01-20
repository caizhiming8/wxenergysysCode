// pages/page/repairsUser/pages/repairMange/appraiseView/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数,
    pingjiaText: '',
    reqData: {
      result: 0,
      evaluation: '',
      flag: 3,
      id: '',
      userId: app.globalUserData.User_Info.userId
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cur_info = JSON.parse(options.id);
    this.data.reqData.id = cur_info.id;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  // 提交清空当前值
  bindSubmit: function () {
    var _this = this;
    if(!_this.data.flag) {
      app.globalObj.apiConfig.goShowToast('请选择评级', 'none', 1500, false);
      return;
    }
    if (!_this.data.info) {
      app.globalObj.apiConfig.goShowToast('请填写评价', 'none', 1500, false);
      return;
    }
    _this.data.reqData.result = _this.data.flag;
    _this.data.reqData.evaluation = _this.data.info;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getRepairsUpdateApplyList(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goHideToast();
          app.globalObj.apiConfig.goShowToast('评论成功', 'none', 1500, true);
          setTimeout(()=> {
            wx.navigateBack({})
          }, 1500)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })

  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1,
      pingjiaText: '极差'
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2,
      pingjiaText: '失望'
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3,
      pingjiaText: '一般'
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4,
      pingjiaText: '满意'
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5,
      pingjiaText: '惊喜'
    });
  },
})