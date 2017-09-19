import store from './store';

const LOGIN_SESSION = 'LOGIN_SESSION';

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
    setLoginSession: setLoginSession,
    getLoginSession: getLoginSession,
    removeLoginSession: removeLoginSession
};