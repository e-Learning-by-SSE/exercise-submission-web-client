import React, { Component } from "react";
import { Sidebar } from "semantic-ui-react";
import Header from "./Header";
import SidebarComponent from "./Sidebar";
import "./dashboard.css";
import { BrowserRouter } from "react-router-dom";

export default class Dashboard extends Component<React.PropsWithChildren<{menuSelected: any}>, {menuSelected: any, sidebarVisible: boolean}> {

  constructor(props: React.PropsWithChildren<{menuSelected: any}>) {
    super(props);
    this.state = {menuSelected: props.menuSelected,
                  sidebarVisible: true};
  }

  onChangeVisibility = () => {
    this.changeVisibility();
  }

  private changeVisibility() {
    let visibility = !this.state.sidebarVisible;
    this.setState({sidebarVisible: visibility}); 
  }


  render() {
     /* returns a Dashboard in semantic ui with sidebar and a header with login and account */

    return (
      <div className = "dashboard">  <Header onChangeVisbility={this.onChangeVisibility}/> <SidebarComponent menuSelected={this.props.menuSelected} sidebarVisible={this.state.sidebarVisible} /> </div>
      );

  }
}