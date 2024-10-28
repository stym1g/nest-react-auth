import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/SignUp.css';
import axios from 'axios';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/[a-zA-Z]/, 'At least one letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[@$!%*?&#]/, 'At least one special character')
    .required('Required'),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: '', name: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/users/signup', values);
                if (response.status === 201) {
                  navigate('/application');
                } else {
                  console.error('Signup failed:', response);
                }
              } catch (error) {
                console.error('Error creating user:', error);
              }
        }}
      >
        {() => (
          <Form className="signup-form">
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
