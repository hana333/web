import dva from 'dva';
//import createLoading from 'dva-loading';
import './index.css';

const app = dva({
	initialState: {
		login: {
			loginRedirect: '/'
		}
	}
});

//app.use(createLoading());

app.model(require('../login/models/login'));
app.model(require('../login/models/register'));
app.model(require('../login/models/forgetPassword'));
app.model(require('./models/userCenter'));

app.router(require('./router'));

app.start('#root');