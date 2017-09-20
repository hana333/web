import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button, Spin} from 'antd';
import {connect} from 'dva';
import style from './css/UserCenterPage.css';

const {Header, Content, Sider, Footer} = Layout;

const User = React.createClass({
	render() {
		return (
			<div></div>
		);
	}
});

function UserCenterPage({state, dispatch}) {
	return(
		<Spin size='large' spinning={state.globalLoading}>
			<Layout className={style.container}>
			    <Header className={style.head}>
					用户管理系统
					<span className={style.headPromp}>
						欢迎您,admin
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
						<Breadcrumb.Item>{state.tab}</Breadcrumb.Item>
					</Breadcrumb>
			    	<Layout className={style.contentContainer}>
						<Sider className={style.sider}>
							<Menu
							mode="inline"
							defaultSelectedKeys={[state.tab]} 
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
							{state.tab}
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
	state: state.userCenter
}))(UserCenterPage);