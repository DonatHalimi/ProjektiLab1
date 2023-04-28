import {useState,useEffect} from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./LoginStyle.css";

export const Login = () => {
  const initialValues={email:"",password:""};
  const [formValues,setFormValues]=useState(initialValues);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const handleChange =(e) => {
    const{ name , value } =e.target;
    setFormValues({...formValues,[name]:value});
    
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    validate(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }
  useEffect(() =>{
    if(Object.keys(formErrors).length=== 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors]);

  const validate = (values)=>{
    const errors={}
    const regexEmail=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|net)$/;
    const regexPass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])[A-Za-z\d!@#$%^&*()_+=-]{8,}$/;

    if(!values.email){
      errors.email ="Email is required";
    }else if(!regexEmail.test(values.email)){
      errors.email="This is not a valid email"
    }
    if(!values.password){
      errors.password ="Password is required";
    }else if(!regexPass.test(values.password)){
      errors.password="This is not a valid password"
    }
    return errors;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }  

  return (
    <div class="login-box">
    <p>Log in</p>
    <pre></pre>
    <form onSubmit={handleSubmit}>
      <div class="user-box">
      <input value={formValues.email} onChange={handleChange} type="email" placeholder="Type e-mail" id="email" name="email"></input>
        <label htmlFor='email'>Email</label>
        <p id="error">{formErrors.email}</p>
      </div>
      
      <div class="user-box">
      <input value={formValues.password} onChange={handleChange} type={passwordVisible ? "text" : "password"} placeholder="Type password" id="password" name="password"></input>
        <label htmlFor="password">Password</label>
        <button type="button" class ="visibility-btn" onClick={togglePasswordVisibility}>
       {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
        <p id="error">{formErrors.password}</p>
      </div>
      
      <button class="btn" type="submit" >Log in </button>
    </form>
    <p>Don't have an account? <a href="/register" class="a2">Sign up!</a></p>
  </div>
  );
};