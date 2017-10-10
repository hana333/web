import React from 'react';
import {connect} from 'dva';
import {Icon, List} from 'antd-mobile';

import style from './css/PersonReportPage.css';

class HeadScan extends React.Component {
	
	render() {
		return (
			<div className={style.headScan}>
				<div className={style.headTitle}>
					作业报告扫描中．．．
				</div>
				<div className={style.scanBoxToLeft}></div>
			</div>
		);
	}
	
}

function PersonReportPage({state, dispatch}) {
	return(
		<div className='person-report-container'>
			<HeadScan />
			<div className={style.list}>
				<List>
					<List.Item>
						平均完成时间异常
					</List.Item>
					<List.Item>
						平均正确率异常
					</List.Item>
					<List.Item>
						完成时间分布异常
					</List.Item>
					<List.Item>
						正确率分布异常
					</List.Item>
					<List.Item>
						逾期未交人数异常
					</List.Item>
					<List.Item>
						题目平均正确率异常
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