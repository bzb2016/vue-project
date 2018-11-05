import httpServer from './request';
import wx from 'weixin-js-sdk';
const common = {
  // 全局定义微信分享方法
  async wxShare (initData) {
    if(!(initData instanceof Object) && !initData.link) {
      return 
    }
    let url = window.location.href;
    let data = {
      param: JSON.stringify({url: url})
    };
    let configData = null;
    let res = await httpServer.$post({url: '/weixin/base/ticket', data}).then((res) => {
      let configData = res.data
    }).catch(err => {
      console.log(err)
      return
    })
    wx.config({
      appId: configData.appid,
      timestamp: configData.timestamp,
      nonceStr: configData.nonceStr,
      signature: configData.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    })
    let title = initData.title
    let link = initData.link
    let imgUrl = initData.imgUrl
    let desc = initData.desc
    wx.ready(() => {
       // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
       wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link,
        imgUrl: imgUrl // 分享图标
      })
      // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link,
        imgUrl: imgUrl // 分享图标
      })

      // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.error(function (res) {
        // alert(JSON.stringify(res))
      })
    })
  },
  // 判断手机是android还是ios,是否用了微信内置浏览器
  isIosChat () {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)?  CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      alert('android')
    } else if (isiOS) {
      alert('ios')
    } else {
      alert('pc')
    }
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      alert('微信')
    } else {
      alert('非微信')
    }
  },
  // 倒计时方法（1:告知开始时间需要添加天数的倒计时；2：告知结束时间减去当前时间的倒计时）
  getCountDownTime (time, state, delayTime) {
    if (state === 1 && delayTime) {
      let transTime = new Date(time.replace(/-/g, '/'))
      transTime.setDate(transTime.getDate() + Number(delayTime))
      let transMTime = transTime.getTime()
      let diffTime = null
      let o={
        day: null,
        hh: null,
        mm: null,
        ss: null
      } 
      // 定时器
      let timer = setInterval(function () {
        let curTime = new Date().getTime()
        if (transMTime > curTime) {
          diffTime = transMTime - curTime
          o['day'] = Math.floor(diffTime/1000/3600/24)
          o['hh'] = Math.floor((diffTime-o['day']*24*3600*1000)/1000/3600)
          o['mm'] = Math.floor((diffTime-(o['day']*24*3600*1000)-(o['hh']*3600*1000))/1000/60)
          o['ss'] = Math.floor((diffTime-(o['day']*24*3600*1000)-(o['hh']*3600*1000)-(o['mm']*60*1000))/1000)
          return o
        } else {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
    } else if (state === 2) {
      console.log('123')
    } else {
      return time
    }
  }
}
export default common