import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Done from "./components/auth/Done";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/account/Account";
import Submit from './components/submit/Submit';
import ShowVersion from './components/show_versions/ShowVersion';

class App extends React.Component<React.PropsWithChildren<{}>, {darkmode: boolean}> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = {darkmode: false};
  }

  onChangeDarkMode = (darkmode: boolean) => {
    this.setState({darkmode: darkmode});
  }

  render() {return (
  <Router>
    <Routes>
      <Route  path="/" element={<Login/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />
      <Route  path="/done" element={<Done/>} />
      <Route  path="/dashboard" element={<Dashboard onChangeDarkMode={this.onChangeDarkMode} menuSelected={<Submit/>} />} />
      <Route  path="/submit" element={<Dashboard onChangeDarkMode={this.onChangeDarkMode} menuSelected={<Submit/>} />} />
      <Route  path="/version" element={<Dashboard onChangeDarkMode={this.onChangeDarkMode} menuSelected={<ShowVersion/>}  />} />
    </Routes>
  </Router>
  );
  }
}

export default App;
