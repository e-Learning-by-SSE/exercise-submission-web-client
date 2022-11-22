import { VersionDto } from "exerciseserverclientlib";
import React from "react";
import { Table, Button, ButtonProps } from "semantic-ui-react";


export default class VersionTable extends React.Component<React.PropsWithChildren<{versions: VersionDto[]}>> {
    constructor(props: React.PropsWithChildren<{versions: VersionDto[]}>) {
        super(props);
    }

    private createTable() {
       //header
       return(
       <Table basic>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Timestamp</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Download</Table.HeaderCell>
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
            <Table.Row>
                <Table.Cell>{version.timestamp}</Table.Cell>
                <Table.Cell>{version.author}</Table.Cell>
                <Table.Cell><Button onClick={this.buttonPressed} id={version.timestamp}></Button></Table.Cell>
            </Table.Row>
            );
        }
        return tableRows;

    }

    buttonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
        event.preventDefault();
        let id = data.id;
        console.log(id);
    }


    render(): React.ReactNode {
        return (
            <div className="version-table">
                {this.createTable()}
            </div>
        );
    }
}