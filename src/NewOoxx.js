import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

import './style/index.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class NewOoxx extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo"></div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sun1"
                icon={<UserOutlined />}
                title="subnav 1"
              ></SubMenu>
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}
export default NewOoxx;
