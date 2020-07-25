// miniprogram/pages/xihuanbyme/xihuanbyme.js
const db = wx.cloud.database()
const taotao = db.collection('taotao')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  delete: function () {
    wx.showModal({
      title: "删除提示",
      content: "是否删除这条记录？"
    })
  },

  details: function (e) {
    //console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: `../details/details?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '错误信息',
            content: '未登录,请先登录！',
            success: (res) => {
              wx.switchTab({
                url: '../my/my',
              })
            }
          })
        } else {
          wx.cloud.callFunction({
            name: 'openid',
            success: (res) => {
              taotao.where({
                openid: _.eq(res.result.openid),
                love: _.eq(true)
              }).get().then(res => {
                console.log(res)
                this.setData({
                  res: res.data
                })
              })
            }
          })
        }
      },
    })
  }
})