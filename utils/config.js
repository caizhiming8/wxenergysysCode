// 请求地址
// let testHost = 'https://192.168.0.101:8088/BMPlatServers'; // 本地地址
// let testHost = 'https://47.93.46.81:8088/BMPlatServers'; // 阿里云地址
let testHost = 'https://ems.blueoceanelec.com:8088/BMPlatServers'; // 阿里云地址

var apiConfig = {
  testHost: testHost,
  /* 
   * 小程序登录接口
   */
  getUserWXLogin: function (data) {
    return requestConfig2(`${testHost}/login/wxbind`, data, 'POST')
  },
  /* 
   * 登录接口
   */
  getUserLogin: function(data) {
    return requestConfig2(`${testHost}/login/userlogin`, data, 'POST')
  },
  /* 
   * 修改密码
   */
  getChangePass: function (data) {
    return requestConfig(`${testHost}/authority/resetpassword`, data, 'POST')
  },
  /* 
   * 退出登录
   */
  getUserOutSystem: function (data) {
    return requestConfig(`${testHost}/login/loginout`, data, 'POST')
  },
  /* 
   * 查询所有项目
   */
  getSystemAllPro: function (data) {
    return requestConfig(`${testHost}/common/queryprojects`, data, 'POST')
  },
  /* 
   * 切换项目
   */
  getChangeSystem: function (data) {
    return requestConfig(`${testHost}/common/changeProjectId`, data, 'POST')
  },
  /* 
   * 查询系统列表
   */
  getAllSystemList: function (data) {
    return requestConfig(`${testHost}/common/querySystemTree`, data, 'POST')
  },
  /* 
   * 查询楼宇信息
   */
  getAllBuildingList: function (data) {
    return requestConfig(`${testHost}/common/queryallbuilds`, data, 'POST')
  },
  /* 
   * 查询楼层信息
   */
  getAllFloorsList: function (data) {
    return requestConfig(`${testHost}/common/queryfloors`, data, 'POST')
  },
  /* 
   * 查询房间信息
   */
  getAllRoomsList: function (data) {
    return requestConfig(`${testHost}/common/queryazrooms`, data, 'POST')
  },
  /* 
   * 查询设备类型列表
   */
  getAllDeviceList: function (data) {
    return requestConfig(`${testHost}/common/findDeviceType`, data, 'POST')
  },
  /* 
   * 查询设备类型列表
   */
  getAllDeviceInfo: function (data) {
    return requestConfig(`${testHost}/common/findDeviceinfo`, data, 'POST')
  },
  /* 
   * 获取设备的分类列表
   */
  getAllDeviceTypeList: function (data) {
    return requestConfig(`${testHost}/common/queryDevcieType`, data, 'POST')
  },
  /* 
   * 查询设备的告警预设值
   */
  getQueryDeviceWarnList: function (data) {
    return requestConfig(`${testHost}/common/queryDeviceThreshold`, data, 'POST')
  },
  /* 
   * 查询设备的告警预设值类型
   */
  getQueryDeviceWarnTypeList: function (data) {
    return requestConfig(`${testHost}/common/queryDeviceData`, data, 'POST')
  },
  /* 
   * 增加设备的预设告警
   */
  getAddDeviceWarnList: function (data) {
    return requestConfig(`${testHost}/common/setDeviceThreshold`, data, 'POST')
  },
  /* 
   * 增加设备的预设告警
   */
  getUpdateDeviceWarnList: function (data) {
    return requestConfig(`${testHost}/common/updateDeviceThreshold`, data, 'POST')
  },
  /* 
   * 查询各个楼宇系统
   */
  getQueryAllBuildingList: function (data) {
    return requestConfig(`${testHost}/common/queryHvacTree`, data, 'POST')
  },
  /* 
   * 查询今日昨日天气
   */
  getQueryWeather: function (data) {
    return requestConfig(`${testHost}/common/queryWeather`, data, 'POST')
  },
  /* 
    -------------------------------供水
   */
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
    return requestConfig(`${testHost}/water/queryNightLeakPage`, data, 'POST')
  },
  // 查询供水系统供夜间小流量设备
  getWaterNightEquipment: function (data) {
    return requestConfig(`${testHost}/water/queryNightDevice`, data, 'POST')
  },
  // 查询供水系统-夜间小流量-设备间比-柱状图
  getWaterNightEquipmentTable: function (data) {
    return requestConfig(`${testHost}/water/queryNightLeak`, data, 'POST')
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
  getWaterDMAEchartsData: function (data) {
    return requestConfig(`${testHost}/water/queryAreaBranchWechat`, data, 'POST')
  },
  // 水表状态
  getWaterDeviceStateList: function (data) {
    return requestConfig(`${testHost}/water/queryWaterStatus`, data, 'POST')
  },
  // 校园历史能耗
  getWaterHistoryEnergyData: function (data) {
    return requestConfig(`${testHost}/water/querySchoolHistory`, data, 'POST')
  },
  // 楼宇历史能耗
  getWaterBuildingHistoryEnergyData: function (data) {
    return requestConfig(`${testHost}/water/queryBuildingHistory`, data, 'POST')
  },
  /* 
    -------------------------------供暖
   */
  getHeatingGridBalance: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryHeatGridBalance`, data, 'POST')
  },
  // 设置阈值
  getHeatingSetThreshold: function (data) {
    return requestConfig(`${testHost}/hvacheat/addBuildingTemperature`, data, 'POST')
  },
  getHeatingSystemList: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryBuildings`, data, 'POST')
  },
  getHeatingSystemEnergy: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryCityHeat`, data, 'POST')
  },
  // 查询暖通系统下楼前系统耗热量对比
  getHeatingEnergyContrast: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryBuildingsConsume`, data, 'POST')
  }, 
  // 查询暖通系统下楼前系统耗热量对比
  getHeatingEnergyData: function(data) {
    return requestConfig(`${testHost}/hvacheat/queryCityHeatDeviceRealWechat`, data, 'POST')
  },
  // 换热站实时数据采集
  getHeatingQueryCityHeatDeviceReal: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryCityHeatDeviceReal`, data, 'POST')
  },
  // 换热站的历史数据
  getHeatingQueryExchangeHistory: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryCityHeatHistory`, data, 'POST')
  },
  /* 
    -------------------------------中央空调
   */
  // 中央空调下的楼宇系统
  getAirBuildSystem: function (data) {
    return requestConfig(`${testHost}/conditioner/queryBuildingList`, data, 'POST')
  },
  // 中央空调下的楼宇系统-房间列表
  getAirBuildSystemRoom: function (data) {
    return requestConfig(`${testHost}/conditioner/queryRoomsByBuildingId`, data, 'POST')
  },
  // 中央空调下的楼宇系统-房间列表
  getAirBuildSystemRoomData: function (data) {
    return requestConfig(`${testHost}/conditioner/queryRoomCurrentConsume`, data, 'POST')
  },
  // 中央空调下的楼宇系统-房间历史能耗
  getAirBuildSystemRoomHistoryData: function (data) {
    return requestConfig(`${testHost}/conditioner/queryRoomHistoryConsume`, data, 'POST')
  },
  /* 
    -------------------------------供电
   */
  // 获取学校的能耗数据-年、月、日
  getEleSchoolEnergyData: function (data) {
    return requestConfig(`${testHost}/electricity/queryEnergyUsage`, data, 'POST')
  },
  // 查询楼宇实时用电量-年、月、日
  getEleBuildEnergyData: function (data) {
    return requestConfig(`${testHost}/electricity/querybuildrealenereffi`, data, 'POST')
  },
  // 查询房间实时用电量-年、月、日
  getEleBuild_RoomEnergyData: function (data) {
    return requestConfig(`${testHost}/electricity/querydevicecontr`, data, 'POST')
  },
  // 查询楼宇列表
  getEleBuildListData: function (data) {
    return requestConfig(`${testHost}/common/queryBuildings`, data, 'POST')
  },
  // 查询楼宇下的房间列表
  getEleBuild_RoomListData: function (data) {
    return requestConfig(`${testHost}/common/queryElecRooms`, data, 'POST')
  },
  // 查询-采集器设备状态
  getEleCollectorStateData: function (data) {
    return requestConfig(`${testHost}/electricity/queryDeviceStatus`, data, 'POST')
  },
  // 获取子系统列表
  getEleSubSystemList: function (data) {
    return requestConfig(`${testHost}/electricity/querysubinfo`, data, 'POST')
  },
  // 查询-子系统的用电能耗
  getEleSubSystemEneryData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubrealcons`, data, 'POST')
  },
  // 查询子系统楼宇实时用电量-年、月、日
  getEleSubBuildEnergyData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubbuidrealcons`, data, 'POST')
  },
  // 查询子系统房间实时用电量-年、月、日electricity/querysubroomhisbysjd
  getEleSubBuild_RoomEnergyData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubroomshiscons`, data, 'POST')
  },
  // 电表状态 electricity/queryElecStatus
  getEleDeViceStateListData: function (data) {
    return requestConfig(`${testHost}/electricity/queryElecStatus`, data, 'POST')
  },
  // 系统历史用电趋势图数据
  getEleSystemHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/queryhistoryconsum`, data, 'POST')
  },
  // 楼宇历史用电趋势图数据
  getEleBuildingHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/querybuildhisenereffi`, data, 'POST')
  },
  // 房间历史用电趋势图数据
  getEleRoomHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/queryroomshiscons`, data, 'POST')
  },
  // 子系统历史用电趋势图数据
  getEleSubSystemHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubhistoryconsum`, data, 'POST')
  },
  // 子系统历史用电趋势图数据-楼宇
  getEleSubSystemBuildingHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubbuildhisenereffi`, data, 'POST')
  },
  // 子系统历史用电趋势图数据-房间
  getEleSubSystemRoomHistoryData: function (data) {
    return requestConfig(`${testHost}/electricity/querysubroomshiscons`, data, 'POST')
  },
  /* 
    -------------------------------能耗定额
   */
  // 定额考核对比页面的接口
  getQuotaContrastDataList: function (data) {
    return requestConfig(`${testHost}/consum/queryalldepcons`, data, 'POST')
  },
  // 获取二级单位 列表
  getQuotaRankUnitList: function (data) {
    return requestConfig(`${testHost}/common/departlist`, data, 'POST')
  },
  // 获取二级单位-实时定额考核/房间定额考核
  getQuotaRealTimeData: function (data) {
    return requestConfig(`${testHost}/consum/querydepqurealcons`, data, 'POST')
  },
  // 获取二级单位-所有房间的-总定额考核
  getQuotaAllRoomsData: function (data) {
    return requestConfig(`${testHost}/consum/queryallroomscons`, data, 'POST')
  },
  // 获取二级单位-房间列表
  getQuotaAllRoomsList: function (data) {
    return requestConfig(`${testHost}/common/queryzgdepartrooms`, data, 'POST')
  },
  // 获取二级单位-周期
  getQuotaAllPeriodList: function (data) {
    return requestConfig(`${testHost}/consum/queryperiod`, data, 'POST')
  },
  // 获取二级单位-周期下的年
  getQuotaAllPeriodYearList: function (data) {
    return requestConfig(`${testHost}/consum/queryyears`, data, 'POST')
  },
  /* 
    -------------------------------报修管理
   */
  // 查询所有区域
  getRepairsAllAreasList: function (data) {
    return requestConfig(`${testHost}/repair/queryBuildings`, data, 'POST')
  },
  // 查询所有地点
  getRepairsAllSiteList: function (data) {
    return requestConfig(`${testHost}/repair/queryRooms`, data, 'POST')
  },
  // 查询所有类型
  getRepairsAllTypeList: function (data) {
    return requestConfig(`${testHost}/repair/queryRepairType`, data, 'POST')
  },
  // 查询所有维修项目
  getRepairsAllItemsList: function (data) {
    return requestConfig(`${testHost}/repair/queryRepairProject`, data, 'POST')
  },
  // 申请报修
  getRepairsNewApplay: function (data) {
    return requestConfig(`${testHost}/repair/addRepairItem`, data, 'POST')
  },
  // 获取报修列表
  getRepairsList: function (data) {
    return requestConfig(`${testHost}/repair/queryRepairList`, data, 'POST')
  },
  // 获取维修工列表
  getRepairsPeopleList: function (data) {
    return requestConfig(`${testHost}/repair/queryRepairPersonList`, data, 'POST')
  },
  // 获取维修工列表
  getRepairsUpdateApplyList: function (data) {
    return requestConfig(`${testHost}/repair/updateRepairItem`, data, 'POST')
  },
  // 查看维修详情
  getRepairsLookDetail: function (data) {
    return requestConfig(`${testHost}/repair/queryRepairProgress`, data, 'POST')
  },
  // 报修查询设备名称
  getRepairsQueryDeviceName: function (data) {
    return requestConfig(`${testHost}/repair/queryDeviceList`, data, 'POST')
  },
  /* 
    -------------------------------设备管理
   */
  // 查询设备列表
  getEquipeAllList: function (data) {
    return requestConfig(`${testHost}/device/findDevice`, data, 'POST')
  },
  // 设备出档
  getEquipeDeviceOut: function (data) {
    return requestConfig(`${testHost}/device/deviceOut`, data, 'POST')
  },
  // 设备巡检
  getEquipePollList: function (data) {
    return requestConfig(`${testHost}/device/findexam`, data, 'POST')
  },
  // 查询用户列表
  getEquipeUserList: function (data) {
    return requestConfig(`${testHost}/device/userList`, data, 'POST')
  },
  // 获取巡检记录
  getEquipeRenPollList: function (data) {
    return requestConfig(`${testHost}/device/getexamlog`, data, 'POST')
  },
  // 修改巡检的启用和禁用状态
  getEquipePollState: function (data) {
    return requestConfig(`${testHost}/device/startexam`, data, 'POST')
  },
  // 删除巡检的表单
  getEquipePollDelete: function (data) {
    return requestConfig(`${testHost}/device/deleteExam`, data, 'POST')
  }, 
  // 获取系统的子系统
  getEquipeSubDevice: function (data) {
    return requestConfig(`${testHost}/device/findSubSystem`, data, 'POST')
  },
  // 新建设备巡检
  getEquipeAddApply: function (data) {
    return requestConfig(`${testHost}/device/insertexm`, data, 'POST')
  },
  // 设备入档
  getEquipeInsert: function (data) {
    return requestConfig(`${testHost}/device/insertDevice`, data, 'POST')
  },
  // 获取执行巡检的设备列表
  getEquipeExecuteList: function (data) {
    return requestConfig(`${testHost}/device/getexamdevice`, data, 'POST')
  }, 
  // 获取执行巡检的设备列表
  getEquipeExecute: function (data) {
    return requestConfig(`${testHost}/device/doexam`, data, 'POST')
  },
  // 获取执行巡检的设备列表
  getEquipeExecuteListDetail: function (data) {
    return requestConfig(`${testHost}/device/getexamdevicedetail`, data, 'POST')
  },
  // 更新设备入档信息
  getEquipeUpdateEquipe: function (data) {
    return requestConfig(`${testHost}/device/updateDevice`, data, 'POST')
  },
  /* 
    -------------------------------告警
   */
  // 获取告警级别统计echarts
  getAlarmWarningDegree: function (data) {
    return requestConfig(`${testHost}/warn/queryWarningDegree`, data, 'POST')
  },
  // 获取告警类型统计echarts
  getAlarmWarningType: function (data) {
    return requestConfig(`${testHost}/warn/queryWarningStatus`, data, 'POST')
  },
  // 获取警告列表
  getAlarmWarningList: function (data) {
    return requestConfig(`${testHost}/warn/querySystemWarning`, data, 'POST')
  },
  // 更改告警状态
  getAlarmUpdateWarningState: function (data) {
    return requestConfig(`${testHost}/warn/updateSystemWarnings`, data, 'POST')
  },
  // 查询告警解决的指派人员
  getAlarmQueryWraningPersons: function (data) {
    return requestConfig(`${testHost}/warn/queryAllPersons`, data, 'POST')
  },
  // 查询所有的告警信息
  getAlarmAllInfoList: function (data) {
    return requestConfig(`${testHost}/warn/queryAllWarnings`, data, 'POST')
  },
  // 查询告警数量
  getAlarmAllNum: function (data) {
    return requestConfig(`${testHost}/warn/querySystemCount`, data, 'POST')
  },
  // 查询告警级别
  getAlarmAllRank: function (data) {
    return requestConfig(`${testHost}/warn/queryAllDegrees`, data, 'POST')
  },
  /* 
    -------------------------------效益
   */
  // 获取今日 昨日的效益
  getBenefitRealTime: function (data) {
    return requestConfig(`${testHost}/multi/queryRealEnergy`, data, 'POST')
  },
  // 获取年效益的接口-暖
  getBenefitWarmYearData: function (data) {
    return requestConfig(`${testHost}/hvacheat/queryHeatAccumulation`, data, 'POST')
  },
  // 获取年效益的接口-电
  getBenefitEleYearData: function (data) {
    return requestConfig(`${testHost}/multi/queryconsummoney`, data, 'POST')
  },
  // 获取年效益的接口-水
  getBenefitWaterYearData: function (data) {
    return requestConfig(`${testHost}/water/queryWaterAccumulation`, data, 'POST')
  },
  // 获取效益超额记录列表
  getBenefitExtraListData: function (data) {
    return requestConfig(`${testHost}/multi/queryoverconsum`, data, 'POST')
  },
  // 增加超额记录
  getBenefitAddOverConsum: function (data) {
    return requestConfig(`${testHost}/multi/addoverconsum`, data, 'POST')
  },
  // 删除上传的图片
  getBenefitDeleteImg: function (data) {
    return requestConfig(`${testHost}/file/deletePicture`, data, 'POST')
  },
  /* 
    -------------------------------消息
   */
  // 查询接收人列表
  getMessageQueryPerson: function (data) {
    return requestConfig(`${testHost}/notify/queryuser`, data, 'POST')
  },
  // 创建新消息-指定接收人
  getMessageCreatNew: function (data) {
    return requestConfig(`${testHost}/notify/sendInfo`, data, 'POST')
  },
  // 获取我的消息-接收人
  getMessageList_receive: function (data) {
    return requestConfig(`${testHost}/notify/querymessage`, data, 'POST')
  },
  // 获取我的消息-我发送的
  getMessageList_send: function (data) {
    return requestConfig(`${testHost}/notify/querysendmessage`, data, 'POST')
  },
  // 获取我的消息-接收人
  getMessageUpdateState: function (data) {
    return requestConfig(`${testHost}/notify/updatemessage`, data, 'POST')
  },
  // 获取告警消息
  getMessageWarnNotify: function (data) {
    return requestConfig(`${testHost}/notify/querywarninginfo`, data, 'POST')
  },

  /* 
    -------------------------------外部接口
   */
  // 查询子系统房间实时用电量-年、月、日
  getWeather: function (data) {
    return requestConfig(`https://free-api.heweather.net/s6/weather/now?location=CN101120101&key=57a0c303f13e46b1a07cbf41e7f6b533`, data, 'GET')
  },
  getWeather2: function(data) {
    return requestConfig(`https://free-api.heweather.net/s6/weather/forecast?location=CN101120101&key=57a0c303f13e46b1a07cbf41e7f6b533`, data, 'GET')
  },
  getHistoryWeather: function (data) {
    return requestConfig(`https://api.heweather.net/s6/weather/historical?location=CN101120101&key=57a0c303f13e46b1a07cbf41e7f6b533&date=${data}`, null, 'GET')
  },
  /* 
    -------------------------------公共方法
   */
  // 消息提示接口
  goShowToast: function (title='暂无提示',icon='none',time=2000, mask=true) {
    wx.showToast({
      title: title ? title : '暂无提示',
      icon: icon ? icon : 'none',
      duration: time ? time : 2000,
      mask: mask
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
        'Authorization': getApp().globalUserData.Token
      },
      success: (res) => {
        if (res.header.Authorization) {
          getApp().globalUserData.Token = res.header.Authorization;
          wx.setStorage({
            key: "token",
            data: res.header.Authorization
          })
        }
        switch (res.statusCode) {
          case 200:
            resolve(res.data)
            break;
          case 400:
            wx.showToast({
              title: '客户端请求错误',
              icon: 'none',
              duration: 2000,
              mask: false
            })
            break;
          case 404:
            wx.showToast({
              title: '接口404了',
              icon: 'none',
              duration: 2000,
              mask: false
            })
            break;
          case 502:
            resolve(res.data)
            break;
        }
      },
      fail: (err) => {
        console.log(err)
        if (err.errMsg == "request:fail ") {
          wx.showToast({
            title: '请求出错',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else if (err.errMsg == "request:fail timeout"){
          wx.showToast({
            title: '请求超时',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else {
          reject(err)
        }
      }
    })
  })
}
function requestConfig2(router, data, method) {
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
        if (res.header.Authorization) {
          getApp().globalUserData.Token = res.header.Authorization;
          wx.setStorage({
            key: "token",
            data: res.header.Authorization
          })
        }
        switch (res.statusCode) {
          case 200:
            resolve(res.data)
            break;
          case 400:
            wx.showToast({
              title: '客户端请求错误',
              icon: 'none',
              duration: 2000,
              mask: false
            })
            break;
          case 404:
            wx.showToast({
              title: '接口404了',
              icon: 'none',
              duration: 2000,
              mask: false
            })
            break;
        }
      },
      fail: (err) => {
        console.log(err)
        if (err.errMsg == "request:fail ") {
          wx.showToast({
            title: '请求出错',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else if (err.errMsg == "request:fail timeout") {
          wx.showToast({
            title: '请求超时',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else {
          reject(err)
        }
      }
    })
  })
}
function requestConfig3(router, data, method) {
  // 返回promise
  return new Promise((resolve, reject) => {
    // 请求
    wx.request({
      url: `${router}`,
      data: data,
      method: method,
      dataType: 'json',
      header: {
        'Authorization': getApp().globalUserData.Token
      },
      success: (res) => {
        if (res.header.Authorization) {
          getApp().globalUserData.Token = res.header.Authorization;
          wx.setStorage({
            key: "token",
            data: res.header.Authorization
          })
        }
        switch (res.statusCode) {
          case 200:
            resolve(res.data)
            break;
          case 400:
            wx.showToast({
              title: '客户端请求错误',
              icon: 'none',
              duration: 2000,
              mask: false
            })
            break;
        }
      },
      fail: (err) => {
        console.log(err)
        if (err.errMsg == "request:fail ") {
          wx.showToast({
            title: '请求出错',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else if (err.errMsg == "request:fail timeout") {
          wx.showToast({
            title: '请求超时',
            icon: 'none',
            duration: 2000,
            mask: false
          })
        } else {
          reject(err)
        }
      }
    })
  })
}

module.exports = apiConfig;