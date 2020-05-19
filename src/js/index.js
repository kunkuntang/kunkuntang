window.onload = function() {
  const isMobile = checkDevice()
  console.log('isMobile', isMobile)
  const showMoreBtn = getElById('showMoreBtn')
  const bookBox = getElById('bookBox')
  const moreCon = getElById('moreCon')
  const perAvatar = document.getElementById('perAvatar')
  const navList = document.getElementById('navList')

  if (showMoreBtn) {
    addEvent(showMoreBtn, 'click', function() {
      bookBox.style.height = 'auto'
      moreCon.style.display = 'none'
    })
  }

  if (window.scrollY > 250) {
    perAvatar.style.transform = 'scale(0.3)';
  }

  addEvent(window, 'scroll', (e) => {
    changeAvatar(isMobile)
    changeNav()
  })
}

function changeNav() {
  if (window.scrollY < 250 && window.scrollY >= -100) {
    navList.style.cssText = '';
  } else {
    navList.style.background = '#000000';
  }
}

function changeAvatar(isMobile) {
  if (isMobile) {
    if (window.scrollY < 250 && window.scrollY >= -100) {
      let initScale = 1 - parseFloat(window.scrollY / 400).toFixed(1)
      initScale = initScale < 0.7 ? 0.7 : initScale
      perAvatar.style.cssText = 'position: absolute; top: 25em; transform: scale(' + initScale + ')';
    }
  } else {
    let winWidth = window.document.body.clientWidth
    if (window.scrollY < 250 && window.scrollY >= -100) {
      let initScale = 1 - parseFloat(window.scrollY / 400).toFixed(1)
      initScale = initScale < 0.3 ? 0.3 : initScale
      if (winWidth > 768) {
        perAvatar.style.cssText = 'position: absolute; top: 16em; transform: scale(' + initScale + ')';
      } else {
        perAvatar.style.cssText = 'position: absolute; top: 20em; transform: scale(' + initScale + ')';
      }
      } else {
      if (winWidth > 768) {
        perAvatar.style.cssText = 'position: fixed; top: -120px ; transform: scale(0.3); left: 50%; margin-left: -11em;';
      } else {
        perAvatar.style.cssText = 'position: fixed; top: -35px ; transform: scale(0.3); left: 50%;';
      }
    }
  }
}

function getElById(id) {
  return document.getElementById(id)
}

const addEvent = (function() {
  if (window.addEventListener) {
    return function(obj, evt, fn, useCapture) {
      return obj.addEventListener(evt, fn, useCapture)
    }
  } else if (window.attachEvent) {
    return function(obj, evt, fn) {
      return obj.attachEvent('on' + evt, fn)
    }
  } else {
    return function(obj, evt, fn) {
      obj['on' + evt] = fn
    }
  }
})();

const removeEvent = (function() {
  if (window.removeEventListener) {
    return function(obj, evt, fn) {
      obj.removeEventListener(fn)
    }
  } else if (window.detachEvent) {
    return function(obj, evt, fn) {
      obj.detachEvent('on' + evt, fn)
    }
  } else {
    return function(obj, evt, fn) {
      obj['on' + evt] = null
    }
  }
})();

function checkDevice() {
  let mobile_flag = false;
  if (window.navigator) {
    const mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    const userAgent = window.navigator.userAgent
    for (let v = 0; v < mobileAgents.length; v++) {
      if (userAgent.indexOf(mobileAgents[v]) > 0) {
        mobile_flag = true;
        break;
      }
    }
  }
  let screen_width = window.screen.width;
  let screen_height = window.screen.height;

  //根据屏幕分辨率判断是否是手机
  if (screen_width < 768 && screen_height < 800) {
    mobile_flag = true;
  }
  return mobile_flag;
}