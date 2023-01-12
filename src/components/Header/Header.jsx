import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss'
import { UserRoles } from '../../common/enums/enums' 
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole  } = useAuth();

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    setUserRole(null)
  };
    
  return (
    <div className='header'>
      <Menu mode="horizontal" defaultSelectedKeys={['home']}>
        { 
          !isLoggedIn &&
            <>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to="/register">Register</Link>
              </Menu.Item>
            </>
        }
        {
          (isLoggedIn && userRole == UserRoles.Admin) &&
          <>
            <Menu.Item key="admin">
                <Link to="/admin">Admin page</Link>
              </Menu.Item>
              <Menu.Item key="logout">
                <Link to="/" onClick={logOut}>Logout</Link>
              </Menu.Item>
          </>
        }
        {
          (isLoggedIn && userRole == UserRoles.User) &&
          <>
            <Menu.Item key="user">
                <Link to="/user">User page</Link>
              </Menu.Item>
              <Menu.Item key="logout">
                <Link to="/" onClick={logOut}>Logout</Link>
              </Menu.Item>
          </>
        }
    </Menu>
  </div>
  )
}

export default Header
