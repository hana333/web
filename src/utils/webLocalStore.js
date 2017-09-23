import localStore from './localStore';
import {getStore} from './app';

const WEB_STATE = 'WEB_STATE';
const LOGIN_SESSION = 'LOGIN_SESSION';

function setWebState() {
	let store = getStore();
	if(store) localStore.set(WEB_STATE, store.getState());
}

function getWebState() {
	return localStore.get(WEB_STATE);
}

function removeWebState() {
	localStore.remove(WEB_STATE);
}

function setLoginSession(loginSession) {
    if(loginSession) {
        store.set(LOGIN_SESSION, loginSession, loginSession.loginCycle * 1000);
    }
}

function getLoginSession() {
    return store.get(LOGIN_SESSION);
}

function removeLoginSession() {
    store.remove(LOGIN_SESSION);
}

export default {
	...localStore,
	setWebState,
	getWebState,
	removeWebState,
    setLoginSession,
    getLoginSession,
    removeLoginSession
};