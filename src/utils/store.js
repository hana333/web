import store from 'store';

const customStore = {
	
	// expire 超时/毫秒
	set(key, value, expire = -1) {
		store.set(key, {
			payload: value,
			saveTime: new Date().getTime(),
			expire: expire
		});
		return customStore;
	},
	
	get(key) {
		let data = store.get(key);
		if(data && (data.expire < 0 || (new Date().getTime() - data.saveTime) > data.expire)) {
			return data.payload;
		} else {
			customStore.remove(key);
			return undefined;
		}
	},
	
	remove(key) {
		store.remove(key);
		return customStore;
	},
	
	clear() {
		store.clearAll();
		return customStore;
	},
	
	each(callback) {
		store.each(function(value, key) {
			if(callback) callback(key, value);
		})
		return customStore;
	}
	
}

export default customStore;
