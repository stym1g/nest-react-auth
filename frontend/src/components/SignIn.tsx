import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/SignIn.css";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignIn: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          try {
            setError('');
            const response = await axios.post(
              "http://localhost:3000/auth/signin",
              values
            );

            if (response.status === 200) {
              navigate("/application");
            } else {
              setError('Invalid userid/password');
              console.error("Login failed:", response);
            }
          } catch (error) {
            setError('Error in signin');
            console.error("Error logging in:", error);
          }
        }}
      >
        {() => (
          <Form className="signin-form">
            <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
