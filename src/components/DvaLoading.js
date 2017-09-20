import React from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
import style from './css/DvaLoading.css';

const DvaLoading = React.createClass({
	render() {
		let state = this.props.state;
		return (
			<Spin size='large' spinning={state.global}>{this.props.children}</Spin>
		);
	}
});

export default connect((state) => ({
	state: state.loading
}))(DvaLoading);
