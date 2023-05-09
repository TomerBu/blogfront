import Swal from "sweetalert2";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import authService from "../services/auth.service";
const Register = () => {
  const nav = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(undefined);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  //Validations:
  const validationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  //will be called by formik if the form is VALID
  const handleRegister = (formValues) => {
    setisLoading(true);
    //get data from input fields:
    const { email, username, password } = formValues;

    //submit Post request
    authService
      .register(email, username, password)
      .then((res) => {
        //success:
        console.log(res)
        //Sweet Alert
        Swal.fire({
          title:res.data.message, 
          icon:"success", 
          timer: 1500
        })
        //Go to Login page:
        nav('/login')
      })
      .catch((e) => {
        console.log(e)
        seterrorMessage(e.response.data.detail);
      })
      .finally(()=>{
        setisLoading(false)
        //seterrorMessage(undefined)
      })
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={validationSchema}
    >
      <Form>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {isLoading && <Spinner text="Logging you in..." />}
        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          {/* Input Tag */}
          <Field name="username" type="text" id="username" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="username"
            className="alert alert-danger"
          />
        </div>

        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {/* Input Tag */}
          <Field name="email" type="email" id="email" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="email"
            className="alert alert-danger"
          />
        </div>

        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="password" className="form-label">
            Password
          </label>
          {/* Input Tag */}
          <Field name="password" type="password" id="password" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="password"
            className="alert alert-danger"
          />
        </div>

        <div className="col-12">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
