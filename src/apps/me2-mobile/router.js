import {Router, Route} from 'dva/router';
import PersonReportPage from './routes/PersonReportPage';

function RouterConfig({history}) {
	return(
		<Router history={history}>
			<Route path="/personReport" component={PersonReportPage} />
		</Router>
	);
}

export default RouterConfig;