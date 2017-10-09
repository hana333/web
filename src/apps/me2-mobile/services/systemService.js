import request from '../../../utils/request';
import {userCenter} from '../../../config/config';

function pageUser(pageNum = 1, pageSize = 10, searchId) {
    return request(userCenter('/api/system/pageUser'), {
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            searchId: searchId
        }
    });
}

function pageRole(pageNum = 1, pageSize = 10, searchId) {
    return request(userCenter('/api/system/pageRole'), {
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            searchId: searchId
        }
    });
}

function pagePermission(pageNum = 1, pageSize = 10, searchId) {
    return request(userCenter('/api/system/pagePermission'), {
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            searchId: searchId
        }
    });
}

function pageGroup(pageNum = 1, pageSize = 10, searchId) {
    return request(userCenter('/api/system/pageGroup'), {
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            searchId: searchId
        }
    });
}

function addUser(username, password, email, mobilePhone) {
	return request(userCenter('/api/system/addUser'), {
        data: {
            username: username,
            password: password,
            email: email,
            mobilePhone: mobilePhone
        }
    });
}

function addRole(role, description) {
	return request(userCenter('/api/system/addRole'), {
        data: {
        	role: role,
            description: description
        }
    });
}

function addPermission(permission, description) {
	return request(userCenter('/api/system/addPermission'), {
        data: {
        	permission: permission,
            description: description
        }
    });
}

function deleteRole(roleId) {
	return request(userCenter('/api/system/deleteRole'), {
        data: {
        	roleId: roleId
        }
    });
}

function deletePermission(permissionId) {
	return request(userCenter('/api/system/deletePermission'), {
        data: {
        	permissionId: permissionId
        }
    });
}

function deleteGroup(groupId) {
	return request(userCenter('/api/system/deleteGroup'), {
        data: {
        	groupId: groupId
        }
    });
}

function updateUser(userId, username, password, email, mobilePhone, status) {
	return request(userCenter('/api/system/updateUser'), {
        data: {
        	userId: userId,
            username: username,
            password: password,
            email: email,
            mobilePhone: mobilePhone,
            status: status
        }
    });
}

function updateRole(roleId, role, description) {
	return request(userCenter('/api/system/updateRole'), {
        data: {
        	roleId: roleId,
            role: role,
            description: description
        }
    });
}

function updatePermission(permissionId, permission, description) {
	return request(userCenter('/api/system/updatePermission'), {
        data: {
        	permissionId: permissionId,
            permission: permission,
            description: description
        }
    });
}

export default {
    pageGroup,
    pageUser,
    pageRole,
    pagePermission,
    addUser,
    addRole,
    addPermission,
    deleteRole,
	deletePermission,
	deleteGroup,
    updateUser,
    updateRole,
    updatePermission
};