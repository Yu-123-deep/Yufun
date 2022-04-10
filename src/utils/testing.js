// import storage from '@/utils/storage'
// 导入cookie工具(这边需要自己按需求封装)
// import {PcCookie,Key} from '@/utils/cookie'

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 15 * 60 * 1000  //设置超时时间: 15分钟
 
window.onload = function () {
  window.document.onmousedown = function () {
  	// 保存最新的操作时间到storage中
    storage.setItem("lastTime", new Date().getTime())
  }
};
 
function checkTimeout() {
    //更新当前时间
  currentTime = new Date().getTime()		
  lastTime = storage.getItem("lastTime");
 
  //判断是否超时
  if (currentTime - lastTime > timeOut) { 
    // 清除storage的数据(登陆信息和token)
    storage.clear()
    // 移除cookie
    // PcCookie.remove(Key.accessTokenKey)
    // PcCookie.remove(Key.userInfoKey)

    // 401 未认证或者访问令牌过期，未认证则要通过刷新令牌获取新的认证信息
    let isLock = true // 防止重复发送刷新请求
    // if(isLock && PcCookie.get(Key.refreshTokenKey)) {
    //   isLock = false // 在发送后，将此值 设置为false
    //   // 跳转到认证中心客户端，实现刷新令牌效果
    //   window.location.href = `${process.env.VUE_APP_AUTH_CENTER_URL}/refresh?redirectURL=${window.location.href}`
    // }else {
    //   //没有刷新令牌，则跳转到认证客户端进行重新认证
    //   window.location.href = `${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`
    // }
  }
}
 
export default function () {
  /* 定时器 间隔10秒检测是否长时间未操作页面 */
  window.setInterval(checkTimeout, 10000);
}
