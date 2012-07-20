/*
Jquery 表单验证插件   依赖于Jquery
*/
(function(){

		//取得js的路径
		baseURL = function(){
			var scriptTags = document.getElementsByTagName('script');
			var baseURL = '';
			if (scriptTags) {
				for (i = 0; i < scriptTags.length; i += 1) {
					if (scriptTags[i].src.indexOf('jquery.checkform.js') !== -1) {
						baseURL = scriptTags[i].src.split("jquery.checkform.js")[0]
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
	valid:function(){
		if( ! $(this).is("form") ) return;
		
		var $form = $(this);
		
		//获取参数
		var items = $.isArray(arguments[0]) ? arguments[0] : [],
		isBindSubmit = typeof arguments[1] ==="boolean" ? arguments[1] :true,
		isAlert = typeof arguments[2] ==="boolean" ? arguments[2] :false,

		//验证规则
		rule = {
			// 正则规则
			"eng" : /^[A-Za-z]+$/,
			"chn" :/^[\u0391-\uFFE5]+$/,
			"mail" : /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
			"url" : /^http[s]?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
			"currency" : /^\d+(\.\d+)?$/,
			"number" : /^\d+$/,
			"int" : /^[0-9]{1,30}$/,
			"double" : /^[-\+]?\d+(\.\d+)?$/,
			"username" : /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
			"password" : /^(\w){6,20}$/,
			"safe" : />|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i,
			"dbc" : /[ａ-ｚＡ-Ｚ０-９！＠＃￥％＾＆＊（）＿＋｛｝［］｜：＂＇；．，／？＜＞｀～　]/,
			"qq" : /[1-9][0-9]{4,}/,
			"date" : /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/,
			"year" : /^(19|20)[0-9]{2}$/,
			"month" : /^(0?[1-9]|1[0-2])$/,
			"day" : /^((0?[1-9])|((1|2)[0-9])|30|31)$/,
			"hour" : /^((0?[1-9])|((1|2)[0-3]))$/,
			"minute" : /^((0?[1-9])|((1|5)[0-9]))$/,
			"second" : /^((0?[1-9])|((1|5)[0-9]))$/,
			"mobile" : /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
			"phone" : /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
			"zipcode" : /^[1-9]\d{5}$/,
			"bodycard" : /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
			"ip" : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,		
			"file": /^[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
			"image" : /.+\.(jpg|gif|png|bmp)$/i,
			"word" : /.+\.(doc|rtf|pdf)$/i,
			"score":/^\d+:{1}\d+$/,

			// 函数规则
			"eq": function(arg1,arg2){ 
				if( isNaN(arg1) || isNaN(arg2) || $.trim(arg1)=='' || $.trim(arg2) == '')
					return true;
				return arg1==arg2 ? true:false;
			},
			"gt": function(arg1,arg2){ 
				if( isNaN(arg1) || isNaN(arg2) || $.trim(arg1)=='' || $.trim(arg2) == '')
					return true;
				return Number(arg1)>Number(arg2) ? true:false;
			},
			"gte": function(arg1,arg2){ 
				if( isNaN(arg1) || isNaN(arg2) || $.trim(arg1)=='' || $.trim(arg2) == '')
					return true;
				return Number(arg1)>=Number(arg2) ? true:false;
			},
			"lt": function(arg1,arg2){ 
				if( isNaN(arg1) || isNaN(arg2) || $.trim(arg1)=='' || $.trim(arg2) == '')
					return true;
				return Number(arg1)<Number(arg2) ? true:false;
			},
			"lte": function(arg1,arg2){ 
				if( isNaN(arg1) || isNaN(arg2) || $.trim(arg1)=='' || $.trim(arg2) == '')
					return true;
				return Number(arg1)<=Number(arg2) ? true:false;
			}
			
		},

		//简单验证提示信息后缀
		msgSuffix = {
			"eng" : "只能输入英文！" ,
			"chn" : "只能输入汉字！",
			"mail" : "格式不正确！",
			"url" : "格式不正确！",
			"currency" : "数字格式有误！",
			"number" : "只能为数字！",
			"int" : "只能为整数！",
			"double" : "只能为带小数的数字！",
			"username" :"只能为数字和英文及下划线和.的组合，开头为字母，4-20个字符！",
			"password" : "只能为数字和英文及下划线的组合，6-20个字符！",
			"safe" : "不能有特殊字符！",
			"dbc" : "不能有全角字符！",
			"qq" : "格式不正确！",
			"date" : "格式不正确！",
			"year" : "不正确！",
			"month" :"不正确！",
			"day" : "不正确！",
			"hour" : "不正确！",
			"minute" :"不正确！",
			"second" :"不正确！",
			"mobile" : "格式不正确！",
			"phone" : "格式不正确！",
			"zipcode" : "格式不正确！",
			"bodycard" : "格式不正确！",
			"ip" : "IP不正确！",
			"file": "类型不正确！",
			"image" : "类型不正确！",
			"word" : "类型不正确！",
			"eq": "输入的数值范围有误！", //"输入的数值范围有误！",//"不等于！"
			"gt": "输入的数值范围有误！", //"不大于！"
			"gte":"输入的数值范围有误！", //"不大于或等于！"
			"lt": "输入的数值范围有误！", //"不小于！"
			"lte":"输入的数值范围有误！", //"不小于或等于！"
			"score":"格式有误！格式为：a:b (1:2)"
		},


		msg = "", formObj = $(this) , checkRet = true, 
		tipname = function(namestr){ return "tip_" + namestr.replace(/([a-zA-Z0-9])/g,"-$1"); },		
		
		//规则类型匹配检测
		typeTest = function(){
			var result = true,args = arguments;
			if(rule.hasOwnProperty(args[0])){
				var t = rule[args[0]], v = args[1];
				result = args.length>2 ? t.apply(arguments,[].slice.call(args,1)):($.isFunction(t) ? t(v) :t.test(v));
			}
			return result;
		},
		
		//错误信息提示  
		showError = function(fieldObj,warnInfo,gravity_){
			
			fieldObj = fieldObj[0];
	        var opts = {fade: true, gravity: gravity_};
        	var tip = null, cancelHide = false;
			
			 $.data(fieldObj, 'cancel.tipsy', true);

            var tip = $.data(fieldObj, 'active.tipsy');
            
            if(tip){
                if (opts.fade) {
                    tip.stop().fadeOut(function() { $(this).remove(); });
                } else {
                    tip.remove();
                }
            }
            
            tip = $('<div class="tipsy"><div class="tipsy-inner">' + warnInfo + '</div></div>');
            tip.css({position: 'absolute', zIndex: 100000});
            $.data(fieldObj, 'active.tipsy', tip);
            
            var pos = $.extend({}, $(fieldObj).offset(), {width: fieldObj.offsetWidth, height: fieldObj.offsetHeight});
            tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
            var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
            
            switch (opts.gravity.charAt(0)) {
                case 'n':
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                    break;
                case 's':
                    tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                    break;
                case 'e':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                    break;
                case 'w':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                    break;
            }

            if (opts.fade) {
                tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 1});
            } else {
                tip.css({visibility: 'visible'});
            }
		},

		//清楚错误提示
		clearError = function(fieldObj){
			
			fieldObj = fieldObj[0];
			
	        var opts = {fade: true};
        	var tip = null, cancelHide = false;
			
            $.data(fieldObj, 'cancel.tipsy', false);
            var self = fieldObj;
            setTimeout(function() {
                if ($.data(fieldObj, 'cancel.tipsy')) return;
                var tip = $.data(self, 'active.tipsy');
                if(tip){
	                if (opts.fade) {
	                    tip.stop().fadeOut(function() { $(this).remove(); });
	                } else {
	                    tip.remove();
	                }
                }
            }, 100);
		},

		//匹配对比值的提示名
		findTo = function(objName){
			var find;
			$.each(items, function(){
				if(this.name == objName && this.simple){
					find = this.simple;	return false;
				}
			});
			if(!find) find = $("[name='"+objName+"']")[0].name;
			return find;
		},
		
		//单元素验证
		fieldCheck = function(item){
			
			var checkResult = true;
			
			var $items = item.items, 		
			//要验证的元素
			field = $("[name='"+item.name+"']",formObj[0]);
			
			if(!field[0]) return;
			
			$($items).each(function(){
				
				//消息提示的位置
				var gravity = (typeof this.gravity == "undefined" ? "s" : this.gravity),
				
				    warnMsg,fv = $.trim(field.val()),isRq = typeof this.require ==="boolean" ? this.require : true;
			
				this.message  = (typeof this.message == "undefined" ? "":this.message);			
				this.simple  = (typeof this.simple == "undefined" ? "":this.simple);


					if( isRq && ((field.is(":radio")|| field.is(":checkbox")) && !field.is(":checked"))){
						warnMsg =  this.message|| this.simple + "没有选择！";
						showError(field ,warnMsg,gravity);
						checkResult = false;
						return false;
					}else if (isRq && fv == "" ){	
						warnMsg =  this.message || this.simple + ( field.is("select") ? "没有选择！" :"不能为空！" );
						showError(field , warnMsg,gravity);
						checkResult = false;
						return false;
					}else if(fv != ""){
						if(this.min || this.max){
							var len = fv.length, min = this.min || 0, max = this.max;
							warnMsg =  this.message || (max? this.simple + "长度范围应在"+min+"~"+max+"之间！":this.simple + "长度应大于"+min);
		
							if( (max && (len>max || len<min)) || (!max && len<min) ){
								showError(field ,warnMsg,gravity);	
								checkResult = false;
								return false;
							}
						}
						if(this.type){
							var matchVal = this.to ? $.trim($("[name='"+this.to+"']").val()) :this.value;
							var matchRet = matchVal ? typeTest(this.type,fv,matchVal) :typeTest(this.type,fv);
		
							warnMsg = this.message|| this.simple + msgSuffix[this.type];
							if(matchVal && this.simple) warnMsg += (this.to ? findTo(this.to) +"的值" :this.value);
		
							if(!matchRet){
								 showError(field ,warnMsg,gravity);
								 checkResult = false;
								 return false;
							}else clearError(field,this.name);
		
						}else{
							clearError(field,this.name);
						}
		
					}else if (isRq){
						clearError(field,this.name);
					}
				
			});
			return checkResult;		
		},

		//元素组验证
		validate = function(){
			
			var result = true;
			
			$.each(items, function(){
				var res_ = fieldCheck(this)
				result = result && res_;
			});
			
			if(isAlert && msg != ""){
				alert(msg);	msg = "";
			}
			
			return result;
		};

		//单元素事件绑定
		$.each(items, function(){			
			var field = $("[name='"+this.name+"']",formObj[0]);
			if(field.is(":hidden")) return;

			var obj = this,toCheck = function(){ fieldCheck(obj);},toClearError = function(){clearError(field);};
			
			//绑定焦点事件，清除错误提示
			field.focus(toClearError);
			
			if(field.is(":file") || field.is("select")){
				field.change(toCheck);
			}else{
				field.blur(toCheck);
			}
		});		
		
		
		//提交事件绑定
		if(isBindSubmit) {
			$(this).submit(validate);
		}else{
			return validate();
		}
		
	}

});

})(jQuery);
