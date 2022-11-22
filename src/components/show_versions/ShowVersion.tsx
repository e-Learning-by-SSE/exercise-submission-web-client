import React from "react";

import {Segment, Dimmer, Loader} from "semantic-ui-react";
import { ShowVersionState } from "../../constants/ShowVersion";
import AssignmentPortal from "../../portals/AssignmentPortal";
import { AssignmentDto } from "stumgmtbackend";
import DataService from "../../services/DataService";

export default class ShowVersion extends React.Component<React.PropsWithChildren<{}>, {table: any, showVersionState: string, assignments: AssignmentDto[] }> {
    
        constructor(props: React.PropsWithChildren<{}>) {
            super(props);
            this.setState({table:  <Segment>
                <Dimmer active>
                  <Loader content='Loading' />
                </Dimmer>
              </Segment>});
              this.setState({showVersionState: ShowVersionState.LOADING});
        }

        handleAssignmentWindowClosed = (e: any) => {
            this.setState({table: e});
            this.setState({showVersionState: ShowVersionState.DRAWTABLE});
        }

        private loadAssignments() {

            let api = new DataService();
            let stumgmt = api.getStumgmtbackend();
            stumgmt.getAssigments().then((assignments ) => {
                this.setState({assignments: assignments});
                this.setState({showVersionState: ShowVersionState.SELECTASSIGNMENT});
            });
        }


        render(): React.ReactNode {
            if(this.state.showVersionState == ShowVersionState.LOADING) {
                this.loadAssignments();
            }


            return (
                <div className="show-version">
                    {this.state.table}
                    {this.state.showVersionState == ShowVersionState.SELECTASSIGNMENT ? <AssignmentPortal assignments={this.state.assignments}/> : null } 
                    
                </div>
            );
        }
    }