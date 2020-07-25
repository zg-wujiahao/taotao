// miniprogram/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
      that.setData({
        res: data
      })
    })
  },
  details: function (e) {
    //console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: `../pages/details/details?id=${id}`
    })
  }

})