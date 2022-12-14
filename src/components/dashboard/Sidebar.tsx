/* Sidebar in Semantic ui */

import React, { Component } from "react";
import { Menu, Icon, Sidebar, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import DashboardStateHandler from "./DashboardStateHandler";

export default class SidebarComponent extends Component<React.PropsWithChildren<{menuSelected: JSX.Element, sidebarVisible: boolean}>, {menuSelected: JSX.Element}> {

  constructor(props: React.PropsWithChildren<{menuSelected: JSX.Element, sidebarVisible: boolean}>) {
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
              visible={this.props.sidebarVisible}
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
              <Menu.Item as={Link} to="/settings" name='settings'>
                <Icon name='settings' />
                Settings
              </Menu.Item>
              <Menu.Item as='a' href="https://www.uni-hildesheim.de/datenschutz/"  name='datenschutz'>
                Datenschutz
              </Menu.Item>
              <Menu.Item as='a' href="https://www.uni-hildesheim.de/impressum/" name='impressum'>
                Impressum
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher>
              <Segment basic placeholder>
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

   