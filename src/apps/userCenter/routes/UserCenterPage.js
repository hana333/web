import React from 'react';
import {Layout, Menu, Breadcrumb, Button, Spin, Table} from 'antd';
import {connect} from 'dva';
import style from './css/UserCenterPage.css';

const {Header, Content, Sider, Footer} = Layout;

const UserTable = React.createClass({
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		const columns = [
			{
			    title: '序号',
			    dataIndex: 'userId'
			}, 
			{
			    title: '用户名',
			    dataIndex: 'username'
			}, 
			{
			    title: '邮箱',
			    dataIndex: 'email'
			}, 
			{
			    title: '手机',
			    dataIndex: 'mobilePhone'
			},
			{
			    title: '创建时间',
			    dataIndex: 'createTime'
			},
			{
			    title: '操作',
			    render: (text, record, index) => (
			    	<span>
						<Button className={style.opButton}>更新</Button>
						<Button className={style.opButton}>删除</Button>
						<Button className={style.opButton}>拥有角色</Button>
						<Button className={style.opButton}>添加角色</Button>
					</span>
			    )
			}
		];
		return (
			<Table 
		    columns={columns} 
		    dataSource={state.userData} 
		    bordered 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton}>添加用户</Button>
		    	</span>
		    )} />
		);
	}
});

const RoleTable = React.createClass({
	render() {
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		const columns = [
			{
			    title: '序号',
			    dataIndex: 'roleId'
			}, 
			{
			    title: '角色',
			    dataIndex: 'role'
			}, 
			{
			    title: '描述',
			    dataIndex: 'description'
			},
			{
			    title: '操作',
			    render: (text, record, index) => (
			    	<span>
						<Button className={style.opButton}>更新</Button>
						<Button className={style.opButton}>删除</Button>
						<Button className={style.opButton}>拥有权限</Button>
						<Button className={style.opButton}>添加权限</Button>
					</span>
			    )
			}
		];
		return (
			<Table 
		    columns={columns} 
		    dataSource={state.roleData} 
		    bordered 
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
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		const columns = [
			{
			    title: '序号',
			    dataIndex: 'permissionId'
			}, 
			{
			    title: '权限',
			    dataIndex: 'permission'
			}, 
			{
			    title: '描述',
			    dataIndex: 'description'
			},
			{
			    title: '操作',
			    render: (text, record, index) => (
			    	<span>
						<Button className={style.opButton}>更新</Button>
						<Button className={style.opButton}>删除</Button>
					</span>
			    )
			}
		];
		return (
			<Table 
		    columns={columns} 
		    dataSource={state.permissionData} 
		    bordered 
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
		let state = this.props.state;
		let dispatch = this.props.dispatch;
		const columns = [
			{
			    title: '序号',
			    dataIndex: 'permissionId'
			}, 
			{
			    title: '组',
			    dataIndex: 'permission'
			}, 
			{
			    title: '描述',
			    dataIndex: 'description'
			}, 
			{
			    title: '类型',
			    dataIndex: 'type'
			},
			{
			    title: '操作',
			    render: (text, record, index) => (
			    	<span>
						<Button className={style.opButton}>更新</Button>
						<Button className={style.opButton}>删除</Button>
						<Button className={style.opButton}>拥有成员</Button>
						<Button className={style.opButton}>添加成员</Button>
					</span>
			    )
			}
		];
		return (
			<Table 
		    columns={columns} 
		    dataSource={state.groupData} 
		    bordered 
		    title={() => (
		    	<span>
		    		<Button className={style.opButton}>添加组</Button>
		    	</span>
		    )} />
		);
	}
});

function UserCenterPage({state, dispatch}) {
	let username = state.username;
	let tab = state.tab;
	let content;
	switch (tab){
		case '用户管理':
			content = <UserTable state={state} dispatch={dispatch} />;
			break;
		case '角色管理':
			content = <RoleTable state={state} dispatch={dispatch} />;
			break;
		case '权限管理':
			content = <PermissionTable state={state} dispatch={dispatch} />;
			break;
		case '组管理':
			content = <GroupTable state={state} dispatch={dispatch} />;
			break;
	}
	return(
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
								<Menu.Item key='用户管理'>用户管理</Menu.Item>
					            <Menu.Item key='角色管理'>角色管理</Menu.Item>
					            <Menu.Item key='权限管理'>权限管理</Menu.Item>
					            <Menu.Item key='组管理'>组管理</Menu.Item>
							</Menu>
						</Sider>
						<Content className={style.content}>
							<h2 className={style.contentTitle}>{tab}</h2>
							{content}
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
		</Spin>
	);
}

export default connect((state) => ({
	state: {
		...state.userCenter,
		loading: state.loading.models.userCenter
	}
}))(UserCenterPage);