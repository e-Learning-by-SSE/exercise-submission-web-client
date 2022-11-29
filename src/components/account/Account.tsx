import React, { Component } from 'react'
import { UserDto } from 'stumgmtbackend';
import { Dropdown, Icon } from 'semantic-ui-react';
import Help from './Help';


export default class Account extends Component<React.PropsWithChildren<{user: UserDto}>, {dropdown: any, selectedItem: any}> {

    constructor(props: React.PropsWithChildren<{user: UserDto}>) {
        super(props);
        this.state = {dropdown: this.createAccountDropdown(),
            selectedItem: null};
      }
      
      handleComboBoxSelection = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
        event.preventDefault();
        let id = data.value;
        switch(id) {
          case "help":
            this.setState({selectedItem: <Help onClosed={this.onMenuClosed}/>});
            break;

        }
       
      }

    onMenuClosed = () => {
      this.setState({selectedItem: null})
    }


    private createAccountDropdown() {
      const trigger = (
        <span>
          <Icon name='user' /> Hello, {this.props.user.username}
        </span>
      )

      
      const options = [
        {
          key: 'user',
          text: (
            <span>
              Signed in as <strong>{this.props.user.username}</strong>
            </span>
          ),
          disabled: true,
        },
        { key: 'help', value:'help', text: 'Help' },
        { key: 'settings', value:'settings', text: 'Settings' },
        { key: 'sign-out', value:'sign-out', text: 'Sign Out' },
      ]

      return <Dropdown trigger={trigger} options={options} onChange={this.handleComboBoxSelection} />;
    }


    render() {
        return (
           <div className="accountDropdown">
               {this.state.dropdown}
               {this.state.selectedItem}
           </div>
        )
    }
}



