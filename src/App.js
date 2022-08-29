import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Registration from './components/Registration';

const App = () => {
  const token = localStorage.getItem('token') || '';

  return (
    <div className="main-body">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={token ? <Navigate to="/receptions" /> : <Login />}
          />
          <Route
            path="/registration"
            element={token ? <Navigate to="/receptions" /> : <Registration />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
