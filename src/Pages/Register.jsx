import React, {useState} from "react";
import "./RegisterStyle.css";


export const Register = () => {
  const [name,setName]=useState('');
  const [surname,setSurname]=useState('');
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');

    return (
      <>
    <div class="register-box">
    <p>Sign up</p>
    <form>
    <div class="user-box">
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Type name" id="name" name="name"></input>
        <label for='name'>Name</label>
      </div>
      <div class="user-box">
      <input value={surname} onChange={(e)=>setSurname(e.target.value)} type="text" placeholder="Type surname" id="surname" name="surname"></input>
        <label for='surname'>Surname</label>
      </div>
      <div class="user-box">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Type e-mail" id="email" name="email"></input>
        <label for='email'>Email</label>
      </div>
      <div class="user-box">
      <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Type password" id="password" name="password"></input>
        <label for="password">Password</label>
      </div>
      <button class="btn" type="submit">Sign up </button>
    </form>
    <p>Already have an account? <a href="/Login" class="a2">Log in!</a></p>
  </div>
      </>
    );
  };
  