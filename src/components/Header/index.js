import React from 'react';
import { Navigate } from 'react-router-dom';
import './Header.css';

const Header = ({ page, token }) => {
  const logOutFunction = () => {
    localStorage.removeItem('token');
    <Navigate to="/" />;
  };

  return (
    <div id="header">
      <img src="./img/Logo.png" alt="logo" id="logoImg" />
      <h2>{page}</h2>
      {token && (
        <button id="logOutBtn" onClick={logOutFunction}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Header;
