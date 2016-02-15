;(function($,window,undefined){
    var bannerslider = function (ele,options){
    	$self = $(ele),
        this.defaults = {
           show: 'slide',
           list:'left-btn',
		   speed:1500
        },

        this.options = $.extend({},this.defaults,options);
    }

    bannerslider.prototype = {
    	init : function(){
                var $show = $(this.options.show),
                    $showLi = $show.children('li'),
                    $list = $(this.options.list),
                    $listLi = $list.children('li'),
                    $mask = $list.find('.mask');

                var oneWidth =$showLi.outerWidth(true),    
                    ulWidth = $showLi.length*oneWidth;
                    $show.width(ulWidth);

                 var active = {
                 	
                 	};

                 var overlay = '<div class="overlay"></div>';
                //遮罩选项
                /*
                var overlay = {
				    background: #000,
				    filter: alpha(opacity=50),
				    opacity: 0.5;  
				    display: none;
				    position: absolute;
				    top: 0px;
				    left: 0px;
				    width: 100%;
				    height: 100%;
				    z-index: 100;
				    display:none;
				};
               */

                //添加索引& 遮罩
               for(var i = 0;i<$showLi.length;i++){
                   $showLi[i].index = i;
                   $listLi[i].index = i;
                   
                   $($mask[i]).prepend($(overlay));
               }
               
               //
               return {
                  show : $show,
                  showLi : $showLi,
                  list  : $list,
                  listLi : $listLi,
                  oneWidth : oneWidth,
                  ulWidth : ulWidth
               };

    	},

        banner : function(){
        	var setting = this.init(),timer = null,i = 0,inow = 0;
               
              $('.overlay:first').addClass('active');

              timer = setInterval(function(){

                 if(i == setting.showLi.length -1 ){
                     $(setting.showLi[0]).css({
                         'position':'relative',
                         'left': setting.ulWidth+'px'
                     });
                     i = 0;
                 }else{
                 	i++;     	
                 }

                 $('.overlay').removeClass('active');
                 $($('.overlay')[i]).addClass('active');

                inow++;
                $(setting.show).animate({
                    'left': -setting.oneWidth*inow+'px'
                  },500,function(){

                    if (i==0) {
                    	$(this).css({
                    		 'left': '0px'
                    	});
                    	$(setting.showLi[0]).css({
                         'position':'static',
                        });
                    	inow = 0;
                     }
                 });

              },1500); 


              //添加事件
              $(setting.listLi).hover(function(){
                 clearInterval(timer);
                 var _this = this;
                  
                  $('.overlay').removeClass('active');
                  $(_this).find('.overlay').addClass('active');
                  $(setting.show).animate({
                    'left': -setting.oneWidth*_this.index+'px'
                  },50);

                },function(){
	              	var _this = this,
	                 i = this.index,
	                 inow=_this.index;
                     $('.overlay').removeClass('active');
                     $($('.overlay')[i]).addClass('active');

	                 if (timer) { clearInterval(timer);};
 
	                  timer = setInterval(function(){
		                 if(i == setting.showLi.length -1 ){
		                    $(setting.showLi[0]).css({
		                         'position':'relative',
		                         'left': setting.ulWidth+'px'
		                     });
		                     i = 0;

		                 }else{
		                 	i++;     	
		                 }
		                  $('.overlay').removeClass('active');
                         $($('.overlay')[i]).addClass('active');

		             	 inow++; 
		               $(setting.show).animate({
		                    'left': -setting.oneWidth*inow+'px'
		                	 },500,function(){
		                    if (i==0) {
		                    	$(this).css({
		                    		 'left': '0px'
		                    	});
		                    	$(setting.showLi[0]).css({
		                          'position':'static',
		                        });
		                    	inow = 0;
		                    }
		                });

             	 },1500);

              });

            
            $(setting.showLi).hover(function(){
                 clearInterval(timer);
                },function(){
	              	var _this = this,
	                 i = this.index,
	                 inow=_this.index;
                     $('.overlay').removeClass('active');
                     $($('.overlay')[i]).addClass('active');

	                 if (timer) { clearInterval(timer);};
 
	                  timer = setInterval(function(){
		                 if(i == setting.showLi.length -1 ){
		                    $(setting.showLi[0]).css({
		                         'position':'relative',
		                         'left': setting.ulWidth+'px'
		                     });
		                     i = 0;

		                 }else{
		                 	i++;     	
		                 }
		                  $('.overlay').removeClass('active');
                          $($('.overlay')[i]).addClass('active');

		             	 inow++; 
		               $(setting.show).animate({
		                    'left': -setting.oneWidth*inow+'px'
		                	 },500,function(){
		                    if (i==0) {
		                    	$(this).css({
		                    		 'left': '0px'
		                    	});
		                    	$(setting.showLi[0]).css({
		                          'position':'static',
		                        });
		                    	inow = 0;
		                    }
		                });

             	 },1500);

              });
        }
    }

     //核心方法
	 $.fn.bannerlist = function(options){
	 	var banner = new bannerslider(this,options);
	 	return banner.banner();
	 }
})($,window)