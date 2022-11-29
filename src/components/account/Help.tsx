import { queryByDisplayValue } from "@testing-library/react";
import React from "react";
import { Header, Modal, Grid, Placeholder, Button, Icon } from "semantic-ui-react";
import DataService from "../../services/DataService";

export default class Help extends React.Component<React.PropsWithChildren<{ onClosed: () => void}>, {open: boolean, informationContent: any}> {
    constructor(props: React.PropsWithChildren<{onClosed: () => void}>) {
        super(props);
        this.state = {open: true, informationContent: this.createInformationPlaceholder()};
    }

    private createInformationPlaceholder():  React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        
        return (<><Grid.Row>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Grid.Row><Grid.Row>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Grid.Row><Grid.Row>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Grid.Row><Grid.Row>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Grid.Row></>);
    }


    private createInformationContent() {
        let api = new DataService();
        let user = api.getCurrentUserDto().then((user) => {
                this.setState({informationContent: <><Grid.Row>
                    <Header size="small">{user.username}</Header>
                </Grid.Row><Grid.Row>
                        <Header size="small">{user.role}</Header>
                    </Grid.Row><Grid.Row>
                        <Header size="small">{user.role}</Header>
                    </Grid.Row><Grid.Row>
                        <Header size="small">True</Header>
                    </Grid.Row></>}); 
        });

    }

    private createHelpModal() : React.ReactElement<any, string | React.JSXElementConstructor<any>> {


        return (
            <Modal open= {this.state.open}>
                <Modal.Header>Help-Menu</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>User-Informations</Header>
                        <Grid columns={2} divided>
                            <Grid.Column>
                                <Grid.Row>
                                    <Header size="medium">Username:</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header size="medium">Role:</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header size="medium">Group:</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header size="medium">Connected:</Header>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                             {this.state.informationContent}
                            </Grid.Column>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon color='red' onClick={() =>{ this.setState({open: false}); this.props.onClosed()}}>
                        <Icon name='close' />
                        Close
                    </Button>
                </Modal.Actions>

            </Modal>

            
        )
    }
  
    
    render() {
        this.createInformationContent();
            return (
                <div className="help">
                     {this.createHelpModal()}
                </div>
            );
   
        }
    }