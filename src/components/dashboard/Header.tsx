/* Site header in Semantic ui with Login */

import React, { Component } from "react";
import { Menu, Icon, Button, Checkbox, Label, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DataService from "../../services/DataService";
import Account from "../account/Account";

/* React mouse event onclick */



export default class Header extends Component<React.PropsWithChildren<{onChangeVisbility: () => void, 
    onChangeDarkMode: (darkmode: boolean) => void, darkmode: boolean}>, {rightSide: any, darkmode: boolean, message: any}> {
    
    constructor(props: React.PropsWithChildren<{onChangeVisbility: () => void, onChangeDarkMode: (darkmode: boolean) => void, darkmode: boolean}>) {
        super(props);
        this.state = {rightSide: this.getLoginButton(true),
            darkmode: this.props.darkmode
            , message: null};
        this.checkIfLoggedIn();
    }

    private checkIfLoggedIn() {
        let api = new DataService();
        api.getCurrentUserDto().then((user) => {
            if (user) {
                this.setState({rightSide: <Account user={user}/>});
            } else {
                this.setState({rightSide: this.getLoginButton(false)});
            }
        }).catch((error) => {
            this.setState({rightSide: this.getLoginButton(false)});
            this.setState({message:   <Message negative size="mini" floating={true} 
                icon='warning sign'
                header='Can`t connect to server'
                content='Check your internet connection'
              />});
        });

    }

    private getLoginButton(init: boolean) {
        let localDarkmode;
        if(init) {    
            localDarkmode = false;
        } else {
            localDarkmode = this.state.darkmode;
        }
        
        
        return <Button as={Link} to="/login" inverted={localDarkmode}>Login</Button>;
    }

    private getDarkmodeCheckbox() {

        return <Checkbox toggle checked={this.state.darkmode} onChange={() => this.setDarkmode(!this.state.darkmode)}
         label={<Label>{this.state.darkmode ? "Darkmode" : "Normalmode"} <Icon inverted={this.state.darkmode} name={this.state.darkmode ? "moon" : "sun"} /></Label>}  />;
    }

    private setDarkmode(darkmode: boolean) {
        this.setState({darkmode: darkmode});
        this.props.onChangeDarkMode(darkmode);
    }

    
     handleItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        this.props.onChangeVisbility();
        
       };


    render() {
        return (
        <Menu secondary inverted={this.props.darkmode}>
            <Menu.Item>
                <Button icon onClick={this.handleItemClick}>
                    <Icon inverted={this.state.darkmode} name='bars' />
                </Button>
            </Menu.Item>
            <Menu.Item position="right">
                {this.state.message}
                {this.getDarkmodeCheckbox()}
                {this.state.rightSide}
                   
            </Menu.Item>
        </Menu>
        );
    }
    }

  