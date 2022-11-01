import React, { Component } from "react";
import { Sidebar } from "semantic-ui-react";
import Header from "./Header";
import SidebarComponent from "./Sidebar";
import "./dashboard.css";

export default class Dashboard extends Component {
  render() {
     /* returns a Dashboard in semantic ui with sidebar and a header with login and account */
    return <div className = "dashboard">  <Header /> <SidebarComponent/> </div>;

  }
}