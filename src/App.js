import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Home, Tea, Explore, Blog } from './pages';

import './App.scss';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tea" element={<Tea />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </HashRouter>
  );
}

export default App;