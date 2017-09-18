import Toast from '../../../components/Toast';
import key from '../../../utils/keymaster';
import {trim} from '../../../utils/utils';
import {setToken} from '../../../utils/web';
import {loginMix} from '../services/loginService';

const currentPath = '/login';

const defaultState = {
  	account: '',
  	password: '',
  	keepLogin: true,
  	shouldLogin: true
};

export default {

	namespace: 'login',

	state: {...defaultState},
	
	reducers: {
  	
	  	accountChange(state, {payload}) {
	  		return {...state, account: payload};
	  	},
	  	
	  	passwordChange(state, {payload}) {
	  		return {...state, password: payload};
	  	},
	  	
	  	keepLoginChange(state, {payload}) {
	  		return {...state, keepLogin: payload};
	  	}, 
	  	
	  	changeShouldLogin(state) {
			return {...state, ...{shouldLogin: !state.shouldLogin}};
		},
		
		resetState() {
			return {...defaultState};
		}
  	
	},
	
	effects: {
		
		*login({payload}, {select, put}) {
			const loginState = yield select(state => state.login);
			let shouldLogin = loginState.shouldLogin;
			if(!shouldLogin) {
				return;
			} else {
				yield put({type: 'changeShouldLogin'});
			}
			let account = loginState.account;
			let password = loginState.password;
			let keepLogin = loginState.keepLogin;
			let expire = keepLogin ? -1 : 1800;
			if(!account || !(trim(account))) {
	  			Toast.show('账号不能为空');
	  		} else if(!password || !(trim(password))) {
				Toast.show('密码不能为空');
	  		} else {
	  			let res = yield loginMix(account, password, expire);
				if(res.res === 1) {
					setToken(res.data.token, res.data.loginCycle);// 置入token
					alert('登录成功');
					return;
				}
	  		}
			yield put({type: 'changeShouldLogin'});
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
					dispatch({type: 'login'});
				}
			});
		}
		
	}
  
}
