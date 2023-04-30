import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./RegisterStyle.css";
import Navbar from "../components/Navbar";
import axios from "axios";

export const Register = () => {
  const initialValues = { name: "", surname: "", email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");





  const register = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:6001/api/user/register`, {
      Name: Name,
      Surname: Surname,
      Email: Email,
      Password: Password,
      Role: 2

    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message)
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY")
      }
    })
      .catch((error) => {
        console.log(error);
        setRegisterStatus("Error registering user");
      });
  }


  console.log(setRegisterStatus);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  /*const handleSubmit = (e) => {
    e.preventDefault();
    validate(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }*/
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {}
    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|net)$/;
    const regexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])[A-Za-z\d!@#$%^&*()_+=-]{8,}$/;

    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.surname) {
      errors.surname = "Surname is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regexPass.test(values.password)) {
      errors.password = "This is not a valid password";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "You need to confirm password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  return (
    <>
      <Navbar />
      <div class="register-box">
        <p>Sign up</p>
        <form >
          <div class="user-box">
            <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Type name" id="name" name="Name"></input>
            <label htmlFor='name'>Name</label>
            <p id="error">{formErrors.name}</p>
          </div>

          <div class="user-box">
            <input onChange={(e) => { setSurname(e.target.value) }} type="text" placeholder="Type surname" id="surname" name="Surname"></input>
            <label htmlFor='surname'>Surname</label>
            <p id="error">{formErrors.surname}</p>
          </div>

          <div class="user-box">
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Type e-mail" id="email" name="Email"></input>
            <label htmlFor='email'>Email</label>
            <p id="error">{formErrors.email}</p>
          </div>

          <div class="user-box">
            <input onChange={(e) => { setPassword(e.target.value) }} type={passwordVisible ? "text" : "password"} placeholder="Type password" id="password" name="Password"></input>
            <label htmlFor="password">Password</label>
            <button type="button" class="visibility-btn" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p id="error">{formErrors.password}</p>
          </div>

          <div class="user-box">
            <input onChange={handleChange} type={confirmPasswordVisible ? "text" : "password"} placeholder="Type password" id="confirmPassword" name="confirmPassword"></input>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <button type="button" class="visibility-btn" onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p id="error">{formErrors.confirmPassword}</p>
          </div>

          <button class="btn" type="submit" onClick={register}>Sign up </button>
        </form>

        <p id="account-text">Already have an account? <a href="/Login" class="a2">Log in!</a></p>
      </div>
    </>
  );
};