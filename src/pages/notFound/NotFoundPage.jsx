import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { UserRoles } from '../../common/enums/enums';

const NotFoundPage = () => {
  const { isLoggedIn, userRole } = useAuth();
  
  var currentPage = !isLoggedIn ? "/login" : userRole === UserRoles.User ? "/user" : "/admin";

  return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={ <Link to={currentPage}><Button type="primary">Back Home</Button></Link> }
      />
  )
}

export default NotFoundPage
