import store from './store';

const TOKEN = 'token';

function setToken(token, expire) {
	return store.get(TOKEN, token, expire);
}

function getToken() {
	return store.get(TOKEN);
}

export default {
	setToken: setToken,
	getToken: getToken
};
