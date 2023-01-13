import React from 'react'
import { Formik } from "formik";
import '../../common/styles/Form.scss';
import * as Yup from "yup";
import axiosInstance from '../../config/axois';
import { useNavigate } from 'react-router';


const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <>
    {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const response = await axiosInstance.post("/user/register", 
            {
              email: values.email,
              password: values.password,
              role: "USER"
            });
            console.log(response.data);
            navigate("/login");
        } catch (error) {
          console.log(error);
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
            <form noValidate onSubmit={handleSubmit}>
              <span>Register</span>

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
              <p className="error">
                {errors.email && touched.email && errors.email}
              </p>
              
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                className="form-control"
              />
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
              
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  </>
  )
}

export default RegisterPage
