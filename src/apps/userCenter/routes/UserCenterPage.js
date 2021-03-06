import React from 'react';
import SelectList from '../../../components/SelectList';
import {Layout, Menu, Breadcrumb, Button, Spin, Table, Modal, Input} from 'antd';
import {connect} from 'dva';
import {uuid} from '../../../utils/code';
import {
	MODULE_USER,
	MODULE_ROLE,
	MODULE_PERMISSION,
	MODULE_GROUP,
	OP_USER_ADD,
	OP_USER_UPDATE,
	OP_USER_OWNER_ROLE,
	OP_USER_CANCEL_ROLE,
	OP_USER_ADD_ROLE,
	OP_ROLE_ADD,
	OP_ROLE_UPDATE,
	OP_ROLE_DELETE,
	OP_ROLE_OWNER_PERMISSION,
	OP_ROLE_CANCEL_PERMISSION,
	OP_ROLE_ADD_PERMISSION,
	OP_PERMISSION_ADD,
	OP_PERMISSION_UPDATE,
	OP_PERMISSION_DELETE,
	OP_GROUP_ADD,
	OP_GROUP_UPDATE,
	OP_GROUP_DELETE,
	OP_GROUP_ADD_USER,
	OP_GROUP_ADD_ROLE,
	OP_GROUP_ADD_PERMISSION,
	OP_GROUP_OWNER,
	OP_GROUP_CANCEL,
	MODAL_TYPE_INPUT,
	MODAL_TYPE_LIST,
	MODAL_TYPE_COMFIRM,
	getOpName
} from '../models/userCenter';
import style from './css/UserCenterPage.css';

const {Header, Content, Sider, Footer} = Layout;

function buildOpButton(op = [], dispatch, record) {
	return (
		<Button key={uuid()} className={style.opButton} onClick={() => {
			dispatch({
				type: 'userCenter/changeModal',
				payload: {
					modalVisible: true,
					modalOp: op,
					modalCurrentRow: record
				}
			});
		}}>
			{getOpName(op)}
		</Button>
	);
}

function buildReactOps(ops = [], dispatch, record) {
	let reactOps = [];
	for(let i = 0; i < ops.length; i ++) {
		reactOps.push(buildOpButton(ops[i], dispatch, record));
	}
	return (
		<span>
			{reactOps}
		</span>
	);
}

const ContentTable = React.createClass({
	render() {
		let dispatch = this.props.dispatch;
		let activeModule = this.props.activeModule;
		let data = activeModule.data;
		let items = activeModule.items;
		let columns = [];
		for(let i = 0; i < items.length; i ++) {
			let item = items[i];
			columns.push({
				dataIndex: item.key,
				title: item.value
			})
		} 
		columns.push({
			title: '操作',
		    render: (text, record) => buildReactOps(activeModule.ops, dispatch, record)
		});
		return (
			<Table 
		    columns={columns} 
		    dataSource={data} 
		    title={() => buildReactOps(activeModule.topOps, dispatch)} 
		    bordered />
		);
	}
});

const OpModal = React.createClass({
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		let activeModule = this.props.activeModule;
		let modal = state.modal;
		let visible = modal.visible;
		let title = modal.title;
		let content;
		switch(state.modal.type) {
			case MODAL_TYPE_INPUT: 
				let items = activeModule.items;
				content = [];
				for(let i = 0; i < items.length; i ++) {
					let item = items[i];
					let key = item.key;
					if(item.edit) {
						content.push(
							<Input 
							className={style.modalInput} 
							key={uuid()} 
							placeholder={item.value} 
							defaultValue={modal.inputs[key]} 
							onBlur={(e) => {
								dispatch({
									type: 'userCenter/changeModalInputs',
									payload: {[key]: e.target.value}
								});
							}} />
						);
					}
				}
				break;
			case MODAL_TYPE_LIST: 
				
				break;
			case MODAL_TYPE_COMFIRM: 
				content = <span className={style.modalComfirmText}>请确认{getOpName(modal.op)}么?</span>;
				break;
		}
		return (
			<Modal 
			className='modal-container' 
			closable={false} 
			visible={visible} 
			title={title} 
			onCancel={() => {
				dispatch({
					type: 'userCenter/changeModal',
					payload: {modalVisible: false}
				});
			}}
			onOk={() => {
				dispatch({
					type: 'userCenter/modalOk'
				});
			}}>
				{content}
			</Modal>
		);
	}
});

function UserCenterPage({state, dispatch}) {
	let username = state.username;
	let modules = state.modules;
	let menuItems = [];
	let contentTable;
	let opModal;
	let tab;
	for(let k in modules) {
		let title = modules[k].title;
		menuItems.push(<Menu.Item key={title}>{title}</Menu.Item>);
		if(modules[k].active) {
			tab = title;
			contentTable = <ContentTable activeModule={modules[k]} dispatch={dispatch} />;
			opModal = <OpModal state={state} activeModule={modules[k]} dispatch={dispatch} />
		}
	}
	return(
		<div className='user-center-container'>
			<Spin size='large' spinning={state.loading}>
				<Layout className={style.container}>
				    <Header className={style.head}>
						用户管理系统
						<span className={style.headPromp}>
							欢迎您,{username}
							{'　'}
							<Button 
							className={style.exitButton} 
							size='small' 
							onClick={() => {
								dispatch({
									type: 'userCenter/exit'
								});
							}}>
								安全退出
							</Button>
						</span>
				    </Header>
				    <Content className={style.middle}>
				    	<Breadcrumb className={style.breadcrumb}>
							<Breadcrumb.Item>用户管理系统</Breadcrumb.Item>
							<Breadcrumb.Item>{tab}</Breadcrumb.Item>
						</Breadcrumb>
				    	<Layout className={style.contentContainer}>
							<Sider className={style.sider}>
								<Menu
								mode="inline"
								selectedKeys={[tab]} 
								onClick={({key}) => {
									dispatch({
										type: 'userCenter/changeTab',
										payload: key
									});
								}}>
									{menuItems}
								</Menu>
							</Sider>
							<Content className={style.content}>
								<h2 className={style.contentTitle}>{tab}</h2>
								{contentTable}
								<SelectList />
							</Content>
						</Layout>
					</Content>
				    <Footer className={style.footer}>
						浙ICP备17032658号
						{' '}
						版权所属
						{' '}
						<a href='javascript:void(0);'>减一科技</a>
					</Footer>
				</Layout>
				{opModal}
			</Spin>
		</div>
	);
}

export default connect((state) => ({
	state: {
		...state.userCenter,
		loading: state.loading.models.userCenter
	}
}))(UserCenterPage);