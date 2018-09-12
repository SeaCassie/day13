// pages/lookup/lookup.js
Page({

  /**
   * 页面的初始数据
   */
    data: {  
      imgUrls: [
        '../../resource/images/fg1.jpg',
        '../../resource/images/fg2.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      array: ["顺丰", "申通", "圆通", "韵达", "天天", "EMS", "中通", "汇通", "全峰", "德邦", "国通","京东", "宅急送",  "邮政"],
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
        no:"",
        scanno:'',
        com:"",
        Recond:[],
      index: 2,
      A:false,
      B:true,
      result:[],
      arrDelete:[],
      value:""
    },
   bindPickerChange: function (e) {
     var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
  
    that.setData({
      index: e.detail.value,
    
    }) 
   }, 
   //修改清空选项的界面
  clearRecord:function(){
    this.setData({
     A:true,
     B: false
    })
  },
  cancel:function(){
    this.setData({
      A: false,
      B: true
    })
  },
  //获取订单号
  expressNoInput:function(e){
    this.setData({
        expressNo:e.detail.value

    })
  },
  //点击查询按钮事件
  buttontap:function(){
    let no = this.data.expressNo//获取文本输入内容
    let index = this.data.index//获取当前数组下标
    let company = this.data.array[index]//获取当前的快递公司名称
    let com=this.data.objectArray[index].no//获取当前快递编号
    wx.navigateTo({
      url: '/pages/Details/Details?company=' + company  + '&expressNo=' + no + '&index=' + index,
    })
      var newData = { company, no ,com ,index}
      this.setData({
        result:this.data.result.concat(newData),
      })
    // console.log(company, no, index)
      let result=this.data.result
   
      this.localCache(result)
},
//本地缓存
  localCache:function(result){
    wx.setStorage({
      key: 'Recond',
      data: result,
    })
    this.setData({
      Recond: result
    })
    // wx.getStorage({
    //   key: 'Recond',
    //   success: (res) => {
    //     this.setData({
    //       Recond: res.data
    //     })
    //   },
    // }) 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'Recond',
      success: (res) => {
        this.setData({
          Recond: res.data
        })
      },
    }) 

  },
  //扫一扫的代码
  scanCode:function(){
    var that=this;
    var show;
    let index = this.data.index
    let com = this.data.objectArray[index].no
    let company = this.data.array[index]
    let value=""
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.show="结果"+res.result+"二维码类型："+res.scanType+"字符集"+res.charSet+"路径:"+res.path;
        console.log(this.show)
        console.log(res.result)
        //  let no=res.result//获取到二维码下的订单号
        // console.log(no)
        this.setData({
          value: res.result,
          no:res.result
        })
        console.log(value)
        wx.navigateTo({
          url: '/pages/Details/Details?index=' + index + '&expressNo=' + res.result,
        })
        wx.showToast({
          title: '成功',
        })
     
      
        let no = this.data.value
        var newData = { company, no, com, index }
        this.setData({
          result: this.data.result.concat(newData),
        })
        let result = this.data.result
        console.log(result)
        this.localCache(result)
      }
   })
 },



//单个删除
 cancelTap:function(e){
 
  //  console.log(e.currentTarget.dataset)
   let arr = e.currentTarget.dataset
   let index=e.currentTarget.index

    this.deleteTap(arr)
  },
  
  deleteTap:function(keywords) {
  
    // console.log(keywords.company)
    let result = this.data.result

    let arrDelete=[]
    //  console.log(result)
    for(var i=0;i<result.length;i++)
    {
      if(keywords.company==result[i].company&&keywords.no==result[i].no){
          // console.log("ok")
      }else{
        arrDelete.push(result[i]) 
      }
    }
        // console.log(arrDelete)
        this.setData({
          Recond:arrDelete,
          result:arrDelete
        })
  },
  //全部删除
  allDelete:function(){
    let result = this.data.result
        this.setData({
          result: [],
          Recond:result 
        
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