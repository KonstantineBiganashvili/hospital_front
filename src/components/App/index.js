import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../Login';
import Registration from '../Registration';
import Receptions from '../Receptions';
import WithAuth from '../HOC/WithAuth';

const App = () => {
  return (
    <div className="main-body">
      <Router>
        <Routes>
          <Route
            path="/receptions"
            element={
              <WithAuth>
                <Receptions />
              </WithAuth>
            }
          />
          <Route path="/*" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
