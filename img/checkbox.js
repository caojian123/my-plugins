;
(function($, undefined) {

	var defaults = {
			pos: 'prev', //label在input的位置next|children|pren(默认)
			labelClass: 'label-init' //label样式
		};

	/*复选框*/
	$.fn.jcCheckbox = function(options) {
		var options = $.extend({}, defaults, options),
			$objLab;

		switch (options.pos) {
			case 'prev':
				$objLab = $(':checkbox', this).prev();
				break;
			case 'child':
				$objLab = $(':checkbox > label', this);
				break;
			case 'next':
				$objLab = $(':checkbox + label', this);
				break;
			default:
				break;
		}

		return $objLab.each(function() {
			var $self = $(this);
			//添加样式
			$self.addClass(options.labelClass).addClass('label-init');
			if ($self.next().is(':checked')) {
				$self.addClass('checkbox-active');
			}
		}).click(function() {
			if ($(this).next().is(':checked')) {
				$(this).removeClass('checkbox-active');
			} else {
				$(this).addClass('checkbox-active');
			}
		});
	}
     
     //单选框
    $.fn.jcRadio = function(options) {
		var options = $.extend({}, defaults, options),
			$objLab;

		switch (options.pos) {
			case 'prev':
				$objLab = $(':radio', this).prev();
				break;
			case 'child':
				$objLab = $(':radio > label', this);
				break;
			case 'next':
				$objLab = $(':radio + label', this);
				break;
			default:
				break;
		}

		return $objLab.each(function() {
			var $self = $(this);
			//添加样式
			$self.addClass(options.labelClass).addClass('label-init');
			if ($self.next().is(':checked')) {
				$self.addClass('radio-active');
			}
		}).click(function() {
			$objLab.removeClass('radio-active');
			if ($(this).next().is(':checked')) {
				$(this).removeClass('radio-active');
			} else {
				$(this).addClass('radio-active');
			}
		});
	}
})(jQuery)