/* Sidebar in Semantic ui */

import React, { Component } from "react";
import { Menu, Icon, Sidebar, Segment } from "semantic-ui-react";
import Submit from "../submit/Submit";
import { Link } from "react-router-dom";
import DashboardContent from "./DashboardContent";

export default class SidebarComponent extends Component {

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
              <Menu.Item as='a'>
                <Icon name='upload' />
                Submit
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher>
              <Segment basic>
                
                <DashboardContent>
                    <Submit/>
                </DashboardContent>
                
               
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        );
    }
    }