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
  const wxContext = cloud.getWXContext()
  var item = event.item
  console.log(item)
  let res = await taotao.where({
    index: _.eq(item)
  }).get()
  return {
    res
  }
}