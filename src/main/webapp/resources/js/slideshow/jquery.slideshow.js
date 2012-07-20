/*
Jquery slideshow
*/
(function(){

      //取得js的路径
      baseURL = function(){
         var scriptTags = document.getElementsByTagName('script');
         var baseURL = '';
         if (scriptTags) {
            for (i = 0; i < scriptTags.length; i += 1) {
               if (scriptTags[i].src.indexOf('jquery.slideshow.js') !== -1) {
                  baseURL = scriptTags[i].src.split("jquery.slideshow.js")[0]
               }
            }
         }
         return baseURL;
      }
   
      //动态加载css样式
      {
         var css_href = baseURL()+'style/style.css';
         var styleTag = document.createElement("link");
         styleTag.setAttribute('type', 'text/css');
         styleTag.setAttribute('rel', 'stylesheet');
         styleTag.setAttribute('href', css_href);
         $("head")[0].appendChild(styleTag);
      }
})();


(function($){
$.fn.extend({
   slideshow:function(){
   
        $slideshow = $(this);
        var currentPosition = 0;

        var slides = $('.slide');
        var numberOfSlides = slides.length;

        var chartH = $('#content').height();
        
        var chartW = $('#content').width()/2-18;
        
        $(this).find('.span6').css({'width':chartW,'height':$('#content').height()/2 - 10});
        
        $slideshow.css({'overflow':'hidden'});

        slides.wrapAll('<div id="slideInner"></div>')
                .css({
                  'height' : chartH
                });

        $('#slideInner').css('height', chartH * numberOfSlides);

        initControlBar();
          
        $('.control').css('top',chartH/2+50);
            
        manageControls(currentPosition);

        // 给分页按钮绑定事件
        $('.control .badge')
        .bind('click', function(){
            currentPosition = $(this).index();

            manageControls(currentPosition);
            $('#slideInner').animate({
              'marginTop' : chartH*(-currentPosition)
            });
        });

        // 初始化分页按钮栏
        function initControlBar(){
            var $ul = $('<ul>');
            for(var i = 1;i<=numberOfSlides;i++){
                
                var info = "";
                
                var $charts = $(".slide").eq(i-1).find('.span6');
                $charts.each(function(i){
                    $(this).addClass('well');
                    if(i == 0){
                        info = (i+1) + '. ' + $(this).attr('title');
                    } else{
                        info = info + '<br/>' + (i+1) + '. ' + $(this).attr('title');
                    }                    
                });
            
                var $li = $('<li>').text(i).attr({'class':'badge','rel':'popover','data-content':info,"data-original-title":"图表内容"});
                $li.popover({'placement':'left',delay: { show: 300, hide: 100 }});
                $li.appendTo($ul);
            }
            
            var $controlBar = $('<span>').attr('class','control');
            $controlBar.append($ul);
            $slideshow.prepend($controlBar);
            
        }

        // 控制分页按钮的样式
        function manageControls(position){
            var $lis = $('.control li');
            $lis.each(function(){
                $(this).removeClass('badge-important');
            });
            $lis.eq(position).addClass('badge-important');
        }	
    }
    
});

})(jQuery);