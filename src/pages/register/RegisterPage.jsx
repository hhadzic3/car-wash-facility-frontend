import React from 'react'
import { Formik } from "formik";
import '../../common/styles/Form.scss';
import * as Yup from "yup";
import axios from '../../api/axois';
import baseURL from '../../config/config'

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Full name is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const RegisterPage = () => {
  return (
    <>
    {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
    <Formik
      validationSchema={schema}
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values));
        try {
          const response = await axios.post("/user/register", 
            JSON.stringify({
              name: "Muhammad Nur Ali",
              email: "muh.nurali43@gmail.com",
              password: "12345678",
              age: 20
            }))
            console.log(response.data);
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
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter full name"
                className="form-control inp_text"
                id="name"
              />
              <p className="error">
                {errors.name && touched.name && errors.name}
              </p>

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
