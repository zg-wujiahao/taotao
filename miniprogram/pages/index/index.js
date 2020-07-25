//index.js
const app = getApp()
const db = wx.cloud.database()
const taotao = db.collection('taotao')
const _ = db.command
Page({
  data: {
    item: 0,
    tab: 0,
    state: 'paused',
    playIndex: 0,
  },

  onLoad: function () {
    taotao.get().then(res => {
      console.log(res)
      this.setData({
        all: res.data
      })
    })
  },
  //tab切换
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
    //console.log(`"${this.data.item}"`)
    console.log(this.data.item)
    var item1 = this.data.item
    wx.cloud.callFunction({
      name: 'goumai',
      data: {
        item: item1
      },
      success: (res) => {
        console.log(res)
        this.setData({
          res: res.result.res
        })
      }
    })
  },
  //页面切换
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },

  details: function (e) {
    //console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: `../details/details?id=${id}`
    })
  },
  search1: function (e) {
    //console.log(e)
    this.setData({
      value: e.detail.value
    })
  },
  search: function (e) {
    //console.log(e)
    var that = this
    var value = this.data.value
    taotao.where({
      //使用正则查询，实现对搜索的模糊查询
      name: db.RegExp({
        regexp: value,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        console.log(res)
        that.setData({
          search_list: res.data
        })
        wx.navigateTo({
          url: `../../search/search`,
          success: (res) => {
            //console.log(that.data.search_list)
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', that.data.search_list)
          }
        })
      }
    })
  }
})