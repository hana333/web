const userCenterUrl = 'http://127.0.0.1/user-center';
const resourceUrl = 'http://127.0.0.1/resource';
const blogUrl = 'http://127.0.0.1/resource';
const eduUrl = 'http://127.0.0.1/edu';

//const userCenterUrl = 'http://www.j1kj.cn/user-center';
//const resourceUrl = 'http://www.j1kj.cn/resource';
//const blogUrl = 'http://www.j1kj.cn/resource';
//const eduUrl = 'http://www.j1kj.cn/edu';

function autoUrl(pre, api) {
	return pre + api;
}

function userCenter(api) {
	return autoUrl(userCenterUrl, api);
}

function resource(api) {
	return autoUrl(userCenterUrl, api);
}

function blog(api) {
	return autoUrl(userCenterUrl, api);
}

function edu(api) {
	return autoUrl(userCenterUrl, api);
}

export default {
	userCenter: userCenter,
	resource: resource,
	blog: blog,
	edu: edu
}


