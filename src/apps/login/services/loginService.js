import request from '../../../utils/request';
import { userCenter } from '../../../constants/UrlConstant';

function loginMix(account, certificate, expire) {
	return request(userCenter('/api/login/loginMix'), {
		data: {
			account: account,
			certificate: certificate,
			expire: expire
		}
	});
}

export default {
	loginMix: loginMix
};
