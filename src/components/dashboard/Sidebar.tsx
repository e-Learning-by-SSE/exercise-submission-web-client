/* Sidebar in Semantic ui */

import React, { Component } from "react";
import { Menu, Icon, Sidebar, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import DashboardStateHandler from "./DashboardStateHandler";

export default class SidebarComponent extends Component<React.PropsWithChildren<{menuSelected: JSX.Element}>, {menuSelected: JSX.Element}> {

  constructor(props: React.PropsWithChildren<{menuSelected: JSX.Element}>) {
    super(props);
    this.state = { menuSelected: props.menuSelected };
  

  }

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
              
              <Menu.Item as={Link} to="/submit" name='submit'>
                  <Icon name='upload' />
                  Submit
              </Menu.Item>
              <Menu.Item as={Link} to="/version" name='version'>
                <Icon name='file alternate' />
                Version-History
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                Download
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher>
              <Segment basic>
                <DashboardStateHandler>
                  <DashboardContent>
                      {this.props.menuSelected}
                  </DashboardContent>
                </DashboardStateHandler>
               
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        );
    }
    }

   