import Toast from '../../../components/Toast';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {validationRepeatEmail, registerByEmailAndRandom} from '../services/registerService';
import {emailRandom, checkEmailRandom} from '../services/randomService';

const currentPath = '/register';

const defaultState = {
	step: 1,
	email: '',
	random: '',
	username: '',
	password: '',
	passwordComfirm: ''
};

export default {

	namespace: 'register',
	
	state: {...defaultState},
	
	reducers: {
		
		emailChange(state, {payload}) {
	  		return {...state, email: payload};
	  	},
	  	
	  	randomChange(state, {payload}) {
	  		return {...state, random: payload};
	  	},
	  	
	  	usernameChange(state, {payload}) {
	  		return {...state, username: payload};
	  	},
	  	
	  	passwordChange(state, {payload}) {
	  		return {...state, password: payload};
	  	},
	  	
	  	passwordComfirmChange(state, {payload}) {
	  		return {...state, passwordComfirm: payload};
	  	},
		
		stepNextComplete(state) {
			return {...state, ...{step: state.step + 1}};
		},
		
		resetState(state) {
			return {...state, ...defaultState};
		}

	},
	
	effects: {
		
		*stepNext(action, {select, put}) {
			let registerState = yield select(state => state.register);
			let isNext = false;
			let email = registerState.email;
			let random = registerState.random;
			let username = registerState.username;
			let password = registerState.password;
			let passwordComfirm = registerState.passwordComfirm;
			let res;
			switch (registerState.step){
				case 1:
					if(!email) {
						yield Toast.show('邮箱不能为空');
						break;
					}
					let emailReg = /^([a-z0-9A-Z]+[-|_|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
					if(!emailReg.test(email)) {
						yield Toast.show('邮箱格式错误');
						break;
					}
					res = yield validationRepeatEmail(email);
					if(!res || res.res !== 1) {
						yield Toast.show(res.msg);
						break;
					}
					res = yield emailRandom(email);
					if(res && res.res === 1) {
						yield isNext = true;
						break;
					} else {
						yield Toast.show(res.msg);
						break;
					}
				case 2:
					if(!random) {
						yield Toast.show('验证码不能为空');
						break;
					}
					res = yield checkEmailRandom(random, email);
					if(res && res.res === 1) {
						yield isNext = true;
						break;
					} else {
						yield Toast.show(res.msg);
						break;
					}
				case 3:
					if(!username) {
						yield Toast.show('用户名不能为空');
						break;
					}
					if(!password) {
						yield Toast.show('密码不能为空');
						break;
					}
					if(password !== passwordComfirm) {
						yield Toast.show('两次输入密码不一致');
						break;
					}
					res = yield registerByEmailAndRandom(email, random, username, password);
					if(res.res === 1) {
						yield new Promise((resolve) => {
							Modal.success({
								title: '注册成功',
								content: '立即前往登录吧！',
								okText: '立即前往',
								onOk: function() {
									resolve();
								},
								maskClosable: false
							});
						});
						yield put(routerRedux.push('/login'));
						return;
					} else {
						yield Toast.show(res.msg);
						break;
					}
			}
			if(isNext) yield put({type: 'stepNextComplete'});
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}) {
			history.listen(({ pathname }) => {
		        if (pathname === currentPath) {
		        	dispatch({type: 'resetState'});
		        }
			});
		}
		
	}

}