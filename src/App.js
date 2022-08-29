import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Registration from './components/Registration';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div className="main-body">
      <Router>
        <Routes>
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
