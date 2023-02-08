import React  from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss'
import { UserRoles } from '../../common/enums/enums' 
import useAuth from '../../hooks/useAuth';
import { removeToken } from '../../services/authService';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';

const { confirm } = Modal;

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole  } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    showConfirm();
  };

  const showConfirm = () => {
    confirm({
      title: 'Logout?',
      icon: <ExclamationCircleFilled />,
      content: 'Do you Want to logout?',
      onOk() {
        removeToken();
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/login');
      },
      onCancel() {},
    });
  };

  const items = [];

  if (!isLoggedIn) {
    items.push(
      {
        label: (
          <Link to="/login">Login</Link>
        ),
        key: 'login',
      },
      {
        label: (
          <Link to="/register">Register</Link>
        ),
        key: 'register',
      }
    )
  } else {
    if (userRole == UserRoles.User){
      items.push(
        {
          label: (
            <Link to="/user">User page</Link>
          ),
          key: 'user',
        }
      )
    } else {
      items.push(
        {
          label: (
            <Link to="/admin">Admin page</Link>
          ), 
          key: 'admin',
        }
      )
    }
    items.push(
      {
        label: (
          <Link onClick={logOut}>Logout</Link>
        ), 
        key: 'logout',
      }
    )
  }

  return (
    <div className='header'>
      <Menu mode="horizontal" items={items} />
  </div>
  )
}

export default Header
