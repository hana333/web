import dva from 'dva';
import {useRouterHistory} from 'dva/router';
import {createHashHistory} from 'history';

let app = {};

function init({
	history = useRouterHistory(createHashHistory)({queryKey: false}), 
	initialState = {},
	plugins = [],
	models = [],
	router,
	start}) {
	// 初始化应用
	app = dva({
		history: history,
		initialState: initialState
	});
	// 初始化插件
	for(let i = 0; i < plugins.length; i ++) {
		app.use(plugins[i]);
	}
	// 初始化模型
	for(let i = 0; i < models.length; i ++) {
		app.model(models[i]);
	}
	// 初始化路由
	app.router(router);
	// 启动
	app.start(start);
	return app;
}

function getStore() {
	let store;
	if(app) store = app._store;
	return store;
}

function getState() {
	let currentState;
	let store = getStore();
	if(store) currentState = store.getState();
	return currentState;
}

function dispatch(...args) {
	let store = getStore();
	if(store) {
		store.dispatch(...args);
	}
}

export default {
	init,
	getStore,
	getState,
	dispatch
};