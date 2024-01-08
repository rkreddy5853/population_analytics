// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Population from './Population';
import Analytics from './Analytics';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Population />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default App;
