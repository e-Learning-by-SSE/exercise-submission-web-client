import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Done from "./components/auth/Done";
import Dashboard from "./components/dashboard/Dashboard";
import Submit from './components/submit/Submit';
import ShowVersion from './components/show_versions/ShowVersion';

class App extends React.Component<React.PropsWithChildren<{}>, {darkmode: boolean}> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = {darkmode: this.checkSystemDarkmode()};
  }

  private checkSystemDarkmode(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  onChangeDarkMode = (darkmode: boolean) => {
    this.setState({darkmode: darkmode});
  }

  render() {return (
  <Router>
    <Routes>
      <Route  path="/" element={<Dashboard darkmode={this.state.darkmode} onChangeDarkMode={this.onChangeDarkMode} menuSelected={<Submit/>} />} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />
      <Route  path="/done" element={<Done/>} />
      <Route  path="/dashboard" element={<Dashboard darkmode={this.state.darkmode} onChangeDarkMode={this.onChangeDarkMode} menuSelected={<Submit/>} />} />
      <Route  path="/submit" element={<Dashboard darkmode={this.state.darkmode} onChangeDarkMode={this.onChangeDarkMode} menuSelected={<Submit/>} />} />
      <Route  path="/version" element={<Dashboard darkmode={this.state.darkmode} onChangeDarkMode={this.onChangeDarkMode} menuSelected={<ShowVersion/>}  />} />
    </Routes>
  </Router>
  );
  }
}

export default App;


