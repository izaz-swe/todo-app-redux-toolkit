import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserLogin } from "../../features/auth/loginSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, isError, user, isAuthenticated, error} = useSelector((state) => state.login)
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Email or Password are required!");
    } else {
      dispatch(createUserLogin({ email, password }));
      setEmail("");
      setPassword("");
    }
  }

  useEffect(()=> {
    if(isAuthenticated){
      navigate('/');
    }
    if(isError){
      console.log("Authentication Failed.");
      console.log(error);
    }
  },[dispatch, isAuthenticated])
  return (
    <div className="container">
      <div className="form">
        <h3 className="header">Todo App</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="test@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
