import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { withBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import { ErrorModal } from '../Modals/ErrorModal';

import './login.css';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createLoginInfo = (info) => {
    setLoginInfo({ ...loginInfo, ...info });
  };

  const logIn = async () => {
    if (!loginInfo.login || !loginInfo.password) {
      setErrors(['You have to enter all fields']);
    } else {
      try {
        const newLoginInfo = await withBody('POST', 'login', loginInfo);

        if (newLoginInfo) navigate('/receptions');
      } catch (error) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const { login, password } = loginInfo;

  return (
    <>
      <ErrorModal errors={errors} setErrors={setErrors} />
      <Header page={'Log In To The System'} />
      <div className="body">
        <img src="./img/Logo2.png" alt="hospital building" id="hospitalImg" />
        <div id="LoginInputFields">
          <h2>Log In To The System</h2>
          <div id="emailInputField">
            <label htmlFor="emailInput">Login:</label>
            <input
              type="email"
              id="emailInput"
              value={login}
              onInput={({ target }) =>
                createLoginInfo({ login: target.value.toLowerCase() })
              }
            />
          </div>
          <div id="passwordInputField">
            <label htmlFor="passwordInput">Password:</label>
            <input
              type="password"
              id="passwordInput"
              value={password}
              onInput={({ target }) =>
                createLoginInfo({ password: target.value })
              }
            />
          </div>
          <button id="submitBtn" onClick={logIn}>
            LOG IN
          </button>
          <Link to="/registration" id="registerLink">
            Registration
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
