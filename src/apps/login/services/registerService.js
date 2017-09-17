import request from '../../../utils/request';
import { userCenter } from '../../../constants/UrlConstant';

/**
 * 邮箱存在验证
 */
function validationExistEmail(email) {
	return request(userCenter('/api/register/validationExistEmail'), {
		data: {
			email: email
		}
	});
}

/**
 * 邮箱重复验证
 */
function validationRepeatEmail(email) {
	return request(userCenter('/api/register/validationRepeatEmail'), {
		data: {
			email: email
		}
	});
}

/**
 * 邮箱/验证码 注册
 */
function registerByEmailAndRandom(email, random, username, password, mobilePhone) {
	return request(userCenter('/api/register/registerByEmailAndRandom'), {
		data: {
			email: email,
			random: random,
			username: username,
			password: password,
			mobilePhone: mobilePhone
		}
	});
}

export default {
	validationExistEmail: validationExistEmail,
	validationRepeatEmail: validationRepeatEmail,
	registerByEmailAndRandom: registerByEmailAndRandom
}
