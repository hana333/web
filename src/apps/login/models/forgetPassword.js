import Toast from '../../../components/Toast';
import key from '../../../utils/keymaster';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {emailRandom, checkEmailRandom} from '../services/randomService';
import {validationExistEmail} from '../services/registerService.js';
import {updatePasswordByEmailAndRand} from '../services/userService';

const currentPath = '/forgetPassword';

const defaultState = {
	step: 1,
	email: '',
	random: '',
	password: '',
	shouldNext: true
};

export default {

	namespace: 'forgetPassword',

	state: {...defaultState},

	reducers: {
		
		emailChange(state, {payload}) {
	  		return {...state, email: payload};
	  	},
	  	
	  	randomChange(state, {payload}) {
	  		return {...state, random: payload};
	  	},
	  	
	  	passwordChange(state, {payload}) {
	  		return {...state, password: payload};
	  	},

		stepNextComplete(state) {
			return {...state, ...{step: state.step + 1}};
		},
		
		changeShouldNext(state) {
			return {...state, ...{shouldNext: !state.shouldNext}};
		},
		
		resetState() {
			return {...defaultState};
		}

	},
	
	effects: {
		
		*stepNext(action, { select, put }) {
			const forgetPasswordState = yield select(state => state.forgetPassword);
			let shouldNext = forgetPasswordState.shouldNext;
			let doShouldNext = false;
			if(!shouldNext) {
				return;
			} else {
				yield put({type: 'changeShouldNext'});
			}
			let email = forgetPasswordState.email;
			let random = forgetPasswordState.random;
			let password = forgetPasswordState.password;
			let res;
			switch (forgetPasswordState.step) {
				case 1:
					if(!email) {
						Toast.show('邮箱不能为空');
						break;
					}
					let emailReg = /^([a-z0-9A-Z]+[-|_|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
					if(!emailReg.test(email)) {
						Toast.show('邮箱格式错误');
						break;
					}
					res = yield validationExistEmail(email);
					if(res.res !== 1 || !res.data) {
						Toast.show(res.msg);
						break;
					}
					res = yield emailRandom(email);
					if(res.res === 1) {
						yield doShouldNext = true;
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
					if(res.res === 1) {
						yield doShouldNext = true;
						break;
					} else {
						yield Toast.show(res.msg);
						break;
					}
				case 3:
					if(!password) {
						yield Toast.show('新密码不能为空');
						break;
					}
					res = yield updatePasswordByEmailAndRand(random, email, password);
					if(res.res === 1) {
						yield new Promise((resolve) => {
							Modal.success({
								title: '重置成功',
								content: '立即前往登录吧！',
								okText: '立即前往',
								onOk: () => {
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
			yield put({type: 'changeShouldNext'});
			if(doShouldNext) yield put({type: 'stepNextComplete'});
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}) {
			history.listen(({ pathname }) => {
		        if (pathname === currentPath) {
		        	dispatch({type: 'resetState'});
		        }
			});
		},
		
		enter({dispatch, history}) {
			return key.routerBind({
				history: history, 
				path: currentPath, 
				keyStr: 'enter', 
				callback: function() {
					dispatch({type: 'stepNext'});
				}
			});
		}
		
	}

}