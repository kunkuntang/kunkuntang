(function() {
  console.log('CSugerUPTips')
  var CSugerUPTips = function(options) {
    this.duration = (options && options.duration) || 3;
    this.isAutoHide = (options && options.isAutoHide) || true;
    this.isShow = (options && options.isShow) || false;

    this.instance = null;
  }

  CSugerUPTips.prototype = function() {}

  CSugerUPTips.prototype.renderTip = function() {
    var baseClsName = 'CSuperUp'
    var tipsDiv = document.createElement('div');
    this.instance = tipsDiv
    tipsDiv.className = baseClsName + '-con';
    
    var textSpan = document.createElement('span')
    textSpan.className = baseClsName + '-update-text'
    textSpan.innerHTML = '当前页面内容已过期，请点击按钮按钮进行更新'
    tipsDiv.appendChild(textSpan)

    var btnDiv = document.createElement('div')
    btnDiv.innerHTML = '更新';
    btnDiv.onclick = function() {
      window && window.location.reload()
    }
    btnDiv.className = baseClsName + '-update-btn'

    tipsDiv.appendChild(btnDiv)
    window.document.body.appendChild(tipsDiv)
  }

  CSugerUPTips.prototype.showTip = function() {
    this.instance.style.right = '20px'
  }

  CSugerUPTips.prototype.hideTip = function() {
    this.instance.style.right = '-120px'
  }

  if (!window.CSugerUpTips) {
    window.CSugerUPTips = CSugerUPTips
  }
})()