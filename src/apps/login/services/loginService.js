import request from '../../../utils/request';
import {userCenter} from '../../../config/config';
import {getToken} from '../../../utils/web';

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
	let token = getToken();
	if(!token) {
		return {
			res: 0
		};
	}
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
