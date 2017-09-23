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

export default {
    pageGroup,
    pageUser,
    pageRole,
    pagePermission
};