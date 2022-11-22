import React from "react";
import { AssignmentDto } from "stumgmtbackend";
import {Portal, Segment, Button,Header, Dropdown} from "semantic-ui-react";


export default class AssignmentPortal extends React.Component<React.PropsWithChildren<{assignments: AssignmentDto[]}>, {open: boolean, selectedAssigment: AssignmentDto | null}> {
    constructor(props: React.PropsWithChildren<{assignments: AssignmentDto[]}>) {
        super(props);
        this.state = {open: true, selectedAssigment: null};
    }

    handleClose = () => {
        this.setState({ open: false })

    
    }
    handleComboBoxSelection = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
        event.preventDefault();
        let id = data.value;
        let assignment = this.props.assignments.find(assignment => assignment.id == id);
        
        
    }
    private createDropdown() {
        const options = [];
        for(let assignment of this.props.assignments) {
            options.push(
                { text: assignment.name, key: assignment.id, value: assignment.name, icon: 'file alternate outline' }
            );
        }
        return options;
    }
    private createPortal() {
        return(
            <Portal onClose={this.handleClose} open={this.state.open}>
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '50%',
                zIndex: 1000,
              }}
            >
            <Header>Select the Assignment</Header>
              <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='search'
                options={this.createDropdown()}
                search
                onClick={this.handleComboBoxSelection}
                text='Select Assignment'
              />

              <Button
                content='Close Portal'
                negative
                onClick={this.handleClose}
              />


            </Segment>
          </Portal>



        );
    }

    render() {
        return (
            <div className="assignment-portal">
                {this.createPortal()}
            </div>
        );
    }






}