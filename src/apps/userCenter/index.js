import dva from 'dva';
import './index.css';

const app = dva();

app.model(require('../login/models/login'));
app.model(require('../login/models/register'));
app.model(require('../login/models/forgetPassword'));
app.model(require('./models/userCenter'));

app.router(require('./router'));

app.start('#root');