import key from 'keymaster';
import Map from '../class/Map';
import Set from '../class/Set';

const eventsMap = new Map();

function bindEvent(keyStr, callback) {
	let events = eventsMap.get(keyStr);
	if(!events) {
		events = new Set();
		eventsMap.put(keyStr, events);
	}
	events.add(callback);
}

function unBindEvent(keyStr, callback) {
	let events = eventsMap.get(keyStr);
	if(events) {
		events.remove(callback);
		if(events.size() <= 0) {
			eventsMap.remove(keyStr);
		}
	}
}

key.filter = function(event) {
	return true;
}

key.routerBind = function({history, path, keyStr, callback}) {
	const bindFn = () => {
		if(!eventsMap.get(keyStr)) {
			key(keyStr, () => {
				let events = eventsMap.get(keyStr);
				if(events) {
					events.each((value) => {
						if(value) value();
					});
				}
			});
		}
		bindEvent(keyStr, callback);
	}
	const unBindFn = () => {
		unBindEvent(keyStr, callback);
		let events = eventsMap.get(keyStr);
		if(!events || events.size() <= 0) {
			key.unbind(keyStr);
		}
	}
	history.listen(({ pathname }) => {
        if (pathname === path) {
        	bindFn();
        } else {
        	unBindFn();
        }
	});
	return unBindFn;
}

export default key;


// demo

//		enter({dispatch, history}) {
//			return key.routerBind({
//				history: history, 
//				path: currentPath, 
//				keyStr: 'enter', 
//				callback: function() {
//					dispatch({type: 'login'});
//				}
//			});
//		}