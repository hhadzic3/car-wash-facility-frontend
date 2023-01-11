import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
      <Menu mode="horizontal" defaultSelectedKeys={['home']}>
      
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      
        {/*
        <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
              <Menu.Item key="two" icon={<AppstoreOutlined />}>
                  <Link to="/owner">Owner</Link>
              </Menu.Item>
                  <Menu.Item key="three" icon={<AppstoreOutlined />}>
            Navigation Three
          </Menu.Item>
        </Menu.SubMenu>
        */}
    </Menu>
  </div>
  )
}

export default Header
