//  @if NODE_ENV='development'
var env = 'dev'
// @endif 

//  @if NODE_ENV='production'
var env = 'prod'
// @endif

var csTip = new CSugerUPTips()
csTip.renderTip()

if (navigator.serviceWorker && env === 'dev') {
  navigator.serviceWorker.register('./sw.js', { scope: '/' }).then(function(registration) {
    console.log('service worker registe success!')
  }).catch(function(err) {
    console.log('service worker registe fail!!')
  })

  navigator.serviceWorker.oncontrollerchange = function(evt) {
    console.log('page refresh!')
  }

  navigator.serviceWorker.addEventListener('message', function(e) {
    if (e.data === 'sw.update') {
      // 当收到 sw 的刷新通知之后
      csTip.showTip()
    }
  })
}