import { VersionDto } from "exerciseserverclientlib";
import React from "react";
import { Table, Button, ButtonProps,Header, Icon, Label } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";


export default class VersionTable extends React.Component<React.PropsWithChildren<{versions: VersionDto[], onClickDownloadButton: (id: VersionDto, creatingDownloadComplete: () => void) => void}>,
    {selectedButtonLoading: {versionTimestamp: number, loading: boolean}}> {
    constructor(props: React.PropsWithChildren<{versions: VersionDto[], onClickDownloadButton: (id: VersionDto) => void}>) {
        super(props);
        this.state = {selectedButtonLoading: {versionTimestamp: 0, loading: false}};
    }

    private createTable() {
       //header
       return(
       <Table basic>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>
                    <Header>
                        <Icon name="calendar alternate"/>
                        <Header.Content>Timestamp
                            <HeaderSubHeader>The time the submission was uploaded</HeaderSubHeader>
                        </Header.Content>
                    </Header>
                    </Table.HeaderCell>
                <Table.HeaderCell>
                <Header>
                        <Icon name="user"/>
                        <Header.Content>Author
                            <HeaderSubHeader>The author of the submission</HeaderSubHeader>
                        </Header.Content>
                    </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                <Header>
                        <Icon name="download"/>
                        <Header.Content>Download
                            <HeaderSubHeader>Download this submission</HeaderSubHeader>
                        </Header.Content>
                    </Header>
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.createTableRows()}
            </Table.Body>
        </Table>
       );

    }

    private createTableRows(): React.ReactNode {
        const tableRows = [];
        let versions = this.props.versions;
        for(let version of versions) {
            tableRows.push(
            <Table.Row key={version.timestamp}>
                <Table.Cell><Label size="large">{this.getTimeFromeTimestamp(version.timestamp)}</Label></Table.Cell>
                <Table.Cell><Label size="large">{version.author}</Label></Table.Cell>
                <Table.Cell><Button floated="left" loading={this.state.selectedButtonLoading.loading == true ?
                         this.state.selectedButtonLoading.versionTimestamp == version.timestamp ? true : false : false } 
                         onClick={this.buttonPressed} id={version.timestamp}>Download</Button></Table.Cell>
            </Table.Row>
            );
        }
        return tableRows;

    }

    private getTimeFromeTimestamp(timestamp: number): string {
        let formattedDate = new Date(timestamp * 1000);
        return formattedDate.toLocaleString('en-GB');
    }

    buttonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
        event.preventDefault();
        let id = data.id;
        this.setState({selectedButtonLoading: {versionTimestamp: id, loading: true}});
        let version = this.props.versions.find((version) => version.timestamp === id);
        if(version) {
            this.props.onClickDownloadButton(version, () => {this.setState({selectedButtonLoading: {versionTimestamp: 0, loading: false} })});
        }

    }


    render(): React.ReactNode {
        return (
            <div className="version-table">
                {this.createTable()}
            </div>
        );
    }
}