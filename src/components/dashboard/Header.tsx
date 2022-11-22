/* Site header in Semantic ui with Login */

import React, { Component } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

/* React mouse event onclick */
const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

    console.log("test");
    console.log(e);
   };

export default class Header extends Component {
    render() {
        return (
        <Menu secondary>
            <Menu.Item>
            <Icon link name="bars" />
            </Menu.Item>
            <Menu.Item position="right">
                <Button.Group>
                    <Button as={Link} to="/login" >Login</Button>
                    <Button.Or />
                    <Button as={Link} to="/account" color="red" >Register</Button>
                </Button.Group>




            </Menu.Item>
        </Menu>
        );
    }
    }

    /*
    
                <Button as={Link} to="/login" color="blue" className="login-button">
                    Login
                </Button>
                <Button as={Link} to="/account" color="blue">
                    Account
                </Button>
                */