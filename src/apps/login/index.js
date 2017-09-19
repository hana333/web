import dva from 'dva';
//import {browserHistory} from 'dva/router';
import './index.css';

const app = dva({
//	history: browserHistory
});

app.model(require('./models/login'));
app.model(require('./models/register'));
app.model(require('./models/forgetPassword'));

app.router(require('./router'));

app.start('#root');