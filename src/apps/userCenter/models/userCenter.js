import Toast from '../../../components/Toast';
import key from '../../../utils/keymaster';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {getLoginSession, removeLoginSession} from '../../../utils/web';

const currentPath = '/';

const defaultState = {
	globalLoading: true,
	tab: '用户管理'
	
};

export default {

	namespace: 'userCenter',
	
	state: {...defaultState},
	
	reducers: {
		
		changeGlobalLoading(state) {
			return {...state, ...{globalLoading: !state.globalLoading}};
		},
		
		changeTab(state, {payload}) {
			return {...state, ...{tab: payload}};
		},
		
		resetState() {
			return {...defaultState};
		}

	},
	
	effects: {
		
		*init(action, {put}) {
			let loginSession = yield getLoginSession();
			console.log(loginSession)
			if(loginSession) {
				yield new Promise((resolve) => {setTimeout(resolve, 1000)});
				yield put({type: 'changeGlobalLoading'});
			} else {
				yield put(routerRedux.push('/login'));
			}
		},
		
		*exit(action, {put}) {
			yield removeLoginSession();
			yield put(routerRedux.push('/login'));
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}) {
			history.listen(({ pathname }) => {
		        if (pathname === currentPath) {
		        	dispatch({type: 'resetState'});
		        	dispatch({type: 'init'});
		        }
			});
		}
		
	}

}