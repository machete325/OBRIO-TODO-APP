import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Task from '../Task/Task';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/task/:id' element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
