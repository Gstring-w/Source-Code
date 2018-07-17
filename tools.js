

// 滚动条
// 返回滚动条的X，Y 坐标
function getSrollOffset() {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return {
			x: document.body.srollLeft + document.documentElement.srollLeft,
			y: document.body.srollTop + document.documentElement.srollTop
		}
	}
}
// 让滚动条滚动
// 3个方法  scroll(),scrollTo(x,y),    scrollbBy(x,y)(可以累加)
// 
// 
// 
// 
// 
// 返回窗口属性
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode === "BackCompat") {
			// 检查是否是怪异模式下 非怪异模式下 改属性为"Css1Compat"
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		} else {
			return {
				w: doucment.documentElement.clientWidth,
				h: doucment.documentElement.clientHeight
			}
		}
	}
}
// 查看元素的几何尺寸
// domElm.getBoundingClientRect()
// 返回的结果并不是‘实时的’
// 返回一个对象 
// 
// 查看元素的尺寸
// dom.offsetWidth  dom.offsetHeight
// 
// 查看元素的位置 
// dom.offsetLeft  dom.oddsetTop
// 对于无定位父级的元素，返回相对文档的坐标，对于有定位的父级，则返回最近的有定位的父级的坐标
// dom.offsetParent 返回有定位的父级，如无，则返回body
// 
// 
// 脚本化css（间接操作css【行间样式】）
// dom.style.prop  可读可写 注：float -> cssFloat
// 复合属性必须拆解（border：1px solid black)
// 组合单词写成小驼峰（backgroundColor） 注 ： class -> className
//
// 查看计算样式的值
// window.getComputedStyle(ele,null)   (null 是取伪元素 存放伪元素的)
// 该样式只读
// 返回的样式都是绝对值，没有相对值（px虽然是相对值，但在计算机中属于绝对值）
// IE8及以下
// ele.currentStyle
// 封装
function getStyle(ele, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele, false)[prop];
	} else {
		return ele.currentStyle[prop];
	}

}
// 事件：交互的核心功能
// 3 种方式
//  1）on + 事件类型 = function(){};(定义的是行间样式 eg:onclick='console.log('a')')
//  兼容性好 只能绑定一个事件 this指向dom本身
//  2) obj.addEventLister(事件类型（不加on）,执行函数，false)
//  ie9以下不兼容 可以为一个元素绑定多个事件（执行函数不能放同一个函数引用） this指向obj本身
//  3）obj.attachEvent('on'+事件类型，执行函数) this指向window
//  eg：改变attachEvent的this指向
//  obj.attachEvent(onclick,function(){
//  test.call(obj);
//  })
// function test(){
// console.log('a');
// }
// 封装
function addEvent(elem, type, handle) {
	if (elem.addEventLister) {
		return elem.addEventLister(type, handle, false);
	} else if (elem.attachEvent) {
		return elem.attachEvent('on' + type, function () {
			handle.call(elem);
		})
	} else {
		return elem['on' + type] = handle;
	}
}
// 解除事件处理程序
// ele.onclick = null//false;
// ele.removeEventLister(type,fn,false)   (若绑定的是匿名函数则无法解除)
// ele.detachEvent()   (若绑定的是匿名函数则无法解除)
// 事件冒泡/捕获
// 同一事件子元素会冒泡到父元素（自底向下）
// 同一事件由父元素捕获到子元素（子元素只是单纯的函数执行）
// 触发顺序 先捕获，后冒泡
// focus, blur, change, submit, reset, select等事件不冒泡
// 取消冒泡
// event.stopPropapation()  不支持ie9以下
// event.cancelBubble = true; ie独有
// 封装
function stopBubble(event) {
	if (event.stopPropapation) {
		event.cancelBubble;
	} else {
		event.cancelBubble;
	}
}
//阻止默认事件
//默认事件-> 表单提交，a标签跳转，右键菜单等
//return false
//event.preventDafult()  w3c标准
//event.returnValue= true; ie独有
//封装
function cancelHander(event) {
	if (event.preventDafult) {
		event.preventDafult();
	} else {
		event.returnValue = true;
	}
}
//事件对象
//event || window.event
//事件源对象
//event.target
//event.srcElement
//兼容写法 
// var event = event || window.event;
// var target = event.srcElement || event.target;
// 事件委托
// 利用事件冒泡/捕获机制
// 灵活 性能
function drag(elem) {
	elem.onmousedown = function (e) {
		var event = e || window.event;
		var disY,
			disX;
		disX = event.pageX - parseInt(div.style.left);
		disY = event.pageY - parseInt(div.style.top);


		document.onmousemove = function (e) {
			div.style.left = e.pageX - disX + 'px';
			div.style.top = e.pageY - disY + 'px';

		}
	}
	elem.onmouseup = function () {
		document.onmousemove = null;

	}
}
//链式运动封装
function startMove(obj, json, callback) {
	var iSpeed, iCur;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var bStop = true;
		for (var attr in json) {
			if (attr == 'opacity') {
				iCur = parseFloat(getStyle(obj, attr)) * 100;
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (attr == 'opacity') {
				obj.style[attr] = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			if (iCur != json[attr]) {
				bStop = false;
			}
		}
		if (bStop) {
			clearInterval(obj.timer);
			typeof (callback) == 'function' ? callback() : '';
		}
	}, 30);
}
// 深度克隆
function deepClone(target, option) {
	var opt, tar;
	if (option != null) {
		for (var prop in option) {
			opt = option[prop];
			tar = target[prop];
			if (tar && typeof tar == 'object') {
				if (Object.prototype.toString.call(tar) == '[object][Array]') {
					tar = tar ? tar : [];
				} else {
					opt = opt ? opt : {};
				}
				tar = deepClone(tar, opt);
			} else {
				target[prop] = tar;
			}
		}
	}
	return target;
}
// 数组的方法源码
// Array.prototype.myForEach = function (func) {
// 	var len = this.length;
// 	for (var i = 0; i < len; i++) {
// 		func(this[i], i);
// 	}

// }
// Array.prototype.myFilter = function (func) {
// 	var len = this.lenght;
// 	var newArr = [];
// 	for (var i = 0; i < len; i++) {
// 		if (func(this[i], i)) {
// 			newArr.push(this[i]);
// 		}
// 	}
// 	return newArr;
// }
// Array.prototype.myRedues = function (func, init) {
// 	var p = init;
// 	var i = 0;
// 	var len = this.length;
// 	if(init === undefine){
// 		i = 1 ;
// 		p = this[0];
// 	}
// 	for(i ; i < len ; i++){
// 		p = func(p,this[i],i);
// 	}
// 	return p;
// }