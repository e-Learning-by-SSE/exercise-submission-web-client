import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Done from "./components/auth/Done";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/dashboard/Account";

function App() {
  return (
  <Router>
    <Routes>
      <Route  path="/" element={<Login/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />
      <Route  path="/done" element={<Done/>} />
      <Route  path="/dashboard" element={<Dashboard/>} />
      <Route  path="/account" element={<Account/>} />
    </Routes>
  </Router>
  );
}

export default App;
