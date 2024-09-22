import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Aside from './layout/Aside';
import Home from './un-auth/Home';
import Discussion from './layout/Discussion';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <>
     <Header/>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
