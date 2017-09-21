import Toast from '../../../components/Toast';
import key from '../../../utils/keymaster';
import {trim} from '../../../utils/utils';
import {routerRedux} from 'dva/router';
import {setLoginSession} from '../../../utils/web';
import {loginMix} from '../services/loginService';

const currentPath = '/login';

const defaultState = {
  	account: '',
  	password: '',
  	keepLogin: true
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
		
		resetState(state) {
			return {...state, ...defaultState};
		}
  	
	},
	
	effects: {
		
		*login({payload}, {select, put}) {
			const loginState = yield select(state => ({
				...state.login,
				loading: state.loading.models.login
			}));
			console.log(loginState.loading)
			if(loginState.loading) {
				return;
			}
			let loginRedirect = loginState.loginRedirect; 
			let {account, password, keepLogin} = loginState;
			let expire = keepLogin ? -1 : 1800;
			if(!account || !(trim(account))) {
	  			yield Toast.show('账号不能为空');
	  		} else if(!password || !(trim(password))) {
				yield Toast.show('密码不能为空');
	  		} else {
	  			let res = yield loginMix(account, password, expire);
				if(res.res === 1) {
					yield setLoginSession(res.data, res.data.loginCycle * 1000);// 置入loginSession
					if(loginRedirect) yield put(routerRedux.push(loginRedirect));
					return;
				}
	  		}
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}, done) {
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
					dispatch({type: 'login'});
				}
			});
		}
		
	}
  
}
