// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    username: '',
    openid: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(res)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                logged: true,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                username: res.userInfo.nickName
              })
            }
          })
        }
        wx.hideLoading();
      }
    })
  },
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        username: e.detail.userInfo.username
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})