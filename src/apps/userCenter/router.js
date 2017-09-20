import { Router, Route, IndexRoute } from 'dva/router';
import DvaLoading from '../../components/DvaLoading';
import LoginPage from '../login/routes/LoginPage';
import RegisterPage from '../login/routes/RegisterPage';
import ForgetPasswordPage from '../login/routes/ForgetPasswordPage';
import UserCenterPage from './routes/UserCenterPage';

function RouterConfig({history}) {
	return(
		<Router history={history}>
			<Route path="/" component={DvaLoading}> 
				<IndexRoute component={UserCenterPage} />
				<Route path="login" component={LoginPage} />
				<Route path="register" component={RegisterPage} />
				<Route path="forgetPassword" component={ForgetPasswordPage} />
			</Route>
		</Router>
	);
}

export default RouterConfig;