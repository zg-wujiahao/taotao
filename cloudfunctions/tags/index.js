// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const taotao = db.collection('taotao')
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  //console.log(event)
  const wxContext = cloud.getWXContext()
  //console.log(wxContext)
  const openid1 = wxContext.OPENID
  var { id, love } = event
  // let res = await taotao.doc({
  //   _id: id
  // }).add({
  //   data: {
  //     openid1: openid1,
  //     love: love
  //   }
  // })
  return {
    res
  }
}