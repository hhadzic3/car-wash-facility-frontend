import { React, useEffect } from 'react'
import { Formik } from "formik";
import '../../common/styles/Form.scss';
import * as Yup from "yup";
import axiosInstance from '../../config/axois'
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { getDecodedToken, setToken } from '../../services/authService';
import { message } from 'antd';
import { UserRoles } from '../../common/enums/enums'

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(4, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const { isLoggedIn, userRole, setIsLoggedIn, setUserRole } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Login failed. Please check your email and password and try again',
    });
  };

  useEffect(() => {
    if (isLoggedIn){
      if (userRole == UserRoles.User)
        navigate('/user')
      else if (userRole == UserRoles.Admin)
        navigate('/admin')
    }
  }, [isLoggedIn]);

  return (
    <>
      {contextHolder}
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
            axiosInstance.post('/auth/login', values)
            .then(response => {
              if (response.status === 403) {
                error();
                throw new Error('Access denied');
              }
              return response.data;
            })
            .then(data => {
                const token = data;
                setToken(token)
                const decodedToken = getDecodedToken(token);                
                const authority = decodedToken.authorities[0].authority;
                setIsLoggedIn(true)
                setUserRole(authority)
                
                if (authority == UserRoles.User)
                  navigate('/user');
                else if (authority == UserRoles.Admin) 
                  navigate('/admin')
            })
            .catch(err => {
              error()
              console.log(err);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
           {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                 {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                 {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default LoginPage
