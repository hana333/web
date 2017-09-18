import React from 'react';
import {Row, Col, Icon, Input, Button, Progress} from 'antd';
import {connect} from 'dva';
import style from './css/RegisterPage.css';

function UserCenterPage({state, dispatch}) {
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
	state: state.userCenter
}))(UserCenterPage);