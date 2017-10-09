import React from 'react';
import {Checkbox} from 'antd';

class SelectList extends React.Component {
	
	render() {
		return (
			<div className='select-list-container'>
				<div>
					<div><Checkbox value='你好' onChange={this.props.onChange}>你好</Checkbox></div>
					<div><Checkbox value='你好' onChange={this.props.onChange}>你好</Checkbox></div>
					<div><Checkbox value='你好' onChange={this.props.onChange}>你好</Checkbox></div>
				</div>
			</div>
		);
	}
}

export default SelectList;
