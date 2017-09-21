import dva from 'dva';
import {useRouterHistory} from 'dva/router';
import {createHashHistory} from 'history';
import createLoading from 'dva-loading';
import './index.css';

const app = dva({
	history: useRouterHistory(createHashHistory)({queryKey: false}),// 去除hashHistory下的 _k 查询参数
	initialState: {
		login: {
			loginRedirect: '/'
		}
	}
});

app.use(createLoading());

app.model(require('../login/models/login'));
app.model(require('../login/models/register'));
app.model(require('../login/models/forgetPassword'));
app.model(require('./models/userCenter'));

app.router(require('./router'));

app.start('#root');

