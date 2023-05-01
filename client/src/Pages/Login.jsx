import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogInStyle from '../styles/Login.module.css';
import Navbar from "../components/Navbar";
import axios from "axios";

// Komponenti i Login
export const Login = (props) => {

  // Deklarimi i konstanteve per login  
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");


  // Funksioni qe ndryshon vleren e formes ne baze te ndryshimit te input-it
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  // Funksioni qe dergon formen dhe ndryshon vlerat e gabimeve te formes
  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  // Funksioni qe dergon kerkese per te bere login
  const login = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:6001/api/user/login`, {
      Email: Email,
      Password: Password,

    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus("ACCOUNT CREATED SUCCESSFULLY")
      }
    })
      .catch((error) => {
        console.log(error);
        setLoginStatus("Error registering user");
      });
  }

  // UseEffect hook qe printon ne console vlerat e formes kur nuk ka gabime dhe forma eshte derguar
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

  }, [formErrors]);

  // Deklarimi i funksionit validate me parameter values
  const validate = (values) => {
    const errors = {}
    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|net)$/;
    const regexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])[A-Za-z\d!@#$%^&*()_+=-]{8,}$/;

    // Validimi i email-it
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email"
    }

    // Validimi i password-it
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regexPass.test(values.password)) {
      errors.password = "This is not a valid password"
    }
    return errors;
  }

  // Deklarimi i funksionit togglePasswordVisibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  // Renderimi i HTML per login form
  return (
    <>
    
    <div className={LogInStyle['login-Container']}>
      <Navbar />
      
      <div className={LogInStyle['login-box']}>
        <p>Log in</p>
        <pre></pre>
        <form >
          <div className={LogInStyle['user-box']}>
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Type e-mail" id="email" name="Email"></input>
            <label htmlFor='email'>Email</label>
            <p id="error">{formErrors.email}</p>
          </div>

          <div className={LogInStyle['user-box']}>
            <input onChange={(e) => { setPassword(e.target.value) }} type={passwordVisible ? "text" : "password"} placeholder="Type password" id="password" name="Password"></input>
            <label htmlFor="Password">Password</label>
            <button type="button" className={LogInStyle['visibility-btn']} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p id="error">{formErrors.password}</p>
          </div>

          <button className={LogInStyle['btn']} type="submit" onClick={login}>Log in </button>
        </form>
        <p id={LogInStyle['account-text']}>Don't have an account? <a href="/register" className={LogInStyle['a2']}>Sign up!</a></p>
      </div>
      </div>
    </>
  );
};