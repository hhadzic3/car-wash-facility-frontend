import React from 'react';
import { Button, Result } from 'antd';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { UserRoles } from '../../common/enums/enums';

const Unauthorized = () => {
  const { isLoggedIn, userRole } = useAuth();
  
  var currentPage = !isLoggedIn ? "/login" : userRole === UserRoles.User ? "/user" : "/admin";

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={ <Link to={currentPage}> <Button type="primary">Back Home</Button> </Link> }
    />
  )
};

export default Unauthorized;
