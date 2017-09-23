import {getState} from '../utils/app';
import {clone} from '../utils/utils';

const LOCK = '@@DVA_EFFECT_LOCK/LOCK';
const UNLOCK = '@@DVA_EFFECT_LOCK/UNLOCK';
const NAMESPACE = 'effectLock';

const STATE_LOCKING = 1;
const STATE_LOCKED = 2;

/**
 * 1.在loading插件之后注册该接口
 * 2.注册该插件后,同一effect调用变为串行
 */
function createEffectLock(opts = {}) {
		
	const namespace = opts.namespace || NAMESPACE;
	const initialState = {
		locks: {}
	};
	
	const extraReducers = {
		[namespace](state = initialState, {type, payload}) {
			const {namespace, actionType} = payload || {};
			let ret = clone(state);
			let lockState = ret.locks[actionType];
			switch (type) {
				case LOCK:
					if(!lockState) {
						ret.locks[actionType] = STATE_LOCKING;
					} else {
						ret.locks[actionType] = STATE_LOCKED;
					}
					break;
				case UNLOCK:
					if(lockState === STATE_LOCKED) {
						ret.locks[actionType] = STATE_LOCKING;
					} else {
						delete ret.locks[actionType];
					}
					break;
			}
			return ret;
		},
	};
	
	function isLock(actionType) {
		let state = getState();
		let stateLock = state.effectLock.locks[actionType];
		return stateLock === STATE_LOCKED;
	}
	
	function onEffect(effect, {put}, model, actionType) {
		const {namespace} = model;
		return function*(...args) {
			yield put({type: LOCK, payload: {namespace, actionType}});
			if(!isLock(actionType)) {
				yield effect(...args);
			}
			yield put({type: UNLOCK, payload: {namespace, actionType}});
		};
	}
	
	return {
		extraReducers,
		onEffect
	};
  
}

export default createEffectLock;
