window.onload = function() {
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
    changeAvatar()
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

function changeAvatar() {
  if (window.scrollY < 250 && window.scrollY >= -100) {
    let initScale = 1 - parseFloat(window.scrollY / 400).toFixed(1)
    initScale = initScale < 0.3 ? 0.3 : initScale
    perAvatar.style.cssText = 'position: absolute; top: 20em; transform: scale(' + initScale + ')';
  } else {
    perAvatar.style.cssText = 'position: fixed; top: -55px ; transform: scale(0.3); left: 50%; margin-left: -11em;';

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