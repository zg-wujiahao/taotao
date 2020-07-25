// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const taotao = db.collection('taotao')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  //console.log(openid)
  var { name,price,address,contact,contact,index,img,pickupway,describle } = event
  const res = await taotao.add({
    data:{
      openid:openid,
      name: name,
      price: price,
      address:address,
      contact: contact,
      index: index,
      img: img,
      pickupway: pickupway,
      describle:describle
    }
  })
  return {
    res
  }
}