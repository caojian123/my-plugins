;
(function($) {
	var defaults = {
		count: 3,
		callback: function() {}
	};

	//初始化分页
	function initPagination(ele, length) {
		if (length <= 0) return;
		var pageHtml = '<ol id="banner-selected">';
		for (var i = 1; i <= length; i++) {
			pageHtml += '<li>' + i + '</li>';
		}
		pageHtml += '</ol>';
		$(ele).append(pageHtml);
	}
    
    //图片轮播
	$.fn.jcbanner = function(options) {
		var $self = $(this);
		var options = $.extend({}, defaults, options);
		var $ul = $self.children('ul'),
			$oli = $ul.children('li'),
			oneWidth = $oli.outerWidth(true),
			count = 0;

		//分页编号
		initPagination(this, options.count);
		$('#banner-selected').children('li:first').addClass('page-active');

		//开启定时器
		var timer = setInterval(function() {
			move($ul, $oli[0], $oli.length);
		}, 3000);

		//轮播
		function move(ele, first, length) {
			if (length - 1 == count) {
				$(first).css({
					'position': 'relative',
					'left': length * oneWidth + 'px'
				})
			}

			count++;

			ele.animate({
				'left': -count * oneWidth + 'px'
			}, 'slow', function() {
				if (length == count) {
					$(first).css('position', 'static');
					ele.css('left', 0);
					count = 0;
				}
				$('#banner-selected').children('li:eq(' + count + ')').addClass('page-active').siblings().removeClass('page-active');

				options.callback.apply(null);
			});
		}

		//点击事件
		$('#banner-selected').children('li').click(function() {
			//关闭定时器
			clearInterval(timer);
			$('.page-active').removeClass('page-active');
			count = $(this).index() - 1;
			move($ul, $oli[0], $oli.length);
		});

		//重新开启定时器
		$('#banner-selected').children('li').hover(function() {
			//关闭定时器
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				move($ul, $oli[0], $oli.length);
			}, 3000);
		});

		return this;
	}

})(jQuery)