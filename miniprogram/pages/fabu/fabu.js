// miniprogram/pages/fabu/fabu.js
var cloudPath = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['', '买卖', '捐赠', '易物'],
    img: '',
    name: '',
    price: 0,
    address: '',
    contact: '',
    describle: '',
    panduan: false,
    pickupway:[]
  },

  onTabItemTap: function (options) {
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
        }
      },
    })
  },
  name: function (e) {
    //console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  price: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  contact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  describle: function (e) {
    this.setData({
      describle: e.detail.value
    })
  },
  panduan: function (e) {
    if (this.data.name == '' || this.data.price == '' || this.data.address == '' || this.data.contact == '' || this.data.describle == '') {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    } else if (this.data.name.length > 15) {
      wx.showToast({
        title: '名称过长',
      })
      return
    } else {
      this.setData({
        panduan: true
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  updataimg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        cloudPath = tempFilePaths.replace(/(.*\/)*([^.]+)/i, "$2")
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: tempFilePaths,
          success: (res) => {
            let fileID = res.fileID
            that.setData({
              img: fileID
            })
            console.log(that.data.img)
          }
        })
        // console.log(res.tempFiles)
        // console.log("临时路径" + tempFilePaths)
      }
    })
  },
  checkboxChange: function (e) {
    this.setData({
      pickupway: e.detail.value
    })
    console.log(e.detail.value)
  },
  formSubmit: function (e) {
    if (this.data.panduan == true && this.data.img != "" && this.data.pickupway.length != 0) {
      wx.cloud.callFunction({
        name: 'release',
        data: {
          name: this.data.name,
          price: this.data.price,
          address: this.data.address,
          contact: this.data.contact,
          index: this.data.index,
          img: this.data.img,
          pickupway: this.data.pickupway,
          describle: this.data.describle
        },
        success: (res) => {
          console.log(res)
          wx.showModal({
            content: '发布成功',
            success: (res) => {
              wx.redirectTo({
                url: '../fabubyme/fabubyme',
              })
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '发布失败！',
        content: '信息有误，图片或取货方式不能为空，请重新输入！'
      })
    }
  }
})