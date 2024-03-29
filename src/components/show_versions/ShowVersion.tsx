import React from "react";

import { Header, Segment, Icon, Button, Divider} from "semantic-ui-react";
import { ShowVersionState } from "../../constants/ShowVersion";
import { AssignmentDto } from "stumgmtbackend";
import DataService from "../../services/DataService";
import VersionTable from "./VersionTable";
import { VersionDto } from "exerciseserverclientlib";
import { ShowVersionStack } from "../../stacks/ShowVersionStack";
import Stack from "../../stacks/Stack";
import DownloadSubmissionModal from "./DownloadSubmissionModal";
import SelectAssignmentModal from "./SelectAssignmentsModal";

export default class ShowVersion extends React.Component<React.PropsWithChildren<{}>, {table: any, showVersionState: string, assignments: AssignmentDto[], showModal: any }> {
    
        private selectedAssignment: AssignmentDto | null = null;;

        constructor(props: React.PropsWithChildren<{}>) {
            super(props);
            this.state = {table:  
                
               this.createFirstSegment()
              ,showModal: null
              ,showVersionState: ShowVersionState.SELECTASSIGNMENT, assignments: []};

        }

        handleAssignmentWindowClosed = (e: AssignmentDto | null) => {
            this.setState({showModal: null}); //need to write error message and/or redirect
            if(e != null) {
                this.loadVersionAndDrawTable(e);
            }
        }

        handleDownloadSubmission = (version: VersionDto, creatingDownloadComplete: () => void) =>  {
            let api = new DataService();
            let client = api.getSubmissisonClient();
            if(this.selectedAssignment != null) {
                let assignment = this.selectedAssignment;
                    api.getGroupName(this.selectedAssignment).then((groupname) => {
                    client.downloadSubmission(assignment.name,groupname,version.timestamp).then((submission) => {                      
                        creatingDownloadComplete();
                        this.setState({showModal: <DownloadSubmissionModal onClosed={() => {this.setState({showModal: null})}} files={submission}
                        group={groupname} version={version} />});
                    });

                });

            }
        }
        
        private loadVersionAndDrawTable(assignment: AssignmentDto) {
            this.selectedAssignment = assignment;
            let api = new DataService();
            let client = api.getSubmissisonClient();
            api.getGroupName(assignment).then((groupname) => {
                client.getVersionsOfAssignment(assignment.name,groupname).then((versions) => {
                    this.setState({table: <VersionTable versions={versions} onClickDownloadButton={this.handleDownloadSubmission}/>});
                    this.setState({showVersionState: ShowVersionState.DRAWTABLE});
                });
            });
           
            

        }

        private createFirstSegment(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
            return (
                <Segment placeholder>
                <Header icon>
                  <Icon name='file outline' />
                  Select the Assignment you want to see the versions of.
                </Header>
                <Button primary onClick={() => {this.loadAssignments();}}>Select Assignment</Button>
              </Segment>
            );
        }

        private loadAssignments() {

            let api = new DataService();
            let stumgmt = api.getStumgmtbackend();
            stumgmt.getAssigments().then((assignments ) => {
                this.setState({assignments: assignments});
                this.setState({showModal: <SelectAssignmentModal onClosed={this.handleAssignmentWindowClosed}/>});
            });
        }


        render(): React.ReactNode {
            return (
                <div className="show-version">
                    <Stack stack={ShowVersionStack} selected={this.state.showVersionState} />
                    {this.state.table}
                    {this.state.showModal}
                    <Divider />
                </div>
            );
        }
    }

   