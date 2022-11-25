import React, { Component } from 'react'
import { UserDto } from 'stumgmtbackend';
import { Dropdown, Icon } from 'semantic-ui-react';


export default class Account extends Component<React.PropsWithChildren<{user: UserDto}>, {dropdown: any}> {

    constructor(props: React.PropsWithChildren<{user: UserDto}>) {
        super(props);
        this.state = {dropdown: this.createAccountDropdown()};
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
        { key: 'help', text: 'Help' },
        { key: 'settings', text: 'Settings' },
        { key: 'sign-out', text: 'Sign Out' },
      ]

      return <Dropdown trigger={trigger} options={options} />;
    }


    render() {
        return (
           <div className="accountDropdown">
               {this.state.dropdown}
           </div>
        )
    }
}



