import React from "react";
import { Header, Modal, Grid, Button, Icon, GridColumn, Label } from "semantic-ui-react";
import { FileDto, VersionDto } from "exerciseserverclientlib";
import { Zip } from "../../util/ZipHelper";
import { saveAs } from "file-saver";


export default class Help extends React.Component<React.PropsWithChildren<{ onClosed: () => void, files: FileDto[],
     version: VersionDto; group: string }>, {open: boolean, buttonLoading: boolean}> {

    constructor(props: React.PropsWithChildren<{onClosed: () => void, files: FileDto[], version: VersionDto, group: string}>) {
        super(props);
        this.state = {open: true, buttonLoading: false};
    }

    private getTimeFromeTimestamp(timestamp: number): string {
        let formattedDate = new Date(timestamp * 1000);
        return formattedDate.toLocaleString('en-GB');
    }

    onDownloadButtonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this.setState({open: false});
        this.setState({buttonLoading: true});
        this.startDownload();
        this.props.onClosed();
    }

    private startDownload() {
        Zip.getZipFile(this.props.files).then((zipFile) => {
            zipFile.generateAsync({type: "blob"}).then((blob) => {
                saveAs(blob, this.props.group + "_" 
                + this.props.version.author + "_" 
                +this.props.version.timestamp + ".zip");
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    

    private createModalDescription(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        
        return(
            <Modal.Description>
                <Header size="large">Version - Information</Header>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <GridColumn>
                            <Header size="medium">Author:</Header>
                        </GridColumn>
                        <GridColumn>
                            <Label size="large"><Icon name="user" />{this.props.version.author}</Label>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <GridColumn>
                            <Header size="medium">Timestamp:</Header>
                        </GridColumn>
                        <GridColumn>
                            <Label size="large"><Icon name="calendar alternate" />{this.getTimeFromeTimestamp(this.props.version.timestamp)}</Label>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <GridColumn>
                            <Header size="medium">Group:</Header>
                        </GridColumn>
                        <GridColumn>
                            <Label size="large"><Icon name="group" />{this.props.group}</Label>
                        </GridColumn> 
                    </Grid.Row>
                    <Grid.Row>
                        <GridColumn>
                            <Header size="medium">Path:</Header>
                        </GridColumn>
                        <GridColumn>
                            <Label size="large"><Icon name="file alternate" />{ "downloads/"+ this.props.group + "_" 
                                                        + this.props.version.author + "_" 
                                                        +this.props.version.timestamp + ".zip"}</Label>
                        </GridColumn> 
                    </Grid.Row>
                </Grid>
            </Modal.Description>
        );
    }

    render() {
        return(
            <Modal open={this.state.open} onClose={this.props.onClosed} size="small">
                <Modal.Header><Header size="large">Download Submission</Header></Modal.Header>
                <Modal.Content>
                    {this.createModalDescription()}
                </Modal.Content>
                <Modal.Actions>
                <Button onClick={() => {this.setState({open: false}); this.props.onClosed();}} color="red"  icon>
                        <Button.Content><Icon name="remove"/> Close</Button.Content>
                      
                </Button>
                <Button onClick={this.onDownloadButtonPressed}
                     positive
                     content="Download"
                     icon="download"
                     loading={this.state.buttonLoading}
                     labelPosition="right"
                     >
                    </Button>
                </Modal.Actions>
            </Modal>



        );
    }

}

