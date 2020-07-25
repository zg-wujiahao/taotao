// miniprogram/pages/fabubyme/fabubyme.js
const db = wx.cloud.database()
const taotao = db.collection('taotao')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  delete: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.showModal({
      title: "删除提示",
      content: "是否删除这条记录？",
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delete',
            data: {
              id: id
            },
            success: (res) => {
              console.log(res)
              wx.reLaunch({
                url: '../fabubyme/fabubyme'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
            name: 'openid'
          }).then(res => {
            //console.log(res)
            taotao.where({
              openid: _.eq(res.result.openid)
            }).get().then(res => {
              console.log(res)
              this.setData({
                my: res
              })
            })
          })
        }
      },
    })
  },
  details: function (e) {
    //console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: `../details/details?id=${id}`
    })
  },
})