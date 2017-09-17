import utils from '../utils/utils';
import code from '../utils/code';

function BseMap() {
	let _size = 0; // Map 大小
	let _entry = new Object(); // 实体对象
	let _refKey = function(key) {
		return utils.ref(key);
	}
	let _containsKey = function(key) {
		return _entry.hasOwnProperty(key);
	}
	// 存入
	this.put = function(key, value) {
		let refKey = _refKey(key);
		if(_containsKey(refKey)) {
			this.remove(key);
		}
		_size++;
		_entry[refKey] = value;
	}
	// 获取
	this.get = function(key) {
		let refKey = _refKey(key);
		return _containsKey(refKey) ? _entry[refKey] : undefined;
	}
	// 删除
	this.remove = function(key) {
		let refKey = _refKey(key);
		if(_containsKey(refKey) && (delete _entry[refKey])) {
			_size--;
		}
	}
	// 包含key
	this.containsKey = function(key) {
		let refKey = _refKey(key);
		return _containsKey(refKey) ? true : false;
	}
	// 包含值
	this.containsValue = function(value) {
		for(let prop in _entry) {
			if(_entry[prop] == value) {
				return true;
			}
		}
		return false;
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
	}
}

function Map() {
	let _keyMap = new BseMap();
	let _valueMap = new BseMap();
	// 存入
	this.put = function(key, value) {
		_keyMap.put(key, key);
		_valueMap.put(key, value);
		return this;
	}
	// 获取
	this.get = function(key) {
		return _valueMap.get(key);
	}
	// 删除
	this.remove = function(key) {
		_keyMap.remove(key);
		_valueMap.remove(key);
		return this;
	}
	// 包含key
	this.containsKey = function(key) {
		return _valueMap.containsKey(key);
	}
	// 包含值
	this.containsValue = function(value) {
		return _valueMap.containsValue(value);
	}
	// 获取装有所有值的数组
	this.values = function() {
		return _valueMap.values();
	}
	// 获取装有所有键的数组
	this.keys = function() {
		return _keyMap.values();;
	}
	// 获取大小
	this.size = function() {
		return _valueMap.size();
	}
	// 清空
	this.clear = function() {
		_keyMap.clear();
		_valueMap.clear();
		return this;
	}
	// 遍历
	this.each = function(fn) {
		if(this.size() <= 0) return;
		fn = fn || function() {};
		let keys = this.keys();
		for(var i = 0; i < keys.length; i ++) {
			fn(keys[i], this.get(keys[i]));
		}
	}
}

/**
 * 将数组构建为一个对应唯一uuid的Map对象
 */
function uuidMap(array) {
	let map = new Map();
	if(array) {
		for(var i = 0; i < array.length; i ++) {
			map.put(code.uuid(), array[i]);
		}
	}
	return map;
}

Map.uuidMap = uuidMap;

export default Map;