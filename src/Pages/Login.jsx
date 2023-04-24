import React,{useState} from "react";


export const Login = () => {
  return (
   <form>
    <label for="email">E-mail</label>
    <input type="email" placeholder="Shtypni e-mail" id="email" name="email"></input>
    <label for="password">Password</label>
    <input type="password" placeholder="Shtypni password-in" id="password" name="password"></input>
    <button>Log in </button>




   </form>
  );
};
