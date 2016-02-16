;
(function($) {
  var iIndex = 0,
    isMoved = false;

  var defaults = {
    items: '.item',
    speed: 'slow',
    afterCallback: function() {}
  };

  var SP = $.fn.fullSwitch = function(options) {
    defaults = $.extend({}, defaults, options);
    //分页显示
    showPage(this,$(defaults.items));
    return this.each(function() {
      var $self = $(this);
      SP.switchEvent($self, defaults);
    });
  }

  //鼠标向下滚动
  SP.switchDown = function(eleitems, ele) {
    if (iIndex < eleitems.length - 1) {
      iIndex++;
      scrollPage(eleitems[iIndex], ele);
    }

  }

  //鼠标向上滚动
  SP.switchUp = function(eleitems, ele) {
    if (iIndex > 0 ) {
      iIndex--;
      scrollPage(eleitems[iIndex], ele);
    }
  }

  //切换事件
  function scrollPage(eleitems, ele) {
    isMoved = true;
     $('#pagination>li').removeClass('active').eq(iIndex).addClass('active');
    $(ele).animate({
      'left': -(100 * $(eleitems).index()) + '%'
    }, defaults.speed, function() {
      isMoved = false;
      defaults.afterCallback.apply(null);
    });
  }

  //分页初始化
  function initPage(items) {
    var pageHtml = '<ol id="pagination">';
    for (var i = 0; i < items.length; i++) {
      pageHtml += '<li>' + i + '</li>';
    }
    pageHtml += '</ol>';

    return pageHtml;
  }

  //分页显示
  function showPage(ele,items) {
    ele.append(initPage(items));
    $('#pagination>li:first').addClass('active');
  }

  //全屏切换事件
  SP.switchEvent = function(ele, options) {
    /* if(document.attachEvent){
          document.attachEvent('onmousewheel',MouseWheelHandler);
     }else{
          document.addEventListener('DOMMouseScroll',MouseWheelHandler);
     }*/
    $(document).on('mousewheel DOMMouseScroll', MouseWheelHandler);
   
    function MouseWheelHandler(e) {
      e.preventDefault();
      var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
      var delta = Math.max(-1, Math.min(1, value)),
        eleitems = $(options.items);
      if (!isMoved) {
        delta < 0 ? SP.switchDown(eleitems, ele) : SP.switchUp(eleitems, ele);
      }
      return;
    }
  }

})(jQuery)