import {uuid} from './code';

/**
 * 序列化对象,但无法再序列化后拿回对象引用
 * @param {Object} obj 将对象序列化为字符串(包括函数)
 */
function serialize(obj) {
    let serStr = '';
    function serializeInternal(o, path) {
        for(let p in o) {
            let value = o[p];
            if(typeof value != "object") {
                if(typeof value == "string") {
                    serStr += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + "\"" + value.replace(/\"/g, "\\\"") + "\"" + ";";
                } else {
                    serStr += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + value + ";";
                }
            } else {
                if(value instanceof Array) {
                    serStr += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Array();";
                    serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
                } else {
                    serStr += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Object();";
                    serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
                }
            }
        }
    }
    serializeInternal(obj, 'deserializeObj');
    return toJson({
    	serJsonObj: toJson(obj),
    	serStr: serStr
    });
}

/**
 * 反序列化
 * @param {Object} serializeStr 由序列化方法生成的子串
 */
function deserialize(serializeObj) {
	let deserializeObj = serializeObj.serJsonObj || {};
	console.log(serializeObj.serStr)
	eval(serializeObj.serStr);
	return deserializeObj;
}

/**
 * 对象克隆
 * @param {Object} obj
 */
function clone(obj) {
	let _className = function(o) {
		if(o === null) return "Null";
		if(o === undefined) return "Undefined";
		return Object.prototype.toString.call(o).slice(8, -1);
	}
	let result, oClass = _className(obj);
	//确定result的类型
	if(oClass === "Object") {
		result = {};
	} else if(oClass === "Array") {
		result = [];
	} else {
		return obj;
	}
	for(let key in obj) {
		let copy = obj[key];
		if(_className(copy) == "Object" || _className(copy) == "Array") {
			result[key] = clone(copy); //递归调用
		} else {
			result[key] = obj[key];
		}
	}
	return result;
}

/**
 * 对象深度合并,已obj2为目标更新obj1对象
 * @param {Object} obj1
 * @param {Object} obj2
 */
function merge(obj1={}, obj2={}) {
	let _obj1 = clone(obj1);
	let _obj2 = clone(obj2);
	let key;
	for(key in _obj2) _obj1[key] = _obj1[key] && _obj1[key].toString() === "[object Object]" ? merge(_obj1[key], _obj2[key]) : _obj1[key] = _obj2[key];
	return _obj1;
}

/**
 * 获取对象唯一引用
 * @param {Object} obj
 */
function ref(obj) {
	// 获取对象的唯一引用
	switch(obj) {
		case undefined:
			return 'undefined';
		case null:
			return 'null';
		case true:
			return 'true';
		case false:
			return 'false';
		default:
			switch(typeof obj) {
				case 'number': // 数字带有number前缀 
					return 'number:' + obj;
				case 'string': // 字符串带有string前缀 
					return 'string:' + obj;
				default:
					let refKey = '__ref__key__';
					if(!obj.hasOwnProperty(refKey)) {
						obj[refKey] = uuid();
					}
					return '@:' + obj[refKey];
			}
	}
}

/**
 * 对象比较
 * @param {Object} obj1
 * @param {Object} obj2
 */
function equals(obj1, obj2) {
	return ref(obj1) === ref(obj2);
}

/**
 * 对象转化为json字符串
 * @param {Object} obj
 */
function toJson(obj) {
	return JSON.stringify(obj);
}

/**
 * json字符串转化为对象
 * @param {String} jsonStr
 */
function fromJson(jsonStr) {
	return JSON.parse(jsonStr);
}

/**
 * 剔除字符串首尾空白
 * @param {String} str
 */
function trim(str) {
	if(!str) {
		return '';
	}
	return str.replace(/^\s*/g, '').replace(/\s*$/g, '');
}

/**
 * 求最大公约数
 * @param {Number} m
 * @param {Number} n
 */
function gcd(m, n) {
	let u = m;
	let v = n;
	let t = v;
	while(v != 0) {
		t = u % v;
		u = v;
		v = t;
	}
	return u
}

/**
 * 小数转分式
 * @param {Number} decimal
 */
function dtf(decimal) {
	if(!decimal) {
		return undefined;
	}
	let decimalStr = decimal + '';
	decimalStr = decimalStr.replace(/^.+\./g, '');
	if(!decimalStr) {
		return undefined;
	}
	let zeroCount = decimalStr.length;
	let denominatorStr = '1';
	for(let i = 0; i < zeroCount; i++) {
		denominatorStr += '0';
	}
	let molecular = Number((decimal + '').replace('.', ''));
	let denominator = Number(denominatorStr);
	let gcdNum = gcd(molecular, denominator);
	return(molecular / gcdNum) + '/' + (denominator / gcdNum);
}

/**
 * 日期格式化:
 * @param {String} expression
 * 		yyyy: 年
 * 		MM: 月份 
 * 		dd: 日
 * 		HH: 小时 
 * 		mm: 分钟 
 * 		ss: 秒 
 * 		S: 毫秒
 * 		q: 季度
 * 	例如: yyyy-MM-dd HH:mm:ss:SS
 * @param {Date} date
 */
function dateFormat(expression, date) {
	let o = {
		yyyy: date.getFullYear(), // 年
		MM: date.getMonth() + 1, // 月份
		dd: date.getDate(), // 日
		HH: date.getHours(), // 小时
		mm: date.getMinutes(), // 分
		ss: date.getSeconds(), // 秒
		q: Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds() // 毫秒
	};
	let _replace = function(str) {
		expression = expression.replace(str, o[str]);
	}
	let strs = ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss', 'S', 'q'];
	for(let i = 0; i < strs.length; i++) {
		_replace(strs[i]);
	}
	return expression;
}

/**
 * yyyy-MM-dd HH:mm:ss:SS格式转Date
 * @param {Object} dateStr
 */
function toDate(dateStr) {
	// 从格式化子串获取日期
	var date = new Date();
	var cut = function(start, end) {
		var res = null;
		return parseInt(dateStr.substring(start, end), 10);
	};
	if(cut(0, 4)) {
		date.setYear(cut(0, 4));
	} else {
		date.setYear(0);
	}
	if(cut(5, 7)) {
		date.setMonth(cut(5, 7) - 1);
	} else {
		date.setMonth(0);
	}
	if(cut(8, 10)) {
		date.setDate(cut(8, 10));
	} else {
		date.setDate(0);
	}
	if(cut(11, 13)) {
		date.setHours(cut(11, 13));
	} else {
		date.setHours(0);
	}
	if(cut(14, 16)) {
		date.setMinutes(cut(14, 16));
	} else {
		date.setMinutes(0);
	}
	if(cut(17, 19)) {
		date.setSeconds(cut(17, 19));
	} else {
		date.setSeconds(0);
	}
	if(cut(20, 22)) {
		date.setMilliseconds(cut(20, 22));
	} else {
		date.setMilliseconds(0);
	}
	return date;
}

/**
 * 滚动条在Y轴上的滚动距离
 */
function scrollTop() {
	let bodyScrollTop = 0, documentScrollTop = 0;　　
	if(document.body) {　　　　
		bodyScrollTop = document.body.scrollTop;　　
	}　　
	if(document.documentElement) {　　　　
		documentScrollTop = document.documentElement.scrollTop;　　
	}　　
	return bodyScrollTop > documentScrollTop ? bodyScrollTop : documentScrollTop;
}

/**
 * 浏览器视口的高度
 */
function clientHeight() {　　
	return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
}

/**
 * 文档的总高度
 */
function scrollHeight() {
	let bodyScrollHeight = 0, documentScrollHeight = 0;　　
	if(document.body) {　　　　
		bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if(document.documentElement) {　　　　
		documentScrollHeight = document.documentElement.scrollHeight;　　
	}　　
	return bodyScrollHeight > documentScrollHeight ? bodyScrollHeight : documentScrollHeight;
}

/**
 * 是否在顶部
 */
function isTop() {
	return scrollTop() === 0;
}

/**
 * 浏览器底部判断
 * @param {Number} offset 偏移值
 */
function isBottom(offset) {
	offset = offset || 0;
	return scrollTop() + clientHeight() + offset >= scrollHeight();
}

/**
 * 获取浏览器视窗宽度
 */
function clientWidth() {
	return document.body.clientWidth;
}

/**
 * 获取浏览器视窗高度(包括边线的宽)
 */
function offsetHeight() {
	return document.body.offsetHeight;
}

/**
 * 获取浏览器视窗宽度(包括边线的宽)
 */
function offsetWidth() {
	return document.body.offsetWidth;
}

/**
 * 移动设备判断
 */
function isMobile() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
		return true;
	return false;
}

/**
 * 关闭窗口
 */
function closeWindow() {
	if(navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) {
		window.location.href = 'about:blank';
		window.close();
	} else {
		window.opener = null;
		window.open('', '_self');
		window.close();
	}
}

export default {
	serialize,
	deserialize,
	clone,
	merge,
	ref,
	equals,
	toJson,
	fromJson,
	trim,
	gcd,
	dtf,
	dateFormat,
	toDate,
	scrollTop,
	scrollHeight,
	isTop,
	isBottom,
	clientHeight,
	clientWidth,
	offsetHeight,
	isMobile,
	closeWindow
};