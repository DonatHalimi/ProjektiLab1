import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterStyle from '../styles/Register.module.css';
import Navbar from "../components/Navbar";
import axios from "axios";
import { useFormik } from "formik";
import { advancedSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export const Register = () => {

  document.title = "Ruby | Register";

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  const [registerStatus, setRegisterStatus] = useState("");


  const register = async (values, actions) => {

    try {
      const response = await axios.post('http://localhost:6001/api/user/register', {
        Name: values.Name,
        Surname: values.Surname,
        Email: values.Email,
        Password: values.Password,
        Role: 2
      });

      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus('ACCOUNT CREATED SUCCESSFULLY');
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setRegisterStatus('Error registering user');
    } finally {
      actions.setSubmitting(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      Name: "",
      Surname: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    },
    validationSchema: advancedSchema,
    onSubmit: (values, actions) => {
      register(values, actions);
    },
  });


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  return (
    <>
      <div className={RegisterStyle['register-Container']}>
        <Navbar />

        <div className={RegisterStyle['register-box']}>
          <p>Sign Up</p>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className={RegisterStyle['user-box']}>
              <input value={formik.values.Name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Shkruaj emrin" id="name" name="Name" className={
                formik.errors.Name && formik.touched.Name
                  ? "input-error"
                  : ""
              }></input>
              <label htmlFor='name'>Emri</label>
              {formik.errors.Name && formik.touched.Name && (
                <p className="error">{formik.errors.Name}</p>
              )}

            </div>
            <div className={RegisterStyle['user-box']}>
              <input value={formik.values.Surname} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Shkruaj mbiemrin" id="surname" name="Surname" className={
                formik.errors.Surname && formik.touched.Surname
                  ? "input-error"
                  : ""
              }></input>

              <label htmlFor='surname'>Mbiemri</label>
              {formik.errors.Surname && formik.touched.Surname && (
                <p className="error">{formik.errors.Surname}</p>
              )}
            </div>
            <div className={RegisterStyle['user-box']}>
              <input value={formik.values.Email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder="Shkruaj e-mail" id="email" name="Email" className={
                formik.errors.Email && formik.touched.Email
                  ? "input-error"
                  : ""
              }
              ></input>

              <label htmlFor='email'>E-mail</label>
              {formik.errors.Email && formik.touched.Email && (
                <p className="error">{formik.errors.Email}</p>
              )}
            </div>
            <div className={RegisterStyle['user-box']}>
              <input value={formik.values.Password} onChange={formik.handleChange} onBlur={formik.handleBlur} type={passwordVisible ? "text" : "password"} placeholder="Shkruaj password" id="password" name="Password" className={
                formik.errors.Password && formik.touched.Password
                  ? "input-error"
                  : ""
              }></input>

              <label htmlFor="password">Password</label>
              <button type="button" class="visibility-btn" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.errors.Password && formik.touched.Password && (
                <p>{formik.errors.Password}</p>
              )}
            </div>
            <div className={RegisterStyle['user-box']}>
              <input value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type={confirmPasswordVisible ? "text" : "password"} placeholder="Rishkruaj password" id="confirmPassword" name="confirmPassword" className={
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "input-error"
                  : ""
              }></input>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <button type="button" class="visibility-btn" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p>{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button disabled={formik.isSubmitting} className={RegisterStyle['btn']} type="submit" >Sign Up </button>
          </form>

          <p id={RegisterStyle['account-text']}>Posedoni një llogari? <a href="/Login" className={RegisterStyle['a2']}>Log In!</a></p>
        </div>
      </div>

      <Footer />
    </>
  );
};