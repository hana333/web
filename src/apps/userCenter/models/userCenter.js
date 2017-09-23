import Toast from '../../../components/Toast';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {getLoginSession, removeLoginSession} from '../../../plugins/loginSession';
import {pageUser, pageRole, pagePermission, pageGroup} from '../services/systemService';

const USER = '用户管理';
const ROLE = '角色管理';
const PERMISSION = '权限管理';
const GROUP = '组管理';

const currentPath = '/';

const defaultState = {
	tab: '用户管理',
	username: '',
	userData: [],
	roleData: [],
	permissionData: [],
	groupData: []
};

export default {

	namespace: 'userCenter',
	
	state: {...defaultState},
	
	reducers: {
		
		initComplete(state, {payload}) {
			return {...state, ...{username: payload.username}};
		},
		
		changeUserData(state, {payload}) {
			return {...state, ...{userData: payload}};
		},
		
		changeRoleData(state, {payload}) {
			return {...state, ...{roleData: payload}};
		},
		
		changePermissionData(state, {payload}) {
			return {...state, ...{permissionData: payload}};
		},
		
		changeGroupData(state, {payload}) {
			return {...state, ...{groupData: payload}};
		},
		
		changeTabComplete(state, {payload}) {
			return {...state, ...{tab: payload}};
		},
		
		resetState() {
			return {...defaultState};
		}

	},
	
	effects: {
		
		*init(action, {select, put}) {
			let userCenterState = yield select(state => state.userCenter);
			let loginSession = yield getLoginSession();
			if(loginSession) {
				yield put({
					type: 'initComplete', 
					payload: {
						username: loginSession.username
					}
				});
				yield put({type: 'changeTab', payload: userCenterState.tab});
			} else {
				yield put(routerRedux.push('/login'));
				yield Toast.show('请先登录');
			}
		},
		
		*exit(action, {put}) {
			yield removeLoginSession();
			yield put(routerRedux.push('/login'));
		},
		
		*changeTab({payload}, {put}) {
			yield put({type: 'changeTabComplete', payload: payload});
			switch (payload){
				case USER:
					yield put({type: 'user'});
					break;
				case ROLE:
					yield put({type: 'role'});
					break;
				case PERMISSION:
					yield put({type: 'permission'});
					break;
				case GROUP:
					yield put({type: 'group'});
					break;
			}
		},
		
		*user(action, {put}) {
			let res = yield pageUser();
			if(res && res.res === 1) {
				let userData = res.data.list || [];
				for(let i = 0; i < userData.length; i ++) {
					userData[i].key = userData[i].userId;
				}
				yield put({type: 'changeUserData', payload: userData});
			} else {
				yield Toast.show(res.msg);
			}
		},
		
		*role(action, {put}) {
			let res = yield pageRole();
			
			if(res && res.res === 1) {
				let roleData = res.data.list || [];
				for(let i = 0; i < roleData.length; i ++) {
					roleData[i].key = roleData[i].roleId;
				}
				console.log(roleData)
				yield put({type: 'changeRoleData', payload: roleData});
			} else {
				yield Toast.show(res.msg);
			}
		},
		
		*permission(action, {put}) {
			let res = yield pagePermission();
			if(res && res.res === 1) {
				let permissionData = res.data.list || [];
				for(let i = 0; i < permissionData.length; i ++) {
					permissionData[i].key = permissionData[i].permissionId;
				}
				yield put({type: 'changePermissionData', payload: permissionData});
			} else {
				yield Toast.show(res.msg);
			}
		},
		
		*group(action, {put}) {
			let res = yield pageGroup();
			if(res && res.res === 1) {
				let groupData = res.data.list || [];
				for(let i = 0; i < groupData.length; i ++) {
					groupData[i].key = groupData[i].groupId;
				}
				yield put({type: 'changeGroupData', payload: groupData});
			} else {
				yield Toast.show(res.msg);
			}
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