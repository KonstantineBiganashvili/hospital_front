import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import { ErrorModal } from '../../Modals/Modals';
import { validEmail } from '../../helpers/validators';
import './Login.css';

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({});
  const [errors, setErrors] = useState([]);
  const { setToken } = props;

  const logInInfoFunction = (info) => {
    setLoginInfo({ ...loginInfo, ...info });
  };

  const logInFunction = async () => {
    const errorsArray = [];

    if (
      !loginInfo.hasOwnProperty('login') ||
      !loginInfo.hasOwnProperty('password')
    ) {
      errorsArray.push('You have to enter all fields');
    }

    if (!validEmail(loginInfo.login)) {
      errorsArray.push('Invalid email address!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    }

    if (!errorsArray.length) {
      try {
        const newLoginInfo = await withBody('POST', 'login', loginInfo);
        setToken(newLoginInfo.token);
      } catch (error) {
        setErrors((oldErrors) => [...oldErrors, error.message]);
      }
    }
  };

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
              onInput={(e) =>
                logInInfoFunction({ login: e.target.value.toLowerCase() })
              }
            />
          </div>
          <div id="passwordInputField">
            <label htmlFor="passwordInput">Password:</label>
            <input
              type="password"
              id="passwordInput"
              onInput={(e) => logInInfoFunction({ password: e.target.value })}
            />
          </div>
          <button type="submit" id="submitBtn" onClick={() => logInFunction()}>
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
