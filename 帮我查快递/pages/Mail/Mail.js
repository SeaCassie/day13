// pages/Mail/Mail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:[],
    id:"",
    inputShowed: false,
    inputVal: ""
   
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //取消按钮时 恢复初始状态
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //按×小标时触发的事件
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
   // console.log(e.detail.value) 获取文本搜索框的的输入值
    this.setData({
      inputVal: e.detail.value
    })

  },
//进行搜索查询时的事件
  inputBlur:function(){
      let inputVal = this.data.inputVal   
      this.search(inputVal);//调用函数
  },

  search:function(keywords){
    let company = this.data.company
    // let searchResult = [];
    company.forEach((item) => {
      // console.log(item.name,keywords);
      item.isShow = true;
      if (item.name.indexOf(keywords) >= 0) {
        item.isShow = false;
        // searchResult.push(item);
      }
    });
    this.setData({
      company
    })

  },

    //点击电话按钮的点击事件
  phonetap:function(e){
    // console.log(e)
    var id=e.target.id
    // console.log(id)
   wx.makePhoneCall({
     phoneNumber: id,
      success:function(){
        // console.log(phoneNumber)
          console.log("拨打成功!")
      }
   })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1、通过 tableID 实例化一个 adTable 对象，操作该对象即相当于操作对应的数据表
    let tableID = 47914;
    let adTable = new wx.BaaS.TableObject(tableID);

    //2、示例化一个 Query 对象，在该对象上添加查询条件
    let query = new wx.BaaS.Query()

    //3.支持查询条件并执行查找操作
    // query.compare('isShow', '=', 1);

    adTable.setQuery(query).orderBy().find().then(res => {
      // success
      // console.log(res.data.objects)

      this.setData({
        company: res.data.objects
      })

    }, err => {
      // err

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