const userCenterUrl = 'http://127.0.0.1/user-center';
const resourceUrl = 'http://127.0.0.1/resource';
const blogUrl = 'http://127.0.0.1/resource';
const eduUrl = 'http://127.0.0.1/edu';

function autoUrl(pre, api) {
	return pre + api;
}

export default {
	
	userCenterUrl: userCenterUrl,
	
	resourceUrl: resourceUrl,
	
	blogUrl: blogUrl,
	
	eduUrl: eduUrl,
	
	userCenter(api) {
		return autoUrl(userCenterUrl, api);
	},
	
	resource(api) {
		return autoUrl(userCenterUrl, api);
	},
	
	blog(api) {
		return autoUrl(userCenterUrl, api);
	},
	
	edu(api) {
		return autoUrl(userCenterUrl, api);
	}
	
}
