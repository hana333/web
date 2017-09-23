import store from 'store';

function set(key, value, expire = -1) {
    store.set(key, {
        payload: value,
        saveTime: new Date().getTime(),
        expire: expire
    });
}

function get(key) {
    let data = store.get(key);
    if(data && (data.expire < 0 || (new Date().getTime() - data.saveTime) > data.expire)) {
        return data.payload;
    } else {
        store.remove(key);
        return undefined;
    }
}

function remove(key) {
    store.remove(key);
}

function clear() {
    store.clearAll();
}

function each(callback) {
    store.each(function(value, key) {
        if(callback) callback(key, value);
    })
}

export default {
	set,
	get,
	remove,
	clear,
	each
};