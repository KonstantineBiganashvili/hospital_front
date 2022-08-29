import React from 'react';
import './Header.css';

const Header = ({ page, token, setToken }) => {
  const logOutFunction = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div id="header">
      <img src="./img/Logo.png" alt="logo" id="logoImg" />
      <h2>{page}</h2>
      {token ? (
        <button id="logOutBtn" onClick={logOutFunction}>
          Log Out
        </button>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Header;
