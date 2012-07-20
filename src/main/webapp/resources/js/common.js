/**
 * 函数功能： 共通JS函数 common.js
 * Author: springlee.lic
 */
(function(){
	var pulse = window.pulse = {};
	
	pulse.simpleAjax = function(url, type, data, callback_, loadingObj) {
		$.ajax( {
			url : url,
			type : type,
			dataType : "json",
			data : data,
			beforeSend: function(){
				if(loadingObj){
					$('#loading').html(loadingObj);
				}
			},
			error : function(XMLHttpRequest) {
				sessionTimeOut(XMLHttpRequest);
			},
			success : function(json) {
				$('#loading').html('正在加载...');
				if (callback_ && callback_.onSuccess) {
					callback_.onSuccess.call(null, json);
				}
			}
		});
	}
	
	pulse.addCookie = function(proChart) {
	    var temp = pulse.getCookie("proChart");
	    alert(temp);
	    if (temp == ""){
	    	pulse.setCookie("proChart", proChart.chartText);
	    }
	 }
	pulse.setCookie = function(name, value) {
	    document.cookie = name + "=" + escape(value);
	}

	pulse.getCookie = function(name) {
	    if (document.cookie.length > 0) {
	      c_start = document.cookie.indexOf(name + "=");
	      if (c_start != -1) {
	        c_start = c_start + name.length + 1;
	        c_end = document.cookie.indexOf(";", c_start);
	        if (c_end == -1) c_end = document.cookie.length;
	        return unescape(document.cookie.substring(c_start, c_end));
	      }
	    }
	    return "";
	 }
	
    pulse.removeCookie = function(i) {
        d = pgulse.etCookie("proChart");
        var reg = new RegExp("\\|" + i + "\\|");
        if (reg.test(d)) {
          d = d.replace(reg, "|");  
          pulse.setCookie("proChart", d);
        }     
      }    
      
      pulse.deleteCookie = function(name) {  //删除名称为name的Cookie  
          var exp = new Date();    
          exp.setTime (exp.getTime() - 1);    
          var cval = pulse.getCookie (name);    
          document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();  
      }
	
})();

function sessionTimeOut(xhr) {
	if (xhr.status === 401) {
		var msg = '会话已经超时，请重新登录......';
		if (confirm(msg)) {
			if (window.parent) {
				window.parent.location = xhr.getResponseHeader('redirectPath');
			} else {
				window.location = xhr.getResponseHeader('redirectPath');
			}
		} else {
			return false;
		}
	} else {
		alert("调用服务器出错，" + xhr.getResponseHeader('exception'));
	}
}

$(function(){
	
	$(window).resize(function(){
        resizeMainContainer();
    });
    
	//初始化页面布局
	initContainer();
       
	//异步加载样式 
   $("#loading").bind("ajaxSend", function(){
   		$(this).show();
 	}).bind("ajaxComplete", function(){
   		$(this).hide();
 	});
   
   //绑定鼠标滚动样式
   bindMousewheel();
   

	//初始化默认显示的页面
   //displayPage("controller.php?type=monitor");
   
   $("#sidebar-nav .group li,#sidebar-nav li a").click(function(){
	   var url = $(this).attr("id");
	   if(url != '' && (typeof url != 'undefined')){
		   displayPage(url);
	   }
   });
});

//当浏览器窗口大小改变时，重新计算图表大小
function resizeMainContainer(){
    var windowW = $(window).width();
    var chartW = $('#content').width()/2-18;
    $("#content").css("width",windowW - 250 - 32);
    $('.charts').find('.span6').css({'width':chartW});
}

//根据浏览器可视窗口大小计算div 布局
function initContainer(){
	var windowH = $(window).height();
    var windowW = $(window).width();
    
    var headerHeight = 60;
    
    var siderBarWidth = 250;
    
    var marginTop = 10;
    
    var paddingHeight = 28;
    
    $("#sidebar-nav").css("height",windowH - headerHeight - paddingHeight);
    
    $("#content").css("height",windowH - headerHeight - marginTop + 3);
    $("#content").css("width",windowW - siderBarWidth - 32);
}

function displayPage(url){
	
    var queryString = url.substring(url.indexOf("?")+1);    //获得URL传递的参数
	var parameters = queryString.split("&");
	var type = parameters[0].split("=")[1];
	if(type){
		$('#menu-box').load('tab.php?type='+type);
	}
	$('#content').load(url);
}

//绑定鼠标滚动事件
function bindMousewheel(){
	
	/** This is high-level function.
	 * It must react to delta being more/less than zero.
	 */
	function handle(delta) {
		
		var chartH = $('#content').height();
        currentPosition = $('.control .badge-important').index();
        var $li_num = $('.control li').length;
	
		//向下滚
        if (delta < 0){
        	if((currentPosition+1) < $li_num ){
        		manageControls(currentPosition+1);
                $('#slideInner').animate({
                    'marginTop' : chartH*(-currentPosition-1)
                });
        	}

        }else{//向上滚
        	if(currentPosition > 0 ){
        		manageControls(currentPosition-1);
                $('#slideInner').animate({
                    'marginTop' : chartH*(-currentPosition+1)
                });
        	}
        }
	}
	
    // 控制分页按钮的样式
    function manageControls(position){
        var $lis = $('.control li');
        $lis.each(function(){
            $(this).removeClass('badge-important');
        });
        $lis.eq(position).addClass('badge-important');
    }

	/** Event handler for mouse wheel event.
	 */
	function wheel(event){
	        var delta = 0;
	        if (!event) /* For IE. */
	                event = window.event;
	        if (event.wheelDelta) { /* IE/Opera. */
	                delta = event.wheelDelta/120;
	        } else if (event.detail) { /** Mozilla case. */
	                /** In Mozilla, sign of delta is different than in IE.
	                 * Also, delta is multiple of 3.
	                 */
	                delta = -event.detail/3;
	        }
	        /** If delta is nonzero, handle it.
	         * Basically, delta is now positive if wheel was scrolled up,
	         * and negative, if wheel was scrolled down.
	         */
	        if (delta)
	                handle(delta);
	        /** Prevent default actions caused by mouse wheel.
	         * That might be ugly, but we handle scrolls somehow
	         * anyway, so don't bother here..
	         */
	        if (event.preventDefault)
	                event.preventDefault();
		event.returnValue = false;
	}

	/** Initialization code. 
	 * If you use your own event management code, change it as required.
	 */
	var slideDiv = document.getElementById("content");
	if (window.addEventListener){
		/** DOMMouseScroll is for mozilla. */
		slideDiv.addEventListener('DOMMouseScroll', wheel, false);
	}
	addEvent(slideDiv,"mousewheel",wheel);
}

//绑定事件
function addEvent(obj, type, fn){
	if(obj.addEventListener)
	{
		obj.addEventListener(type, fn, false);
	}
	else if(obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}
