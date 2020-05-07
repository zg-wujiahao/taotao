// miniprogram/pages/fabu/fabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['捐赠', '买卖', '易物'],
    img: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  updataimg: function() {
    var that = this
    wx.chooseImage({
      count:3,
      sourceType: ['album', 'camera'],
      success: function(res) {
        //
        var tempFilePaths = res.tempFilePaths
        that.setData({
          img: tempFilePaths
        })
        console.log(res.tempFiles)
        // console.log("临时路径"+tempFilePaths)
      }
    })
  },
})