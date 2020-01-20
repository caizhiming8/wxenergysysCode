// pages/page/my/pages/benefit/addNewExtra/index.js
const app = getApp();
const currentTime = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最大的超额日期
    maxExtraDate: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`,
    extraDate: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`,
    extraTime: `${currentTime.getHours()}:${currentTime.getMinutes()>=10?currentTime.getMinutes():'0'+currentTime.getMinutes()}`,
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
    // 当前系统
    cur_sysIndex: 0,
    // 当日能耗
    cur_dayEnergy: '',
    // 当日定额
    cur_dayQuota: '',

    reqData: {
      year: '',
      month: '',
      day: '',
      over_time: '',
      projectId: app.globalUserData.User_Info.preprojectId,
      consum: '',
      quota: '',
      reason: '',
      pageSize: 10,
      currentPage: 1,
      system_id: 1,
      img_path: '',
      shipin_path: '',
      queryFlag: ''
    },
    uploadImgArr: [],
    uploadVideoArr: [],
    textLength: 0,
    showChoose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 改变超额时间
  bindDateChange: function(e) {
    this.setData({
      extraDate: e.detail.value
    })
  },
  // 改变超额时间
  bindTimeChange: function(e) {
    this.setData({
      extraTime: e.detail.value
    })
  },

  // 切换超额系统
  goBindPickerChangeSys(e) {
    let _this = this
      , cur_index = e.detail.value;
    if (cur_index == _this.data.cur_sysIndex) {
      return;
    }
    _this.setData({
      cur_sysIndex: cur_index
    })
    _this.data.reqData.system_id = _this.data.systemArray[cur_index].id;
  },

  // 输入当日能耗
  goInputEnergy(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.consum = cur_info;
  },

  // 输入当日定额
  goInputQuota(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.quota = cur_info;
  },

  /* 
   * 输入详细描述
   */
  goInputTextarea(e) {
    let _this = this
      , cur_info = e.detail.value;
    _this.data.reqData.reason = cur_info;
    _this.setData({
      'textLength': cur_info.length
    })
  },

  // 上传图片
  goUpLoadImg() {
    let _this = this;
    _this.setData({
      showChoose: false
    })
    if(_this.data.uploadImgArr.length==9) {
      app.globalObj.apiConfig.goShowToast('最多上传九个', 'none', 1500, true);
      return;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const imgSize = res.tempFiles[0].size;
        if (imgSize > 5242880) {
          app.globalObj.apiConfig.goShowToast('图片大小已超5M', 'none', 1500, true);
        } else {
          app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
          wx.uploadFile({
            url: app.globalObj.apiConfig.testHost + '/file/uploadPicture', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'Authorization': app.globalUserData.Token
            },
            success(res) {
              try{
                app.globalObj.apiConfig.goHideToast();
                let cur_info = JSON.parse(res.data);
                if (cur_info.success) {
                  _this.data.reqData.repairImg = cur_info.result.filename;
                  _this.data.uploadImgArr.push({
                    value: cur_info.result.filepath,
                    label: cur_info.result.filename
                  })
                  _this.setData({
                    uploadImgArr: _this.data.uploadImgArr
                  })
                  _this.setData({
                    'uploadImgSrc': 'data:image/jpeg;base64,'
                      + wx.getFileSystemManager().readFileSync(tempFilePaths[0], 'base64'),
                    'upLoadSuccess': true
                  })
                }
              }catch(err) {
                console.log(err)
                app.globalObj.apiConfig.goShowToast('出错了', 'none', 1500, true);
              }
            },
            fail(res) {
              console.log(res)
              app.globalObj.apiConfig.goShowToast('上传失败', 'none', 1500, true);
            }
          })
        }
      }
    })
  },

  // 删除图片
  goDeleteImg(e) {
    let _this = this
      , cur_info = e.currentTarget.dataset.id
      , cur_index = e.currentTarget.dataset.index;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getBenefitDeleteImg({filename: cur_info.label})
      .then(res => {
        if (res.success) {
        _this.data.uploadImgArr.splice(cur_index,1);
        _this.setData({
          'uploadImgArr': _this.data.uploadImgArr
        })
        app.globalObj.apiConfig.goHideToast();
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 上传视频
  goUpLoadVideo() {
    var _this = this;
    _this.setData({
      showChoose: false
    })
    if(_this.data.uploadVideoArr.length==9) {
      app.globalObj.apiConfig.goShowToast('最多上传九个', 'none', 1500, true);
      return;
    }
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
        const imgSize = res.size;
        if (imgSize > 10485760) {
          app.globalObj.apiConfig.goShowToast('视频大小已超10M', 'none', 1500, true);
        } else {
          app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
          wx.uploadFile({
            url: app.globalObj.apiConfig.testHost + '/file/uploadPicture', //仅为示例，非真实的接口地址
            filePath: res.tempFilePath,
            name: 'file',
            header: {
              'Authorization': app.globalUserData.Token
            },
            success(res) {
              try{
                app.globalObj.apiConfig.goHideToast();
                console.log(res)
                let cur_info = JSON.parse(res.data);
                if (cur_info.success) {
                  _this.data.uploadVideoArr.push({
                    value: cur_info.result.filepath,
                    label: cur_info.result.filename
                  })
                  _this.setData({
                    uploadVideoArr: _this.data.uploadVideoArr
                  })
                }
              }catch(err) {
                console.log(err)
                app.globalObj.apiConfig.goShowToast('出错了', 'none', 1500, true);
              }
            },
            fail(res) {
              console.log(res)
              app.globalObj.apiConfig.goShowToast('上传失败', 'none', 1500, true);
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 删除视频
  goDeleteVideo(e) {
    let _this = this
    , cur_info = e.currentTarget.dataset.id
    , cur_index = e.currentTarget.dataset.index;
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getBenefitDeleteImg({filename: cur_info.label})
      .then(res => {
        if (res.success) {
        _this.data.uploadVideoArr.splice(cur_index,1);
        _this.setData({
          'uploadVideoArr': _this.data.uploadVideoArr
        })
        app.globalObj.apiConfig.goHideToast();
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  /* 
   * 提交表单
   */
  goSubmitForm() {
    let _this = this
      , subData = _this.data.reqData
      , data = this.data;
    const aaa = data.extraDate.split('-');
    subData.year = aaa[0];
    subData.month = aaa[1];
    subData.day = aaa[2];
    subData.over_time = `${data.extraDate} ${data.extraTime}`;
    subData.img_path = JSON.stringify(data.uploadImgArr);
    subData.shipin_path = JSON.stringify(data.uploadVideoArr);
    // if (!subData.consum) {  
    //   app.globalObj.apiConfig.goShowToast('请输入当日能耗', 'none', 1500, true);
    //   return;
    // }
    // if (!subData.quota) {
    //   app.globalObj.apiConfig.goShowToast('请输入当日定额', 'none', 1500, true);
    //   return;
    // }
    if (!subData.reason) {
      app.globalObj.apiConfig.goShowToast('请输入详细描述', 'none', 1500, true);
      return;
    }
    app.globalObj.apiConfig.goShowToast('加载中', 'loading', 15000);
    app.globalObj.apiConfig.getBenefitAddOverConsum(_this.data.reqData)
      .then(res => {
        if (res.success) {
          app.globalObj.apiConfig.goShowToast('创建成功', 'none', 1500, true);
          setTimeout(()=> {
            wx.navigateBack({})
          },1500)
        } else {
          app.globalObj.apiConfig.goShowToast(res.resultMessage, 'none', 1500, true);
        }
      })
      .catch(err => {
        app.globalObj.apiConfig.goHideToast();
        console.log(err)
      })
  },

  // 显示选择模态窗
  goShowChooseModel() {
    this.setData({
      showChoose: true
    })
  },

  // 取消
  goCancel() {
    this.setData({
      showChoose: false
    })
  } 
})