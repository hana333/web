import request from '../../../utils/request';
import {userCenter} from '../../../config/config';

/**
 * 通过邮箱和验证码更新密码
 */
function updatePasswordByEmailAndRand(random, email, password) {
	return request(userCenter('/api/user/updatePasswordByEmailAndRand'), {
		data: {
			email: email,
			random: random,
			password: password
		}
	});
}

export default {
	updatePasswordByEmailAndRand: updatePasswordByEmailAndRand
}
