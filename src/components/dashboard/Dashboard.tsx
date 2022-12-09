import React, { Component } from "react";
import Header from "./Header";
import SidebarComponent from "./Sidebar";
import "./dashboard.css";

export default class Dashboard extends Component<React.PropsWithChildren<{menuSelected: any,
   onChangeDarkMode: (darkmode: boolean) => void, darkmode: boolean}>, {menuSelected: any, sidebarVisible: boolean}> {

  constructor(props: React.PropsWithChildren<{menuSelected: any,
     onChangeDarkMode: (darkmode: boolean) => void, darkmode: boolean}>) {
    super(props);
    this.state = {menuSelected: props.menuSelected,
                  sidebarVisible: true,};
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
      <div className = "dashboard">  <Header darkmode={this.props.darkmode} onChangeVisbility={this.onChangeVisibility} onChangeDarkMode={this.props.onChangeDarkMode}/> 
      <div style={{height: '100vh'}}><SidebarComponent menuSelected={this.props.menuSelected} sidebarVisible={this.state.sidebarVisible} /></div></div>
      );

  }
}