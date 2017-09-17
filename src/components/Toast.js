import React from 'react';
import ReactDOM from 'react-dom';
import { clientHeight } from '../utils/utils';
import style from './css/Toast.css';

const Toast = React.createClass({
	getInitialState: function() {
	    return {
	    	render: true,
	    	active: false
	    };
	},
	render() {
		if(this.state.render) {
			let active = style.content;
			if(this.state.active) {
				active = style.content + ' ' + style.contentActive;
			} else {
				active = style.content;
			}
			return (
				<div className={style.container}>
					<span ref='content' className={active}>{this.props.msg}</span>
				</div>
			);
		} else {
			return null;
		}
	},
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			})
			setTimeout(() => {
				this.setState({
					active: false
				})
				setTimeout(() => {
					this.setState({
						render: false
					})
				}, 300);
			}, this.props.duration - 310);
		}, 10);
	}
});

Toast.show = function(msg, duration = 2300) {
	let tempDiv = document.createElement('div');
	document.body.appendChild(tempDiv);
	ReactDOM.render(
		<Toast msg={msg} duration={duration} />,
		tempDiv);
	setTimeout(() => {
		tempDiv.remove();
	}, duration);
}

export default Toast;
