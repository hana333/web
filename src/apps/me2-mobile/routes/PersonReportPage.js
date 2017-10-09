import React from 'react';
import {connect} from 'dva';
import {Icon, List} from 'antd-mobile';

import style from './css/PersonReportPage.css';

function PersonReportPage({state, dispatch}) {
	return(
		<div className='person-report-container'>
			<div className={style.headScan}>
				
			</div>
			<div className={style.list}>
				<List>
					<List.Item arrow='horizontal'>
						我的速度
					</List.Item>
					<List.Item arrow='horizontal'>
						我的水平
					</List.Item>
					<List.Item arrow='horizontal'>
						我的正确
					</List.Item>
					<List.Item arrow='horizontal'>
						综合报告
					</List.Item>
				</List>
			</div>
			<div>
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