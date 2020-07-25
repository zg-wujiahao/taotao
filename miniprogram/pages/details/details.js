// miniprogram/details/details.js
const db = wx.cloud.database()
const taotao = db.collection('taotao')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    isClick: false,
    love: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
    var that = this
    console.log(id)
    taotao.where({
      _id: _.eq(id)
    }).get().then(res => {
      console.log(res.data[0])
      that.setData({
        res: res.data[0]
      })
    })
  },
  tags: function (e) {
    if (!this.data.isClick == true) {
      wx.showToast({
        title: '已收藏',
      })
      wx.cloud.callFunction({
        name: 'tags',
        data: {
          id: this.data.id,
          love: this.data.love
        },
        success: (res) => {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '已取消收藏',
      })
    }
    this.setData({
      isClick: !this.data.isClick
    })
  }
})