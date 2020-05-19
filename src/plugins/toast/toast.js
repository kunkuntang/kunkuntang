(function() {
  console.log('CSugerUPTips')
  var CSugerUPTips = function(options) {
    var duration = (options && options.duration) || 3;
    var isAutoHide = (options && options.isAutoHide) || true;
    var isShow = (options && options.isShow) || false;

  }

  CSugerUPTips.init = function() {}

  CSugerUPTips.prototype.renderTip = function() {
    var baseClsName = 'CSuperUp'
    var tipsDiv = document.createElement('div');
    tipsDiv.innerHTML = 'page will be reload in seconds'
    tipsDiv.className = baseClsName + '-con';
    window.document.body.appendChild(tipsDiv)
  }

  CSugerUPTips.prototype.showTip = function() {

  }

  CSugerUPTips.prototype.hideTip = function() {

  }

  if (!window.CSugerUpTips) {
    window.CSugerUPTips = CSugerUPTips
  }
})()