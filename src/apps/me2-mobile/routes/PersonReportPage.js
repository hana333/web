import React from 'react';
import TweenOne from 'rc-tween-one';
import {connect} from 'dva';
import {List, Icon} from 'antd-mobile';

import style from './css/PersonReportPage.css';

class HeadScan extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
			toRight: true
		}
	}
	render() {
		let duration = 1800;
		let scanDir = style.scanBoxToLeft;
		let scanAni = {left: '-30%', duration: duration};
		if(this.state.toRight) {
			scanDir = style.scanBoxToRight;
			scanAni.left = '100%';
		}
		return (
			<div className={style.headScan}>
				<div className={style.headTitle}>
					作业报告扫描中．．．
				</div>
				<TweenOne className={scanDir} animation={scanAni} onChange={(e) => {
					if(e.target.style.left == '100%' || e.target.style.left == '-30%') {
						this.setState({
							toRight: !this.state.toRight
						});
					}
				}} />
			</div>
		);
	}
}

class HeadGood extends React.Component {
	render() {
		return (
			<div className={style.headGood}>
				<div className={style.headTitle}>
					作业情况正常
				</div>
			</div>
		);
	}
}

class HeadWarning extends React.Component {
	render() {
		return (
			<div className={style.headGood}>
				<div className={style.headTitle}>
					作业情况预警
				</div>
			</div>
		);
	}
}

class HeadBad extends React.Component {
	render() {
		return (
			<div className={style.headBad}>
				<div className={style.headTitle}>
					作业情况异常
				</div>
			</div>
		);
	}
}

function PersonReportPage({state, dispatch}) {
	let avgCompTime = state.avgCompTime;
	let avgCorr = state.avgCorr;
	let timeDis = state.timeDis;
	let corrDis = state.corrDis;
	let outDeadLine = state.outDeadLine;
	let avgQuestionCorr = state.avgQuestionCorr;
	// 加载动画
	let load = <span className={style.exValue}><Icon type='loading' size='lg' /></span>;
	// 节点构建
	let avgCompTimeNode = avgCompTime ? <span className={style.exValue}>{avgCompTime}</span> : load;
	let avgCorrNode = avgCorr ? <span className={style.exValue}>{avgCorr}</span> : load;
	let timeDisNode = timeDis ? <span className={style.exValue}>{timeDis}</span> : load;
	let corrDisNode = corrDis ? <span className={style.exValue}>{corrDis}</span> : load;
	let outDeadLineNode = outDeadLine ? <span className={style.exValue}>{outDeadLine}</span> : load;
	let avgQuestionCorrNode = avgQuestionCorr ? <span className={style.exValue}>{avgQuestionCorr}</span> : load;
	// 顶部组件
	let head;
	switch (state.state){
		case 1:
			head = <HeadScan />;
			break;
		case 2:
			head = <HeadGood />;
			break;
		case 3:
			head = <HeadWarning />;
			break;
		case 4:
			head = <HeadBad />;
			break;
	}
	// 返回渲染
	return(
		<div className='person-report-container'>
			{head}
			<div className={style.list}>
				<List>
					<List.Item>
						平均完成时间异常
						{avgCompTimeNode}
					</List.Item>
					<List.Item>
						平均正确率异常
						{avgCorrNode}
					</List.Item>
					<List.Item>
						完成时间分布异常
						{timeDisNode}
					</List.Item>
					<List.Item>
						正确率分布异常
						{corrDisNode}
					</List.Item>
					<List.Item>
						逾期未交人数异常
						{outDeadLineNode}
					</List.Item>
					<List.Item>
						题目平均正确率异常
						{avgQuestionCorrNode}
					</List.Item>
				</List>
			</div>
		</div>
	);
}

export default connect((state) => ({
	state: {
		...state.personReport,
		loading: state.loading.models.personReport
	}
}))(PersonReportPage);