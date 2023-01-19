import { React } from 'react'
import { Formik } from "formik";
import '../../common/styles/Form.scss';
import * as Yup from "yup";
import axiosInstance from '../../config/axois'
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { getDecodedToken, setToken } from '../../services/authService';

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
  const { setIsLoggedIn, setUserRole } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          try {
            axiosInstance.post('/auth/login', values)
              .then((response) => {
                const token = response.data;
                setToken(token)
                const decodedToken = getDecodedToken(token);                
                
                setIsLoggedIn(true)
                setUserRole(decodedToken.authorities[0].authority)
                
                if (decodedToken.authorities[0].authority === "USER")
                  navigate('/user');
                else navigate('/admin')
              });
          } catch (err) {
            alert("ERROR");
            console.log(err);
            navigate('/login');
          }
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
