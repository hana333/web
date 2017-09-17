import utils from '../utils/utils';

function Set() {
	let _size = 0; // S 大小
	let _entry = new Object(); // 实体对象
	let _refKey = function(key) {
		return utils.ref(key);
	}
	let _containsKey = function(key) {
		return _entry.hasOwnProperty(key);
	}
	// 存入
	this.add = function(obj) {
		let key = _refKey(obj);
		if(_containsKey(key)) {
			this.remove(obj);
		}
		_entry[key] = obj;
		_size ++;
		return this;
	}
	// 删除
	this.remove = function(obj) {
		let key = _refKey(obj);
		if(_containsKey(key) && (delete _entry[key])) {
			_size --;
		}
		return this;
	}
	// 包含
	this.contains = function(obj) {
		let key = _refKey(obj);
		return _containsKey(key) ? true : false;
	}
	// 获取装有所有值的数组
	this.values = function() {
		let values = new Array();
		for(let prop in _entry) {
			if(_entry.hasOwnProperty(prop)) {
				values.push(_entry[prop]);
			}
		}
		return values;
	}
	// 获取大小
	this.size = function() {
		return _size;
	}
	// 清空
	this.clear = function() {
		_size = 0;
		_entry = new Object();
		return this;
	}
	// 遍历
	this.each = function(fn) {
		if(this.size() <= 0) return;
		fn = fn || function() {};
		let values = this.values();
		for(var i = 0; i < values.length; i ++) {
			fn(values[i]);
		}
	}
};

export default Set