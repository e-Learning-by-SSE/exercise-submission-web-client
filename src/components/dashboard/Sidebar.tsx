/* Sidebar in Semantic ui */

import React, { Component } from "react";
import { Menu, Icon, Sidebar, Segment } from "semantic-ui-react";
import Submit from "../submit/Submit";
import { Link } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import ShowVersion from "../show_versions/ShowVersion";

export default class SidebarComponent extends Component<React.PropsWithChildren<{}>, {menuSelected: JSX.Element }> {

  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { menuSelected: <Submit/>};

  }


  onClickSubmit = () => {
    this.setState({menuSelected: <Submit/>});
  };

  onClickVersion= () => {
    this.setState({menuSelected: <ShowVersion/>});
  };


    render() {
        return (
            <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='uncover'
              icon='labeled'
              inverted
              vertical
              visible
              width='thin'
            >
              <Menu.Item as='a' onClick={this.onClickSubmit}>
                <Icon name='upload' />
                Submit
              </Menu.Item>
              <Menu.Item as='a' onClick={this.onClickVersion}>
                <Icon name='gamepad' />
                Version-History
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher>
              <Segment basic>
                
                <DashboardContent>
                    {this.state.menuSelected}
                </DashboardContent>
                
               
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        );
    }
    }