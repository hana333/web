import Toast from '../../../components/Toast';
import key from '../../../utils/keymaster';
import {Modal} from 'antd';
import {hashHistory} from 'dva/router';
import {validationRepeatEmail, registerByEmailAndRandom} from '../services/registerService';
import {emailRandom, checkEmailRandom} from '../services/randomService';

const currentPath = '/register';

const defaultState = {
	step: 1,
	email: '',
	random: '',
	username: '',
	password: '',
	passwordComfirm: '',
	shouldNext: true
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
		
		changeShouldNext(state) {
			return {...state, ...{shouldNext: !state.shouldNext}};
		},
		
		resetState() {
			return {...defaultState};
		}

	},
	
	effects: {
		
		*stepNext(action, { select, put }) {
			const registerState = yield select(state => state.register);
			let shouldNext = registerState.shouldNext;
			if(!shouldNext) {
				return;
			} else {
				yield put({type: 'changeShouldNext'});
			}
			let email = registerState.email;
			let random = registerState.random;
			let username = registerState.username;
			let password = registerState.password;
			let passwordComfirm = registerState.passwordComfirm;
			let res;
			switch (registerState.step){
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
					res = yield validationRepeatEmail(email);
					if(res.res !== 1) {
						Toast.show(res.msg);
						break;
					}
					res = yield emailRandom(email);
					if(res.res === 1) {
						yield put({type: 'stepNextComplete'});
						break;
					} else {
						Toast.show(res.msg);
						break;
					}
				case 2:
					if(!random) {
						Toast.show('验证码不能为空');
						break;
					}
					res = yield checkEmailRandom(random, email);
					if(res.res === 1) {
						yield put({type: 'stepNextComplete'});
						break;
					} else {
						Toast.show(res.msg);
						break;
					}
				case 3:
					if(!username) {
						Toast.show('用户名不能为空');
						break;
					}
					if(!password) {
						Toast.show('密码不能为空');
						break;
					}
					if(password !== passwordComfirm) {
						Toast.show('两次输入密码不一致');
						break;
					}
					res = yield registerByEmailAndRandom(email, random, username, password);
					if(res.res === 1) {
						Modal.success({
							title: '注册成功',
							content: '立即前往登录吧！',
							okText: '立即前往',
							onOk: function() {
								hashHistory.push('/login');
							},
							maskClosable: false
						});
						return;
					} else {
						Toast.show(res.msg);
						break;
					}
			}
			yield put({type: 'changeShouldNext'});
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}) {
			history.listen(({ pathname }) => {
		        if (pathname !== currentPath) {
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