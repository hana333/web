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

function updateUser(username, password, email, mobilePhone, status) {
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

export default {
    pageGroup,
    pageUser,
    pageRole,
    pagePermission,
    addUser, 
    updateUser
};