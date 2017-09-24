import Toast from '../../../components/Toast';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {clone, merge} from '../../../utils/utils';
import {getLoginSession, removeLoginSession} from '../../../plugins/loginSession';
import {pageUser, pageRole, pagePermission, pageGroup} from '../services/systemService';

const currentPath = '/';

const defaultState = {
	username: '',
	userData: [],
	roleData: [],
	permissionData: [],
	groupData: [],
	modalVisible: false,
	modalTitle: '',
	modalInputItems: [],
	modules: {
		user: {
			title: '用户管理',
			active: true,
			items: [
				{key: 'userId', value: '序号'},
				{key: 'username', value: '用户名'}, 
				{key: 'password', value: '密码'},
				{key: 'email', value: '邮箱'}, 
				{key: 'mobilePhone', value: '手机'},
				{key: 'createTime', value: '创建时间'}
			],
			data: []
		},
		role: {
			title: '角色管理',
			active: false,
			items: [
				{key: 'roleId', value: '序号'},
				{key: 'role', value: '角色'}, 
				{key: 'description', value: '描述'}
			],
			data: []
		},
		permission: {
			title: '权限管理',
			active: false,
			items: [
				{key: 'permissionId', value: '序号'},
				{key: 'permission', value: '权限'}, 
				{key: 'description', value: '描述'}
			],
			data: []
		},
		group: {
			title: '组管理',
			active: false,
			items: [
				{key: 'groupId', value: '序号'},
				{key: 'group', value: '组'}, 
				{key: 'description', value: '描述'},
				{key: 'type', value: '类型'}
			],
			data: []
		}
	}
};

export default {

	namespace: 'userCenter',
	
	state: {...defaultState},
	
	reducers: {
		
		initComplete(state, {payload}) {
			return merge(state, {username: payload.username});
		},
		
		changeUserData(state, {payload}) {
			return merge(state, {modules: {user: {data: payload}}});
		},
		
		changeRoleData(state, {payload}) {
			return merge(state, {modules: {role: {data: payload}}});
		},
		
		changePermissionData(state, {payload}) {
			return merge(state, {modules: {permission: {data: payload}}});
		},
		
		changeGroupData(state, {payload}) {
			return merge(state, {modules: {group: {data: payload}}});
		},
		
		changeTabComplete(state, {payload}) {
			let stateClone = clone(state);
			let modules = stateClone.modules;
			for(let k in modules) {
				if(modules[k].title === payload) {
					modules[k].active = true;
				} else {
					modules[k].active = false;
				}
			}
			return stateClone;
		},
		
		changeModal(state, {payload: {modalVisible, modalTitle}}) {
			return merge(state, {
				modalVisible: modalVisible, 
				modalTitle: modalTitle
			});
		},
		
		resetState() {
			return merge(defaultState);
		}

	},
	
	effects: {
		
		*init(action, {select, put}) {
			let userCenterState = yield select(state => state.userCenter);
			let loginSession = yield getLoginSession();
			if(loginSession) {
				yield put({
					type: 'initComplete', 
					payload: {username: loginSession.username}
				});
				yield put({type: 'changeTab', payload: userCenterState.modules.user.title});
			} else {
				yield put(routerRedux.push('/login'));
				yield Toast.show('请先登录');
			}
		},
		
		*exit(action, {put}) {
			yield removeLoginSession();
			yield put(routerRedux.push('/login'));
		},
		
		*changeTab({payload}, {select, put}) {
			yield put({type: 'changeTabComplete', payload: payload});
			let userCenterState = yield select(state => state.userCenter);
			switch (payload){
				case userCenterState.modules.user.title:
					yield put({type: 'user'});
					break;
				case userCenterState.modules.role.title:
					yield put({type: 'role'});
					break;
				case userCenterState.modules.permission.title:
					yield put({type: 'permission'});
					break;
				case userCenterState.modules.group.title:
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
		},
		
		*addUser() {
			
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