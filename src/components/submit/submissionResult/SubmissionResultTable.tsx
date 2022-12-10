import { CheckMessageDtoTypeEnum, SubmissionResultDto } from "exerciseserverclientlib";
import React from "react";
import { Table,Header, Label, SemanticCOLORS} from "semantic-ui-react";


export default class SubmissionResultTable extends React.Component<React.PropsWithChildren<{result: SubmissionResultDto }>> {
    

    private createTypeCell(type: CheckMessageDtoTypeEnum): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        let tagColor: SemanticCOLORS = "red";
         if(type === CheckMessageDtoTypeEnum.WARNING) {
            tagColor = "yellow";
        }
        return(
            
                <Label tag color={tagColor}>{type}</Label>
        
        );
    }


    private createTableBody(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        const tableRows = [];
        for (let i = 0; i < this.props.result.messages.length; i++) {
            const checkResult = this.props.result.messages[i];
            tableRows.push(
                <Table.Row key={i} >
                    <Table.Cell>
                        <Label>{checkResult.checkName}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{checkResult.message}</Label>
                    </Table.Cell>
                    <Table.Cell>
                       {checkResult.file === undefined ? null: <Label>{checkResult.file}</Label>}
                    </Table.Cell>
                    <Table.Cell>
                        {checkResult.column=== undefined ? null: <Label>{checkResult.column}</Label>}
                    </Table.Cell>
                    <Table.Cell>
                        {checkResult.line=== undefined ? null: <Label>{checkResult.line}</Label>}
                    </Table.Cell>
                    <Table.Cell>
                        {this.createTypeCell(checkResult.type)}
                    </Table.Cell>
                </Table.Row>
            );
        }

        return(
            <Table.Body>
                {tableRows}
            </Table.Body>
        ); 
    }


    private createTable(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Checkname
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Message
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    File
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Column
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Line
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Type
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.createTableBody()}
            </Table>
        );
    }


    render() {
        return(
                <div className="submissionResultTable">
                    {this.createTable()}
                </div>
        );

    }
}