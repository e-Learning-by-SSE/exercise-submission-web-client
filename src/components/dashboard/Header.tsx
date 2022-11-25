/* Site header in Semantic ui with Login */

import React, { Component } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DataService from "../../services/DataService";
import Account from "./Account";

/* React mouse event onclick */



export default class Header extends Component<React.PropsWithChildren<{onChangeVisbility: () => void}>, {rightSide: any}> {
    
    constructor(props: React.PropsWithChildren<{onChangeVisbility: () => void}>) {
        super(props);
        this.state = {rightSide: this.getLoginButton()};
        this.checkIfLoggedIn();
    }

    private checkIfLoggedIn() {
        let api = new DataService();
        api.getCurrentUserDto().then((user) => {
            if (user) {
                this.setState({rightSide: <Account user={user}/>});
            } else {
                this.setState({rightSide: this.getLoginButton()});
            }
        }).catch((error) => {
            this.setState({rightSide: this.getLoginButton()});
        });

    }

    private getLoginButton() {
        return <Button as={Link} to="/login" >Login</Button>;
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
                
                {this.state.rightSide}
                   
            </Menu.Item>
        </Menu>
        );
    }
    }

  