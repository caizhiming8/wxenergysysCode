// pages/page/my/pages/benefit/extraDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoObj: {},
    uploadVideoArr: [],
    uploadImgArr: [],
    
    // 系统列表
    systemArray: [
      {
        id: 1,
        label: '供水系统'
      },
      {
        id: 2,
        label: '供电系统'
      },
      {
        id: 3,
        label: '集中供暖'
      },
      {
        id: 4,
        label: '中央空调'
      }
    ],
    cur_sysIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
      , data = this.data
      , cur_info = JSON.parse(options.info);
    let videoArr = [];
    let imgArr = [];
    let cur_sysIndex = 0;
    if(cur_info.video_path) {
      videoArr = cur_info.video_path.split(',');
    }
    if(cur_info.img_path) {
      imgArr = cur_info.img_path.split(',');
    }
    data.systemArray.forEach((item,index)=> {
      if(item.id == cur_info.system_id) {
        cur_sysIndex = index;
      }
    })
    _this.setData({
      cur_sysIndex: cur_sysIndex,
      infoObj: cur_info,
      uploadVideoArr: videoArr,
      uploadImgArr: imgArr
    })
  },

  // 预览图片
  goPreImg(e) {
    let _this = this
    , cur_info = e.currentTarget.dataset.info;
    console.log(_this.data.uploadImgArr)
    console.log(cur_info)
    wx.previewImage({
      current: cur_info,
      urls: _this.data.uploadImgArr
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})