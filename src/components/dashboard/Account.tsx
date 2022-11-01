import React, { Component } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import { redirect } from  'react-router-dom';



export default class MenuExampleVerticalPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent> , { name } : {name: string}) => {
    console.log("test");
     this.setState({
     activeItem: name }); 
     redirect('/'+name); 
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing vertical>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={(e,s) => this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={(e,s) => this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={(e,s) => this.handleItemClick}
        />
      </Menu>
    )
  }
}