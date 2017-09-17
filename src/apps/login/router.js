import { Router, Route } from 'dva/router';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import ForgetPasswordPage from './routes/ForgetPasswordPage';

function RouterConfig({history}) {
	return(
		<Router history={history}>
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/forgetPassword" component={ForgetPasswordPage} />
		</Router>
	);
}

export default RouterConfig;