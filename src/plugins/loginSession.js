import {getState, dispatch} from '../utils/app';
import {toDate} from '../utils/utils';

const LOGIN = '@@DVA_LOGIN_SESSION/LOGIN';
const UNLOGIN = '@@DVA_LOGIN_SESSION/UNLOGIN';
const NAMESPACE = 'loginSession';

function setLoginSession(loginSession) {
	dispatch({type: LOGIN, payload: {loginSession}});
}

function removeLoginSession() {
	dispatch({type: UNLOGIN});
}

function getLoginSession() {
	let currentState = getState();
	let loginSession = currentState.loginSession.loginSession;
	if(!loginSession || !loginSession.loginTime) {
		return undefined;
	}
	let currentTime = (new Date()).getTime();
	let loginTime = toDate(loginSession.loginTime).getTime();
	let loginCycle = loginSession.loginCycle;
	if(loginCycle < 0 || currentTime - loginTime < loginCycle) {
		return loginSession;
	} else {
		removeLoginSession();
		return undefined;
	}
}

function createLoginSession(opts = {}) {
	
	const namespace = opts.namespace || NAMESPACE;
	const initialState = {loginSession: undefined};

  	const extraReducers = {
		[namespace](state = initialState, {type, payload = {} }) {
		  	let loginSession = payload.loginSession;
		  	let ret = state;
		  	switch (type) {
			    case LOGIN:
			    	ret = {loginSession};
			      	break;
			    case UNLOGIN:
			      	break;
		  	}
		  	return ret;
		}
  	};

  	return {
    	extraReducers
  	};
  
}

export default {
	createLoginSession,
	setLoginSession,
	removeLoginSession,
	getLoginSession
};
