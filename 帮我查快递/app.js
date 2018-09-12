App({

  onLaunch() {
    // require SDK
    require('./utils/sdk-v1.5.0')
    wx.BaaS.init('3526c439730142963f52')
  }
})
