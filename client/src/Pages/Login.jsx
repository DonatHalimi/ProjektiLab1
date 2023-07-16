import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogInStyle from "../styles/Login.module.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const login = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/user/login",
        {
          Email: values.Email,
          Password: values.Password,
        }
      );

      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else if (response.data[0].Role === 2) {
        navigate("/");
        setLoginStatus(response.data[0].Name);
      } else if (response.data[0].Role === 1) {
        navigate("/Admin");
        setLoginStatus(response.data[0].Name);
      } else {
        setLoginStatus("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setLoginStatus("An error occurred during login");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: basicSchema,
    onSubmit: (values, actions) => {
      login(values, actions);
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className={LogInStyle["login-Container"]}>
        <Navbar />

        <div className={LogInStyle["login-box"]}>
          <p>Log in</p>
          <pre></pre>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className={LogInStyle["user-box"]}>
              <input
                value={formik.values.Email}
                onChange={formik.handleChange}
                type="email"
                onBlur={formik.handleBlur}
                placeholder="Shkruaj e-mail"
                id="Email"
                name="Email"
                className={
                  formik.errors.Email && formik.touched.Email
                    ? "input-error"
                    : ""
                }
              ></input>
              <label htmlFor="email">Email</label>
              {formik.errors.Email && formik.touched.Email && (
                <p className="error">{formik.errors.Email}</p>
              )}
            </div>
            <div className={LogInStyle["user-box"]}>
              <input
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={passwordVisible ? "text" : "password"}
                placeholder="Shkruaj password"
                id="Password"
                name="Password"
                className={
                  formik.errors.Password && formik.touched.Password
                    ? "input-error"
                    : ""
                }
              ></input>

              <label htmlFor="Password">Password</label>
              <button
                type="button"
                className={LogInStyle["visibility-btn"]}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.errors.Password && formik.touched.Password && (
                <p>{formik.errors.Password}</p>
              )}
            </div>

            <button disabled={formik.isSubmitting} className={LogInStyle["btn"]} type="submit"> Log in{" "}</button>
          </form>
          <p id={LogInStyle["account-text"]}>
            Nuk keni llogari?{" "}
            <a href="/register" className={LogInStyle["a2"]}>
              Sign up!
            </a>
          </p>
          <p>{loginStatus}</p>
        </div>
      </div>
    </>
  );
};

export default Login;