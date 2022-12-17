import React from "react";
import { Header, Modal, Grid, Placeholder, Button, Icon, GridColumn, Divider } from "semantic-ui-react";
import DataService from "../../services/DataService";

export default class Help extends React.Component<React.PropsWithChildren<{ onClosed: () => void}>, {open: boolean, informationContent: any}> {
    constructor(props: React.PropsWithChildren<{onClosed: () => void}>) {
        super(props);
        this.state = {open: true, informationContent: this.createInformationPlaceholder()};
    }

    private createInformationPlaceholder():  React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const placeholder = [];
        for (let i = 0; i < 4; i++) {
            placeholder.push(<Grid.Row>
                <GridColumn>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </GridColumn>
                <GridColumn>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </GridColumn>
            </Grid.Row>);
        }
        return (<>{placeholder}</>);
    }


    private createInformationContent() {
        let api = new DataService();
        api.getCurrentUserDto().then((user) => {
                this.setState({informationContent: <>
                 <Grid.Row>
                    <GridColumn>
                        <Header size="medium">Username:</Header>
                    </GridColumn>
                    <GridColumn>
                        <Header size="small">{user.username}</Header>
                    </GridColumn>
                </Grid.Row>
                <Grid.Row>
                    <GridColumn>
                        <Header size="medium">Role:</Header>
                    </GridColumn>
                    <GridColumn>
                        <Header size="small">{user.role}</Header>
                    </GridColumn>
                </Grid.Row>
                <Grid.Row>
                    <GridColumn>
                         <Header size="medium">Group:</Header>
                    </GridColumn>
                    <GridColumn>
                        <Header size="small">{user.role}</Header>
                    </GridColumn>
                </Grid.Row>
                <Grid.Row>
                    <GridColumn>
                        <Header size="medium">Connected:</Header>
                    </GridColumn>
                    <GridColumn>
                        <Header size="small">True</Header>
                    </GridColumn>
                </Grid.Row></>}); 
        });

    }

    private createHelpModal() : React.ReactElement<any, string | React.JSXElementConstructor<any>> {


        return (
            <Modal open= {this.state.open}>
                <Modal.Header size="large">Help-Menu</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header size="large">User-Informations</Header>
                        <Divider/>
                        <Grid columns={2} divided>
                            
                             {this.state.informationContent}
                            
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

