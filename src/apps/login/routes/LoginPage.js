import { Row, Col, Icon, Input, Button, Checkbox } from 'antd';
import { connect, getState } from 'dva';
import { Link } from 'dva/router';
import style from './css/LoginPage.css';

function LoginPage({state, dispatch}) {
	return(
		<Row className='login-container'>
			<Col 
			className={style.container} 
			xs={{span: 24}}
			sm={{span: 12, offset: 6}}
			md={{span: 10, offset: 7}}
			lg={{span: 8, offset: 8}} 
			xl={{span: 6, offset: 9}}>
				<Row className={style.head}>
					用户登录
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					value={state.account}
					onChange={(e) => {
						dispatch({
							type: 'login/accountChange',
							payload: e.target.value
						});
					}} 
					prefix={<Icon type='user' style={{ fontSize: 13 }}/>} 
					size='large'
					type='text' 
					placeholder='用户名/邮箱' 
					autoFocus />
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<Icon type='lock' style={{ fontSize: 13 }}/>} 
					value={state.password}
					onChange={(e) => {
						dispatch({
							type: 'login/passwordChange',
							payload: e.target.value
						});
					}} 
					size='large'
					type='password' 
					placeholder='密码' />
				</Row>
				<Row className={style.lineSpaceSmall}>
					<Checkbox 
					checked={state.keepLogin} 
					onChange={(e) => {
						dispatch({
							type: 'login/keepLoginChange',
							payload: e.target.checked
						});
					}}>
						保持登录
					</Checkbox>
					<Link className={style.forgetPassword} to='/forgetPassword'>
						忘记密码
					</Link>
				</Row>
				<Row className={style.lineSpaceSmall}>
					<Button 
					className={style.loginButton} 
					type='primary' 
					size='large'
					onClick={() => {
						dispatch({
							type: 'login/login'
						});
					}}>
						登录
					</Button>
				</Row>
				<Row>
					或者&nbsp;
					<Link to='/register'>
						立即注册
					</Link>
				</Row>
				<Row className={style.footer}>
					浙ICP备17032658号&nbsp;版权所属&nbsp;
					<a href='javascript:void(0);'>减一科技</a>
				</Row>
			</Col>
		</Row>
	);
}

export default connect((state) => ({
	state: state.login
}))(LoginPage);