import request from '../../../utils/request';
import {userCenter} from '../../../config/config';

function loginMix(account, certificate, expire) {
	return request(userCenter('/api/login/loginMix'), {
		data: {
			account: account,
			certificate: certificate,
			expire: expire
		}
	});
}

function loginByToken() {
	// request中自动注入token
	return request(userCenter('/api/login/loginByToken'), {
		data: {
			token: token
		}
	});
}

export default {
	loginMix: loginMix,
	loginByToken: loginByToken
};
