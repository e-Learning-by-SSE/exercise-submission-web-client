import React from "react";

import {Dropdown, Header, Modal, Grid, Placeholder, Button, Icon, GridColumn, Divider ,PlaceholderLine, SemanticICONS, Label} from "semantic-ui-react";
import { AssignmentDto } from "stumgmtbackend";
import DataService from "../../services/DataService";

export default class SelectAssignmentModal extends React.Component<React.PropsWithChildren<{ onClosed: (selectedAssignment: AssignmentDto | null) => void}>, {open: boolean, modalContent: any, dropdown: any,
        selectButton: {icon: SemanticICONS, content: string, positive: boolean}}> {
   
    private assignments: AssignmentDto[] = [];
    private selectedAssignment: AssignmentDto | null = null;

    constructor(props: React.PropsWithChildren<{onClosed: (selectedAssignment: AssignmentDto | null) => void}>) {
        super(props);
        this.state = {open: true, modalContent: null, dropdown: this.createDropdownPlaceholder(),
            selectButton: {icon: "warning sign", content: "Select Assignment", positive: false}};
    }

    private createDropdownPlaceholder(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (<Placeholder>
            <Placeholder.Header>
                <Placeholder.Line />
            </Placeholder.Header>
        </Placeholder>);
    }

    onhandleComboBoxSelection = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
        event.preventDefault();
        let id = data.value;
        let assignment = this.assignments.find(assignment => assignment.id === id);
        if(assignment !== undefined) {
            this.selectedAssignment = assignment;
            this.setState({modalContent: this.createInformationContent()});
            this.setState({selectButton: {icon: "check", content: "Select", positive: true}});
        }

    }



    private createDropdownContent() {
        let api = new DataService();
        let backend = api.getStumgmtbackend();
        backend.getAssigments().then((assignments) => {
            this.assignments = assignments;
            let assignmentOptions = assignments.map((assignment) => {
                return {key: assignment.id, text: assignment.name, value: assignment.id, icon: "file alternate"};
            });
            this.setState({dropdown: <><Dropdown
                placeholder='Select Assignment'
                fluid
                search
                selection
                onChange={this.onhandleComboBoxSelection}
                options={assignmentOptions} /><Divider /></>});

             });
    }

    


    private createInformationContent() {
        let api = new DataService();
        api.getCurrentUserDto().then((user) => {
                this.setState({modalContent: <><Grid.Row>
                    <GridColumn>
                        <Header size="medium">Type:</Header>
                    </GridColumn>
                    <GridColumn>
                        {this.selectedAssignment !== null
                            ? this.getNonPlaceholderLine(this.selectedAssignment.type, "settings") : this.getPlaceHolderLine()}
                    </GridColumn>
                </Grid.Row><Grid.Row>
                        <GridColumn>
                            <Header size="medium">Collaboration:</Header>
                        </GridColumn>
                        <GridColumn>
                            {this.selectedAssignment !== null
                                ? this.getNonPlaceholderLine(this.selectedAssignment.collaboration, "group") : this.getPlaceHolderLine()}
                        </GridColumn>
                    </Grid.Row><Grid.Row>
                        <GridColumn>
                            <Header size="medium">Enddate:</Header>
                        </GridColumn>
                        <GridColumn>
                            {this.selectedAssignment !== null
                                ? this.selectedAssignment.endDate !== undefined ? this.getNonPlaceholderLine(this.selectedAssignment.endDate.toLocaleString("de-DE"), "time")
                                    : this.getPlaceHolderLine() : this.getPlaceHolderLine()}
                        </GridColumn>
                    </Grid.Row></>});

        });
    }
    private getPlaceHolderLine(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return(
            <Placeholder>
              <PlaceholderLine />
            </Placeholder>
        )
    }
    
    private getNonPlaceholderLine(content: string, icon: SemanticICONS): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
      return(
        <Label size="large"><Icon name={icon} />{content}</Label>
      )
    
    }

    private createModal() : React.ReactElement<any, string | React.JSXElementConstructor<any>> {


        return (
            <Modal open= {this.state.open}>
                <Modal.Header size="large">Select Assignment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header size="large">Assignments</Header>
                        <Divider/>
                        {this.state.dropdown}
                        <Grid columns={2} divided>
                            
                             {this.state.modalContent}
                            
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon color='red' onClick={() =>{ this.setState({open: false}); this.props.onClosed(null)}}>
                        <Icon name='close' />
                        Close
                    </Button>
                    <Button onClick={() => {this.props.onClosed(this.selectedAssignment)}}
                     positive={this.state.selectButton.positive}
                     content={this.state.selectButton.content}
                     icon={this.state.selectButton.icon}
                     labelPosition="right"
                     >
                    </Button>
                </Modal.Actions>

            </Modal>

            
        )
    }

    
    render() {
        if(this.assignments.length === 0) {
             this.createDropdownContent();
        }
            return (
                <div className="assignment-modal">
                     {this.createModal()}
                </div>
            );
   
        }
    }

