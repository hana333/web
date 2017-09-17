import React from 'react';
import { Row, Col, Icon, Input, Button, Progress } from 'antd';
import { connect } from 'dva';
import style from './css/RegisterPage.css';

const Step1 = React.createClass({
	
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		return (
			<div className='step1'>
				<Row className={style.lineSpaceSmall}>
					<h1>请输入你的邮箱</h1>
				</Row>
				<Row className={style.lineSpace}>
					<span className={style.hint}>
						注册即代表阅读并同意我们的
			    		<a href="javascript:void(0);">
			    			使用条款
			    		</a>
			    		和
			    		<a href="javascript:void(0);">
			    			隐私政策
			    		</a>
		    		</span>
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<span className={style.preHint}>邮箱</span>} 
					value={state.email}
					onChange={(e) => {
						dispatch({
							type: 'register/emailChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='text' 
					placeholder='例如: xxxxx@xxx.xxx'
					autoFocus />
				</Row>
				<Row>
					<Button size='large' onClick={() => {
						dispatch({
							type: 'register/stepNext'
						});
					}}>
						下一步
					</Button>
				</Row>
			</div>
		);
	}
	
});

const Step2 = React.createClass({
	
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		return (
			<div className='step2'>
				<Row className={style.lineSpaceSmall}>
					<h1>输入验证码</h1>
				</Row>
				<Row className={style.lineSpace}>
					<span className={style.hint}>
						请输入你邮箱中收到的验证码
		    		</span>
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<span className={style.preHint}>验证码</span>} 
					value={state.random}
					onChange={(e) => {
						dispatch({
							type: 'register/randomChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='text' 
					placeholder='此处输入验证码' 
					autoFocus />
				</Row>
				<Row>
					<Button size='large' onClick={() => {
						dispatch({
							type: 'register/stepNext'
						});
					}}>
						下一步
					</Button>
				</Row>
			</div>
		);
	}
	
});

const Step3 = React.createClass({
	
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		return (
			<div className='step3'>
				<Row className={style.lineSpaceSmall}>
					<h1>完善信息</h1>
				</Row>
				<Row className={style.lineSpace}>
					<span className={style.hint}>
						最后一步,请完善你的个人信息！
		    		</span>
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<span className={style.preHint}>用户名</span>} 
					value={state.username}
					onChange={(e) => {
						dispatch({
							type: 'register/usernameChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='text' 
					placeholder='请输入你的用户名' 
					autoFocus />
					<Input 
					prefix={<span className={style.preHint}>密码</span>} 
					value={state.password}
					onChange={(e) => {
						dispatch({
							type: 'register/passwordChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='password' 
					placeholder='请输入你的密码' />
					<Input 
					prefix={<span className={style.preHint}>确认密码</span>} 
					value={state.passwordComfirm}
					onChange={(e) => {
						dispatch({
							type: 'register/passwordComfirmChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='password' 
					placeholder='请确认你的密码' />
				</Row>
				<Row>
					<Button type='primary'  size='large' onClick={() => {
						dispatch({
							type: 'register/stepNext'
						});
					}}>
						完成
					</Button>
				</Row>
			</div>
		);
	}
	
});

function RegisterPage({state, dispatch}) {
	let percent = state.step / 3 * 100;
	let stepRectNode;
	switch (state.step){
		case 1:
			stepRectNode = <Step1 state={state} dispatch={dispatch} />;
			break;
		case 2:
			stepRectNode = <Step2 state={state} dispatch={dispatch} />;
			break;
		case 3:
			stepRectNode = <Step3 state={state} dispatch={dispatch} />;
			break;
	}
	return(
		<Row className='register-container'>
			<Col>
				<Progress percent={percent} showInfo={false} strokeWidth ={5} />
			</Col>
			<Col 
			className={style.container}
			xs={{span: 24}}
			sm={{span: 14, offset: 5}}
			md={{span: 12, offset: 6}}
			lg={{span: 10, offset: 7}}
			xl={{span: 8, offset: 8}}>
				{stepRectNode}
			</Col>
		</Row>
	);
}

export default connect((state) => ({
	state: state.register
}))(RegisterPage);