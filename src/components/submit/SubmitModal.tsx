import React from "react";
import { JSZipObject } from "jszip";
import { Modal, Header, Button, Icon, SemanticICONS, Dropdown, Placeholder, Grid, Label, GridColumn, PlaceholderLine, Divider} from "semantic-ui-react";
import DataService from "../../services/DataService";
import { AssignmentDto } from "stumgmtbackend";



export default class SubmitModal extends React.Component<React.PropsWithChildren<{files: JSZipObject[] | FileList | null}>,
{open: boolean, uploadButton: {content: string, disabled: boolean, loading: boolean, positive: boolean, icon: SemanticICONS},
 dropDown: any, infoContent: any}> {

  private assignments: AssignmentDto[] = [];
  private selectedAssignment: AssignmentDto | null = null;

  constructor(props: React.PropsWithChildren<{files: JSZipObject[] | FileList | null}>) {   
    super(props);
    if(this.props.files !== null) {
        this.state = {open: true, 
          uploadButton: {content: "Select Assignment", disabled: false, loading: false, positive: false, icon: "file alternate"},
          dropDown: this.createPlaceHolderDropdown(), infoContent: null}
        
    } else {
      this.state = {open: false, 
        uploadButton: {content: "Upload", disabled: true, loading: false, positive: true, icon: "file alternate"},
        dropDown: this.createPlaceHolderDropdown(), infoContent: null}
    }
  }

  onUploadButtonPressed= (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({uploadButton: {content: "Uploading", disabled: true, loading: true, positive: true, icon: "upload"}});
    let api = new DataService();
    let client = api.getSubmissisonClient();
    if(this.selectedAssignment!== null && this.props.files !== null) {
      let assignment = this.selectedAssignment;
      let files = this.props.files;
      api.getGroupName(assignment).then((groupName) => {
      client.submitAssignment(assignment.name,groupName ,files).then((response) => {
          console.log(response); //  display fehlermeldungen
          this.setState({open: false});
      }).catch((error) => {
        console.log(error);
      });  

    }).catch((error) => {
      console.log(error);
    });
    }


  }

  handleComboBoxSelection = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
    event.preventDefault();
    let id = data.value;
    let assignment = this.assignments.find(assignment => assignment.id === id);
    if(assignment !== undefined) {
        this.selectedAssignment = assignment;
        this.createInfoContent();
        this.setState({uploadButton: {content: "Upload Files", disabled: false, loading: false, positive: true, icon: "upload"}});
    }

    
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

  private createInfoContent() {
    this.setState({infoContent:  <Grid columns={2} divided>
      <Grid.Row>
          <GridColumn>
              <Header size="medium">Type:</Header>
          </GridColumn>
          <GridColumn>
              {this.selectedAssignment !== null 
                ? this.getNonPlaceholderLine(this.selectedAssignment.type,"settings") : this.getPlaceHolderLine() }
          </GridColumn>
      </Grid.Row>
      <Grid.Row>
          <GridColumn>
              <Header size="medium">Collaboration:</Header>
          </GridColumn>
          <GridColumn>
          {this.selectedAssignment !== null 
                ? this.getNonPlaceholderLine(this.selectedAssignment.collaboration,"group") : this.getPlaceHolderLine() }
          </GridColumn>
      </Grid.Row>
      <Grid.Row>
          <GridColumn>
              <Header size="medium">Enddate:</Header>
          </GridColumn>
          <GridColumn>
          {this.selectedAssignment !== null 
                ? this.selectedAssignment.endDate !== undefined ? this.getNonPlaceholderLine(this.selectedAssignment.endDate.toLocaleString("de-DE"),"time")
                : this.getPlaceHolderLine() : this.getPlaceHolderLine() }
          </GridColumn> 
      </Grid.Row>
      </Grid>});  

  }
  private createInfoDropdown() {
    let api = new DataService();
    let stumgmt = api.getStumgmtbackend();
    stumgmt.getAssigments().then((assignments) => {
      this.assignments = assignments;
      const assignmentOptions = [];
      for(let assignment of assignments) {
        assignmentOptions.push({ key: assignment.id, text: assignment.name, value: assignment.id, icon: 'file alternate' });
      }
       this.setState({dropDown: <><Dropdown
         placeholder='Select Assignment'
         fluid
         search
         selection
         onChange={this.handleComboBoxSelection}
         options={assignmentOptions} /><Divider /></>}) 
    });
   
  }

  private createPlaceHolderDropdown():  React.ReactElement<any, string | React.JSXElementConstructor<any>> {
      return(
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      )
  }

  private createModal() :  React.ReactElement<any, string | React.JSXElementConstructor<any>> {

    return(
        <Modal.Description>
            {this.state.dropDown}
            {this.state.infoContent}
        </Modal.Description>
    );

  }



  render(){
    if(this.assignments.length === 0) {
      this.createInfoDropdown();
    }
      

    return (
        <Modal open={this.state.open}>
          <Modal.Header><Header size="large">Submit</Header></Modal.Header>
          <Modal.Content>
            {this.createModal()}
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => this.setState({open: false})}>
              <Button.Content><Icon name="remove"/>Close</Button.Content>
            </Button>
            <Button onClick={this.onUploadButtonPressed}
                     positive={this.state.uploadButton.positive}
                     content={this.state.uploadButton.content}
                     icon={this.state.uploadButton.icon}
                     loading={this.state.uploadButton.loading}
                     labelPosition="right"
                     >
                    </Button>
          </Modal.Actions>
        </Modal>
        );
  }

}



