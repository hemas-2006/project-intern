import { useState } from "react";

import axios from "axios";

function Login() {

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  async function handleLogin(e){

    e.preventDefault();

    try {

      const response =
      await axios.post(

        "https://project-intern-45n0.onrender.com/api/auth/login",

        {
          email,
          password
        }

      );

      alert(
        response.data.message
      );

      console.log(
        response.data
      );

    }

    catch(error){

      alert(
        "Login Failed"
      );

      console.log(error);

    }
  }

  return (

    <div style={{padding:"30px"}}>

      <h2>
        Login Page
      </h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>
          setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>
          setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">

          Login

        </button>

      </form>

    </div>
  );
}

export default Login;