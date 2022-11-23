/* Site header in Semantic ui with Login */

import React, { Component } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

/* React mouse event onclick */



export default class Header extends Component<React.PropsWithChildren<{onChangeVisbility: () => void}>> {
    
    constructor(props: React.PropsWithChildren<{onChangeVisbility: () => void}>) {
        super(props);
    }
    
    
     handleItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        this.props.onChangeVisbility();
        
       };


    render() {
        return (
        <Menu secondary>
            <Menu.Item>
                <Button icon onClick={this.handleItemClick}>
                    <Icon name='bars' />
                </Button>
            </Menu.Item>
            <Menu.Item position="right">
                
                <Button as={Link} to="/login" >Login</Button>
                   
            </Menu.Item>
        </Menu>
        );
    }
    }

  