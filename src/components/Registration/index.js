import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { withBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import { ErrorModal } from '../Modals/ErrorModal';
import { validEmail, validPassword } from '../../helpers/validators';
import './Registration.css';

const Registration = () => {
  const [registrationInfo, setRegistrationInfo] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createRegistrationInfo = (info) => {
    setRegistrationInfo({ ...registrationInfo, ...info });
  };

  const registration = async () => {
    const errorsArray = [];

    if (
      !registrationInfo.login ||
      !registrationInfo.password ||
      !registrationInfo.repeatedPassword
    ) {
      errorsArray.push('You have to enter all fields!');
    }

    if (!validEmail(registrationInfo.login)) {
      errorsArray.push('Invalid email address!');
    }

    if (registrationInfo.password !== registrationInfo.repeatedPassword) {
      errorsArray.push('Passwords do not match!');
    }

    if (!validPassword(registrationInfo.password)) {
      errorsArray.push(
        'Password must be at least 8 characters long and must include at least one special symbol and uppercase letter!'
      );
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    } else {
      try {
        await withBody('POST', 'register', registrationInfo);
        navigate('/login');
      } catch (error) {
        setErrors((oldErrors) => [...oldErrors, error.message]);
      }
    }
  };

  return (
    <>
      <ErrorModal errors={errors.length && errors} setErrors={setErrors} />
      <Header page={'Register To The System'} />
      <div className="body">
        <img src="./img/Logo2.png" alt="hospital building" id="hospitalImg" />
        <div id="RegistrationInputFields">
          <h2>Register To The System</h2>
          <div id="emailInputField">
            <label htmlFor="emailInput">Login:</label>
            <input
              type="email"
              id="emailInput"
              onInput={({ target }) =>
                createRegistrationInfo({
                  login: target.value.toLowerCase(),
                })
              }
            />
          </div>
          <div id="passwordInputField">
            <label htmlFor="passwordInput">Password:</label>
            <input
              type="password"
              id="passwordInput"
              onInput={({ target }) =>
                createRegistrationInfo({ password: target.value })
              }
            />
          </div>
          <div id="passwordInputRepeatField">
            <label htmlFor="passwordRepeatInput">Repeat Password:</label>
            <input
              type="password"
              id="passwordRepeatInput"
              onInput={({ target }) =>
                createRegistrationInfo({ repeatedPassword: target.value })
              }
            />
          </div>
          <button id="submitBtn" onClick={registration}>
            REGISTER
          </button>
          <Link to="/" id="registerLink">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
