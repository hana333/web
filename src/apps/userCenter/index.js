import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';

const app = dva({
//	history: browserHistory
});

app.model(require('./models/userCenter'));

app.router(require('./router'));

app.start('#root');