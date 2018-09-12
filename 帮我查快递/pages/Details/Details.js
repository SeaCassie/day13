// pages/Details/Details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressComData: [],
    objectArray: [
      { com: "顺丰", no: "sf" },
      { com: "申通", no: "sto" },
      { com: "圆通", no: "yt" },
      { com: "韵达", no: "yd" },
      { com: "天天", no: "tt" },
      { com: "EMS", no: "ems" },
      { com: "中通", no: "zto" },
      { com: "汇通", no: "ht" },
      { com: "全峰", no: "qf" },
      { com: "德邦", no: "db" },
      { com: "国通", no: "gt" },
      { com: "京东", no: "jd" },
      { com: "宅急送", no: "zjs" },
      { com: "邮政", no: "yzgn" },
    ],
    no: "",
    com: "",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let index = options.index  //获取的是数组下标
    let no=options.expressNo//获取的是订单号
    // console.log(index)
    // console.log(no)
    let com = this.data.objectArray[index].no//获取公司编号
    // console.log(com)
    let company = this.data.objectArray[index].com
    this.setData({
        com,
        no,
        company
    })
    this.search(com,no)
  },

    search:function(com,no){
      wx.request({
        url: 'https://v.juhe.cn/exp/index',
        data: {
          com: com,
          no: no,
          key:"df6ccd9aa82cb485e2856e147d88ed52",
        },
        success: (res) => {
          // console.log(res.data)

          this.setData({
            result: res.data.result
          })
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