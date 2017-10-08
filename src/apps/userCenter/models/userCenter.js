import Toast from '../../../components/Toast';
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import {clone, merge} from '../../../utils/utils';
import {getLoginSession, removeLoginSession} from '../../../plugins/loginSession';
import {
	pageUser, 
	pageRole, 
	pagePermission, 
	pageGroup,
	addUser,
	addRole,
	addPermission,
	deleteRole,
	deletePermission,
	deleteGroup,
	updateUser,
	updateRole,
    updatePermission
} from '../services/systemService';

// 前缀_模块
const MODULE_USER = '用户管理';
const MODULE_ROLE = '角色管理';
const MODULE_PERMISSION = '权限管理';
const MODULE_GROUP = '组管理';

// 前缀_模块_操作
const OP_USER_ADD = 'OP_USER_ADD';
const OP_USER_UPDATE = 'OP_USER_UPDATE';
const OP_USER_OWNER_ROLE = 'OP_USER_OWNER_ROLE';
const OP_USER_CANCEL_ROLE = 'OP_USER_CANCEL_ROLE';
const OP_USER_ADD_ROLE = 'OP_USER_ADD_ROLE';

const OP_ROLE_ADD = 'OP_ROLE_ADD';
const OP_ROLE_UPDATE = 'OP_ROLE_UPDATE';
const OP_ROLE_DELETE = 'OP_ROLE_DELETE';
const OP_ROLE_OWNER_PERMISSION = 'OP_ROLE_OWNER_PERMISSION';
const OP_ROLE_CANCEL_PERMISSION = 'OP_ROLE_CANCEL_PERMISSION';
const OP_ROLE_ADD_PERMISSION = 'OP_ROLE_ADD_PERMISSION';

const OP_PERMISSION_ADD = 'OP_PERMISSION_ADD';
const OP_PERMISSION_UPDATE = 'OP_PERMISSION_UPDATE';
const OP_PERMISSION_DELETE = 'OP_PERMISSION_DELETE';

const OP_GROUP_ADD = 'OP_GROUP_ADD';
const OP_GROUP_UPDATE = 'OP_GROUP_UPDATE';
const OP_GROUP_DELETE = 'OP_GROUP_DELETE';
const OP_GROUP_ADD_USER = 'OP_GROUP_ADD_USER';
const OP_GROUP_ADD_ROLE = 'OP_GROUP_ADD_ROLE';
const OP_GROUP_ADD_PERMISSION = 'OP_GROUP_ADD_PERMISSION';
const OP_GROUP_OWNER = 'OP_GROUP_OWNER';
const OP_GROUP_CANCEL = 'OP_GROUP_CANCEL';

const MODAL_TYPE_INPUT = 'MODAL_TYPE_INPUT';
const MODAL_TYPE_LIST = 'MODAL_TYPE_LIST';
const MODAL_TYPE_COMFIRM = 'MODAL_TYPE_COMFIRM';

function getOpName(op) {
	let name;
	switch (op) {
		case OP_USER_ADD:
			name = '添加用户';
			break;
		case OP_USER_UPDATE:
			name = '更新';
			break;
		case OP_USER_OWNER_ROLE:
			name = '拥有角色';
			break;
		case OP_USER_CANCEL_ROLE:
			name = '取消角色';
			break;
		case OP_USER_ADD_ROLE:
			name = '添加角色';
			break;
		case OP_ROLE_ADD:
			name = '添加角色';
			break;
		case OP_ROLE_UPDATE:
			name = '更新';
			break;
		case OP_ROLE_DELETE:
			name = '删除';
			break;
		case OP_ROLE_OWNER_PERMISSION:
			name = '拥有权限';
			break;
		case OP_ROLE_CANCEL_PERMISSION:
			name = '取消权限';
			break;
		case OP_ROLE_ADD_PERMISSION:
			name = '添加权限';
			break;
		case OP_PERMISSION_ADD:
			name = '添加权限';
			break;
		case OP_PERMISSION_UPDATE:
			name = '更新';
			break;
		case OP_PERMISSION_DELETE:
			name = '删除';
			break;
		case OP_GROUP_ADD:
			name = '添加组';
			break;
		case OP_GROUP_ADD_USER:
			name = '添加用户';
			break;
		case OP_GROUP_ADD_ROLE:
			name = '添加角色';
			break;
		case OP_GROUP_ADD_PERMISSION:
			name = '添加权限';
			break;
		case OP_GROUP_OWNER:
			name = '查看成员';
			break;
		case OP_GROUP_CANCEL:
			name = '取消成员';
			break;
	}
	return name;
}

const currentPath = '/';

const defaultModal = {
	visible: false,
	title: '',
	inputs: {},
	selecteds: [],
	currentRow: undefined,
	op: undefined,
	type: undefined
};

const defaultState = {
	username: '',
	userData: [],
	roleData: [],
	permissionData: [],
	groupData: [],
	modal: defaultModal,
	modules: {
		user: {
			title: MODULE_USER,
			active: true,
			items: [
				{key: 'userId', value: '序号', edit: false},
				{key: 'username', value: '用户名', edit: true}, 
				{key: 'password', value: '密码', edit: true},
				{key: 'email', value: '邮箱', edit: true}, 
				{key: 'mobilePhone', value: '手机', edit: true},
				{key: 'createTime', value: '创建时间', edit: false}
			],
			data: [],
			topOps: [
				OP_USER_ADD
			],
			ops: [
				OP_USER_UPDATE,
				OP_USER_OWNER_ROLE,
				OP_USER_ADD_ROLE
			]
		},
		role: {
			title: MODULE_ROLE,
			active: false,
			items: [
				{key: 'roleId', value: '序号', edit: false},
				{key: 'role', value: '角色', edit: true}, 
				{key: 'description', value: '描述', edit: true}
			],
			data: [],
			topOps: [
				OP_ROLE_ADD
			],
			ops: [
				OP_ROLE_UPDATE,
				OP_ROLE_DELETE,
				OP_ROLE_OWNER_PERMISSION,
				OP_ROLE_ADD_PERMISSION
			]
		},
		permission: {
			title: MODULE_PERMISSION,
			active: false,
			items: [
				{key: 'permissionId', value: '序号', edit: false},
				{key: 'permission', value: '权限', edit: true}, 
				{key: 'description', value: '描述', edit: true}
			],
			data: [],
			topOps: [
				OP_PERMISSION_ADD
			],
			ops: [
				OP_PERMISSION_UPDATE,
				OP_PERMISSION_DELETE
			]
		},
		group: {
			title: MODULE_GROUP,
			active: false,
			items: [
				{key: 'groupId', value: '序号', edit: false},
				{key: 'group', value: '组', edit: true}, 
				{key: 'description', value: '描述', edit: true},
				{key: 'type', value: '类型', edit: true}
			],
			data: [],
			topOps: [
				OP_GROUP_ADD
			],
			ops: [
				OP_GROUP_ADD_USER,
				OP_GROUP_ADD_ROLE,
				OP_GROUP_ADD_PERMISSION,
				OP_GROUP_OWNER
			]
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
		
		changeModalComplete(state, {payload: {modalVisible, modalOp, modalType, modalCurrentRow}}) {
			if(!modalVisible) {
				let stateClone = clone(state);
				stateClone.modal = defaultModal;
				return stateClone;
			} else {
				return merge(state, {
					modal: {
						visible: modalVisible,
						title: getOpName(modalOp),
						op: modalOp,
						type: modalType,
						currentRow: modalCurrentRow
					}
				});
			}
		},
		
		changeModalInputs(state, {payload: inputs}) {
			let modalTemp = {modal: {inputs}};
			return merge(state, modalTemp);
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
			let userCenterState = yield select(state => state.userCenter);
			if(payload === userCenterState.modules.group.title) return yield Toast.show('该功能尚未开放');
			yield put({type: 'changeTabComplete', payload: payload});
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
		
		*changeModal({payload: {modalVisible, modalOp, modalCurrentRow}}, {select, put}) {
			let modalType;
			switch (modalOp) {
				case OP_USER_ADD:
				case OP_ROLE_ADD:
				case OP_PERMISSION_ADD:
				case OP_GROUP_ADD:
					modalType = MODAL_TYPE_INPUT;
					break;
				case OP_USER_UPDATE:
				case OP_ROLE_UPDATE:
				case OP_PERMISSION_UPDATE:
				case OP_GROUP_UPDATE:
					modalType = MODAL_TYPE_INPUT;
					let modules = yield select(state => state.userCenter.modules);
					let inputsBuf = {};
					let inputs = {};
					for(let key in modalCurrentRow) {
						let value = modalCurrentRow[key];
						inputsBuf[key] = value;
					}
					for(let key in modules) {
						let module = modules[key];
						if(module.active) {
							let items = module.items;
							for(let i = 0; i < items.length; i ++) {
								let key = items[i].key;
								if(inputsBuf[key]) inputs[key] = inputsBuf[key];
							}
							break;
						}
					}
					yield put({type: 'changeModalInputs', payload: inputs});
					break;
				case OP_ROLE_DELETE:
				case OP_PERMISSION_DELETE:
				case OP_GROUP_DELETE:
				case OP_USER_CANCEL_ROLE:
				case OP_ROLE_CANCEL_PERMISSION:
				case OP_GROUP_CANCEL:
					modalType = MODAL_TYPE_COMFIRM;
					break;
				case OP_USER_OWNER_ROLE:
				case OP_ROLE_OWNER_PERMISSION:
				case OP_GROUP_OWNER:
				case OP_USER_ADD_ROLE:
				case OP_ROLE_ADD_PERMISSION:
				case OP_GROUP_ADD_USER:
				case OP_GROUP_ADD_ROLE:
				case OP_GROUP_ADD_PERMISSION:
					modalType = MODAL_TYPE_LIST;
					break;
			}
			yield put({type: 'changeModalComplete', payload: {modalVisible, modalOp, modalType, modalCurrentRow}});
			yield setTimeout(() => {
				if(modalVisible) {
					let firstInputDom = document.querySelector('.modal-container input');
					if(firstInputDom) firstInputDom.focus();
				}
			},300);
		},
		
		*modalOk(action, {select, put}) {
			let userCenterState = yield select(state => state.userCenter);
			let model = userCenterState.modal;
			let inputs = model && model.inputs;
			let currentRow = model && model.currentRow;
			let selecteds = model && model.selecteds;
			// user
			let username = inputs && inputs.username;
			let password = inputs && inputs.password;
			let email = inputs && inputs.email;
			let mobilePhone = inputs && inputs.mobilePhone;
			// role permission 
			let role = inputs && inputs.role;
			let permission = inputs && inputs.permission;
			let description = inputs && inputs.description;
			// currentRow
			let currentUserId = currentRow && currentRow.userId;
			let currentRoleId = currentRow && currentRow.roleId;
			let currentPermissionId = currentRow && currentRow.permissionId;
			let currentGroupId = currentRow && currentRow.groupId;
			// 结果
			let res;
			let reload;
			switch (model.op) {
				case OP_USER_ADD:
					if(!username && !email && !phone) return Toast.show('用户名、邮箱、手机不能全部为空');
					if(!password) return Toast.show('密码不能为空');
					res = yield addUser(username, password, email, mobilePhone);
					reload = 'user';
					break;
				case OP_ROLE_ADD:
					if(!role) return Toast.show('角色名称不能为空');
					res = yield addRole(role, description);
					reload = 'role';
					break;
				case OP_PERMISSION_ADD:
					if(!permission) return Toast.show('权限名称不能为空');
					res = yield addPermission(permission, description);
					reload = 'permission';
					break;
				case OP_GROUP_ADD:
					// 暂未开放
					// ...
					break;
				case OP_ROLE_DELETE:
					res = yield deleteRole(currentRoleId);
					reload = 'role';
					break;
				case OP_PERMISSION_DELETE:
					res = yield deletePermission(currentPermissionId);
					reload = 'permission';
					break;
				case OP_GROUP_DELETE:
					res = yield deleteGroup(currentGroupId);
					reload = 'group';
					break;
				case OP_USER_UPDATE:
					if(!username && !email && !phone && !password) return Toast.show('请填写要更新的内容');
					res = yield updateUser(currentRow.userId, username, password, email, mobilePhone);
					reload = 'user';
					break;
				case OP_ROLE_UPDATE:
					if(!role) return Toast.show('请填写要更新的角色名称');
					res = yield updateRole(currentRoleId, role, description);
					reload = 'role';
					break;
				case OP_PERMISSION_UPDATE:
					if(!permission) return Toast.show('请填写要更新的权限名称');
					res = yield updatePermission(currentPermissionId, permission, description);
					reload = 'permission';
					break;
				case OP_USER_OWNER_ROLE:
					
					
					break;
				case OP_USER_CANCEL_ROLE:
				
					break;
				case OP_USER_ADD_ROLE:
					
					
					break;
				
				
				case OP_ROLE_OWNER_PERMISSION:
				
					break;
				case OP_ROLE_CANCEL_PERMISSION:
				
					break;
				case OP_ROLE_ADD_PERMISSION:
				
					break;
				
				
				
				case OP_GROUP_ADD_USER:
				
					break;
				case OP_GROUP_ADD_ROLE:
				
					break;
				case OP_GROUP_ADD_PERMISSION:
				
					break;
				case OP_GROUP_OWNER:
				
					break;
				case OP_GROUP_CANCEL:
				
					break;
			}
			if(res) {
				yield put({type: reload});
				yield put({
					type: 'changeModal',
					payload: {modalVisible: false}
				});
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
		
	},
	
	MODULE_USER,
	MODULE_ROLE,
	MODULE_PERMISSION,
	MODULE_GROUP,
	
	OP_USER_ADD,
	OP_USER_UPDATE,
	OP_USER_OWNER_ROLE,
	OP_USER_CANCEL_ROLE,
	OP_USER_ADD_ROLE,
	
	OP_ROLE_ADD,
	OP_ROLE_UPDATE,
	OP_ROLE_DELETE,
	OP_ROLE_OWNER_PERMISSION,
	OP_ROLE_CANCEL_PERMISSION,
	OP_ROLE_ADD_PERMISSION,
	
	OP_PERMISSION_ADD,
	OP_PERMISSION_UPDATE,
	OP_PERMISSION_DELETE,
	
	OP_GROUP_ADD,
	OP_GROUP_UPDATE,
	OP_GROUP_DELETE,
	OP_GROUP_ADD_USER,
	OP_GROUP_ADD_ROLE,
	OP_GROUP_ADD_PERMISSION,
	OP_GROUP_OWNER,
	OP_GROUP_CANCEL,
	
	MODAL_TYPE_INPUT,
	MODAL_TYPE_LIST,
	MODAL_TYPE_COMFIRM,
	
	getOpName
	
}