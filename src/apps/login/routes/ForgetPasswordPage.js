import React from 'react';
import {Row, Col, Icon, Input, Button, Progress} from 'antd';
import {connect} from 'dva';
import style from './css/ForgetPasswordPage.css';

const Step1 = React.createClass({
	
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		return (
			<div className='step1'>
				<Row className={style.lineSpaceSmall}>
					<h1>通过邮箱找回密码</h1>
				</Row>
				<Row className={style.lineSpace}>
					<span className={style.hint}>
						必须使用注册时使用的邮箱作为验证
		    		</span>
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<span className={style.preHint}>邮箱</span>} 
					value={state.email} 
					onKeyUp={(e) => {
						if(e.keyCode === 13) {
							dispatch({
								type: 'forgetPassword/stepNext'
							});
						}
					}} 
					onChange={(e) => {
						dispatch({
							type: 'forgetPassword/emailChange',
							payload: e.target.value
						});
					}}
					size='large'
					type='text' 
					placeholder='请输入注册时使用的邮箱' 
					autoFocus />
				</Row>
				<Row>
					<Button size='large' loading={state.loading} onClick={() => {
						dispatch({
							type: 'forgetPassword/stepNext'
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
							type: 'forgetPassword/randomChange',
							payload: e.target.value
						});
					}} 
					onKeyUp={(e) => {
						if(e.keyCode === 13) {
							dispatch({
								type: 'forgetPassword/stepNext'
							});
						}
					}} 
					size='large'
					type='text' 
					placeholder='此处输入验证码' 
					autoFocus />
				</Row>
				<Row>
					<Button size='large' loading={state.loading} onClick={() => {
						dispatch({
							type: 'forgetPassword/stepNext'
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
					<h1>重置密码</h1>
				</Row>
				<Row className={style.lineSpace}>
					<span className={style.hint}>
						最后一步,开启新的密码吧!
		    		</span>
				</Row>
				<Row className={style.lineSpace}>
					<Input 
					prefix={<span className={style.preHint}>密码</span>} 
					value={state.password}
					onChange={(e) => {
						dispatch({
							type: 'forgetPassword/passwordChange',
							payload: e.target.value
						});
					}} 
					onKeyUp={(e) => {
						if(e.keyCode === 13) {
							dispatch({
								type: 'forgetPassword/stepNext'
							});
						}
					}} 
					size='large'
					type='password' 
					placeholder='请输入新密码' 
					autoFocus />
				</Row>
				<Row>
					<Button type='primary' size='large' loading={state.loading} onClick={() => {
						dispatch({
							type: 'forgetPassword/stepNext'
						});
					}}>
						重置
					</Button>
				</Row>
			</div>
		);
	}
	
});

function ForgetPasswordPage({state, dispatch}) {
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
		<Row className='forgetPassword-container'>
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
	state: {
		...state.forgetPassword,
		loading: state.loading.models.forgetPassword
	}
}))(ForgetPasswordPage);