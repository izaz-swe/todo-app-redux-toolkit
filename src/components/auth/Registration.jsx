import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/registration/regSlice";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isLoading, isError, error, succes} = useSelector((state) => state.reg);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password===""|| email==="" || address === "" || name === ""){
      setFormError(true);
    }else {
      dispatch(createUser({name, email, password, address}));
      setName('');
      setEmail('');
      setAddress('');
      setPassword('');
    }
  }
  useEffect(()=>{
    if(!isLoading && !isError && succes){
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }else{
      console.log(error);
    }
},[dispatch, succes]);
 
  return (
    <div className="container">
    <div className="form">
      <h3 className="header">Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="City, Country"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="test@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          
        </div>
        <button  className="btn" type="submit">
          Sign Up
        </button>
      </form>
      {!isLoading && isError || formError && (
          <p className="error"> There was an error occured.</p>
        )}
      { formError && (
          <p className="error"> Please Give All Information.</p>
        )}
    </div>
    </div>
  );
}

export default Registration;
