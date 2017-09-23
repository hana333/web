import Toast from '../../../components/Toast';
import {trim} from '../../../utils/utils';
import {routerRedux} from 'dva/router';
import {setLoginSession} from '../../../plugins/loginSession';
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
			const loginState = yield select(state => state.login);
			let loginRedirect = loginState.loginRedirect; 
			let {account, password, keepLogin} = loginState;
			let expire = keepLogin ? -1 : 1800;
			if(!account || !(trim(account))) {
	  			yield Toast.show('账号不能为空');
	  		} else if(!password || !(trim(password))) {
				yield Toast.show('密码不能为空');
	  		} else {
	  			let res = yield loginMix(account, password, expire);
				if(res && res.res === 1) {
					setLoginSession(res.data);
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
		}
		
	}
  
}
