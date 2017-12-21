window.onload = function() {
  var showMoreBtn = getElById('showMoreBtn')
  var bookBox = getElById('bookBox')
  var moreCon = getElById('moreCon')
  addEvent(showMoreBtn, 'click', function() {
    bookBox.style.height = 'auto'
    moreCon.style.display = 'none'
  })
}

function getElById(id) {
  return document.getElementById(id)
}

var addEvent = (function() {
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

var removeEvent = (function() {
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