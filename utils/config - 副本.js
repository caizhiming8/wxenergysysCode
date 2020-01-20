// 请求地址
let testHost = 'http://192.168.0.131:8081/BMPlatServers'; // 本地地址
// let testHost = 'http://47.93.46.81:8080/BMPlatServers'; // 阿里云地址

var apiConfig = {
  // 获取校园当年、当月、当年的用水量
  getSchoolWaterDosage: function() {
    return requestConfig(`${testHost}/water/querySchoolWater`, {}, 'POST')
  },
  // 获取拱水系统下的楼宇
  getSchoolWaterBuilds: function () {
    return requestConfig(`${testHost}/common/queryWaterBuildings`, {}, 'POST')
  },
  // 获取楼宇当年、当月、当年的用水量
  getBuildWaterDosage: function (data) {
    return requestConfig(`${testHost}/water/queryBuildingWater`, data, 'POST')
  },
  // 获取NB水表/采集器连接状态--flag =1 NB水表 flag=2 采集器连接状态
  getNBMeterState: function (data) {
    return requestConfig(`${testHost}/water/queryDevcieState`, data, 'POST')
  },
  // 查询供水系统供夜间小流量设备间的对比
  getWaterQueryNightLeak: function (data) {
    return requestConfig(`${testHost}/water/queryNightLeak`, data, 'POST')
  },
  // 查询供水系统供夜间小流量设备
  getWaterNightEquipment: function (data) {
    return requestConfig(`${testHost}/water/queryNightDevice`, data, 'POST')
  },
  // 查询供水系统-夜间小流量-同设备之比-柱状图
  getWaterNightSmallEquipment: function (data) {
    return requestConfig(`${testHost}/water/queryDevcieNightLeak`, data, 'POST')
  },
  // 查询供水系统-夜间小流量-同设备之比-table表格
  getWaterNightSmallEquipmentTable: function (data) {
    return requestConfig(`${testHost}/water/queryDevcieNightLeakPage`, data, 'POST')
  },
  // 查询供水系统-DMA分区-出入水表耗水量-table表格
  getWaterDMAInOutTable: function (data) {
    return requestConfig(`${testHost}/water/queryWaterAreaInfoWechat`, data, 'POST')
  },
  // 查询供水系统-DMA分区-分区列表
  getWaterDMASubareaList: function (data) {
    return requestConfig(`${testHost}/water/queryWaterArea`, data, 'POST')
  },
  // 查询供水系统-DMA分区-分区列表
  getWaterDMASubareaListData: function (data) {
    return requestConfig(`${testHost}/water/queryAreaBranchWechat`, data, 'POST')
  },

  // 消息提示接口
  goShowToast: function (title='暂无提示',icon='none',time=2000) {
    wx.showToast({
      title: title ? title : '暂无提示',
      icon: icon ? icon : 'none',
      duration: time ? time : 2000,
      mask: true
    })
  },
  // 隐藏提示接口
  goHideToast: function () {
    wx.hideToast()
  }

}

function requestConfig(router, data, method) {
  // 返回promise
  return new Promise((resolve, reject) => {
    // 请求
    wx.request({
      url: `${router}`,
      data: data,
      method: method,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        switch (res.statusCode) {
          case 200:
            resolve(res.data)
            break;
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

module.exports = apiConfig;