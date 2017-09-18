import request from '../../../utils/request';
import {userCenter} from '../../../config/config';

/**
 * 邮箱随机码
 */
function emailRandom(email, lifeCycle = 1800000) {
	return request(userCenter('/api/random/emailRandom'), {
		data: {
			email: email,
			lifeCycle: lifeCycle
		}
	});
}

/**
 * 验证邮箱随机码
 */
function checkEmailRandom(random, email) {
	return request(userCenter('/api/random/checkEmailRandom'), {
		data: {
			email: email,
			random: random
		}
	});
}

export default {
	emailRandom: emailRandom,
	checkEmailRandom: checkEmailRandom
}
