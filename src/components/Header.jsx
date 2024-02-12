import React from "react";
import { logout } from "../features/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div className="header">
      <div className="header-container">
        <h3>Todo App</h3>
        <button onClick={handleClick} className="logout">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
