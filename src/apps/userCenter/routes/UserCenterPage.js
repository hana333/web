import React from 'react';
import {Layout, Menu, Breadcrumb, Button, Spin, Table, Modal, Input} from 'antd';
import {connect} from 'dva';
import style from './css/UserCenterPage.css';

const {Header, Content, Sider, Footer} = Layout;

const EditModal = React.createClass({
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		let modalInputItems = state.modalInputItems;
		let inputs;
		for(let i = 0; i < modalInputItems.length; i ++) {
			let item = modalInputItems[i];
			inputs.push(
				<Input placeholder={item.name} onChange={() => {
					dispatch({
						type: 'userCenter/changeModalInput',
						payload: item.key
					})
				}} />
			);
		}
		return (
			<Modal 
			className='modal-container'
			visible={state.modalVisible} 
			title={state.modalTitle} 
			onCancel={() => {
				dispatch({
					type: 'userCenter/changeModal',
					payload: {modalVisible: false}
				});
			}}
			onOk={() => {
				dispatch({
					type: 'userCenter/changeModal',
					payload: {modalVisible: false}
				});
			}}>
				{inputs}
			</Modal>
		);
	}
});

const UserTable = React.createClass({
	render() {
		return (
		    <ContentTable 
		    activeModule={this.props.activeModule} 
		    dispatch={this.props.dispatch} 
		    op={(text, record, index) => (
		    	<span>
					<Button className={style.opButton}>更新</Button>
					<Button className={style.opButton}>删除</Button>
					<Button className={style.opButton}>拥有角色</Button>
					<Button className={style.opButton}>添加角色</Button>
				</span>
		    )} 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton} onClick={() => {
		    			dispatch({
		    				type: 'userCenter/changeModal',
		    				payload: {
		    					modalVisible: true,
		    					modalTitle: '添加用户'
		    				}
		    			});
		    		}}>添加用户</Button>
		    	</span>
		    )} />
		);
	}
});

const RoleTable = React.createClass({
	render() {
		return (
		    <ContentTable 
		    activeModule={this.props.activeModule} 
		    dispatch={this.props.dispatch} 
		    op={(text, record, index) => (
		    	<span>
					<Button className={style.opButton}>更新</Button>
					<Button className={style.opButton}>删除</Button>
					<Button className={style.opButton}>拥有权限</Button>
					<Button className={style.opButton}>添加权限</Button>
				</span>
		    )} 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton}>添加角色</Button>
		    	</span>
		    )} />
		);
	}
});

const PermissionTable = React.createClass({
	render() {
		return (
		    <ContentTable 
		    activeModule={this.props.activeModule} 
		    dispatch={this.props.dispatch} 
		    op={(text, record, index) => (
		    	<span>
					<Button className={style.opButton}>更新</Button>
					<Button className={style.opButton}>删除</Button>
				</span>
		    )} 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton}>添加权限</Button>
		    	</span>
		    )} />
		);
	}
});

const GroupTable = React.createClass({
	render() {
		return (
		    <ContentTable 
		    activeModule={this.props.activeModule} 
		    dispatch={this.props.dispatch} 
		    op={(text, record, index) => (
		    	<span>
					<Button className={style.opButton}>更新</Button>
					<Button className={style.opButton}>删除</Button>
					<Button className={style.opButton}>拥有成员</Button>
					<Button className={style.opButton}>添加成员</Button>
				</span>
		    )} 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton}>添加组</Button>
		    	</span>
		    )} />
		);
	}
});

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
		    render: this.props.op
		});
		return (
			<Table 
		    columns={columns} 
		    dataSource={data} 
		    title={this.props.title} 
		    bordered />
		);
	}
});

function UserCenterPage({state, dispatch}) {
	let username = state.username;
	let modules = state.modules;
	let menuItems = [];
	let contentTable;
	let tab;
	for(let k in modules) {
		let title = modules[k].title;
		menuItems.push(<Menu.Item key={title}>{title}</Menu.Item>);
		if(modules[k].active) {
			tab = title;
			contentTable = <UserTable activeModule={modules[k]} dispatch={dispatch} />;
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
								defaultSelectedKeys={[tab]} 
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
				<EditModal state={state} dispatch={dispatch} />
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